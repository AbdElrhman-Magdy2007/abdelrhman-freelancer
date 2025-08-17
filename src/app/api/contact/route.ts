import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@/lib/prisma";
import { Prisma } from "@prisma/client";

// Ensure this route runs on the Node.js runtime (Prisma is not supported on Edge)
export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email().max(320),
  message: z.string().min(10).max(5000),
  // honeypot not stored; just checked at edge
  honeypot: z.string().optional().default("")
});

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Unsupported content type" },
        { status: 415 }
      );
    }

    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, message, honeypot } = parsed.data;

    // Basic bot protection
    if (honeypot && honeypot.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Persist to DB in `chatuser` model
    const saved = await db.chatuser.create({
      data: { name, email, message },
    });

    return NextResponse.json(
      { ok: true, id: saved.id, createdAt: saved.createdAt },
      { status: 201 }
    );
  } catch (err) {
    console.error("/api/contact POST error:", err);

    // Provide clearer feedback for common Prisma/DB issues
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // P2021: table or column does not exist; P1001: DB unreachable
      if (err.code === "P2021" || err.code === "P1001") {
        return NextResponse.json(
          {
            error:
              "Database is not ready. Please run: `npx prisma generate` and `npx prisma migrate dev`.",
          },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

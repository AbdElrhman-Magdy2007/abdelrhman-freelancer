import { authOptions } from "@/app/server/auth";
import NextAuth from "next-auth";
import { NextRequest } from "next/server";
import { loginSchema } from "@/app/validations/auth";

const handler = NextAuth(authOptions);

export async function GET(request: NextRequest) {
  try {
    return await handler(request);
  } catch (error) {
    console.error("Auth GET Error:", error);
    return new Response(
      JSON.stringify({ error: "Authentication failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body against login schema
    const validationResult = loginSchema().safeParse(body);
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid request data",
          details: validationResult.error.format()
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return await handler(request);
  } catch (error) {
    console.error("Auth POST Error:", error);
    return new Response(
      JSON.stringify({ error: "Authentication failed" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

// Ensure this route runs in the Node.js runtime (Buffer is required)
export const runtime = "nodejs";

// Define the type for the form data file
type FormDataFile = Blob & {
  name?: string; // Optional: Some browsers may add this
};

export async function POST(request: Request) {
  try {
    // Validate required Cloudinary environment variables early
    const requiredEnv = [
      "CLOUDINARY_CLOUD_NAME",
      "CLOUDINARY_API_KEY",
      "CLOUDINARY_API_SECRET",
    ];
    const missingEnv = requiredEnv.filter((k) => !process.env[k]);
    if (missingEnv.length > 0) {
      return NextResponse.json(
        { error: `Missing Cloudinary environment variables: ${missingEnv.join(", ")}` },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as FormDataFile | null;
    const pathName = (formData.get("pathName") as string) || "uploads";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    // Temporary diagnostics (safe): log Cloudinary runtime config and file meta
    const cfg = (cloudinary as any).config?.() || {};
    console.log("[UploadRoute] Cloudinary runtime config:", {
      cloud_name: cfg.cloud_name,
      api_key: cfg.api_key,
      api_secret: cfg.api_secret ? "[hidden]" : undefined,
    });
    console.log("[UploadRoute] Incoming file:", {
      name: (file as any)?.name,
      type: (file as any)?.type,
      size: (file as any)?.size,
      pathName,
    });
    // Convert the file to a format Cloudinary can handle (Buffer or Base64)
    const fileBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(fileBuffer).toString("base64");
    const mime = (file as any)?.type || "application/octet-stream";
    const dataUrl = `data:${mime};base64,${base64File}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataUrl, {
      folder: pathName,
      resource_type: "auto", // auto-detect image/video/raw
    });
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    // Provide more detailed diagnostics in logs and response
    const err = error as any;
    const message = err?.message || err?.error?.message || "Failed to upload image";
    const name = err?.name;
    const httpCode = typeof err?.http_code === "number" ? err.http_code : undefined;
    const cloudinaryError = err?.error || err?.response || undefined;
    console.error("Error uploading file to Cloudinary:", {
      name,
      message,
      httpCode,
      cloudinaryError,
    });
    return NextResponse.json(
      { error: message, name, httpCode, cloudinaryError },
      { status: 500 }
    );
  }
}
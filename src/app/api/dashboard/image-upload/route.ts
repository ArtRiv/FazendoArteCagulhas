import { NextResponse } from "next/server";

// Make sure to replace this with your actual imgbb API key
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const IMGBB_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log("req formData: ", formData);
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ status: "fail", error: "No file provided" });
    }

    // Convert the file into a format that can be sent to imgbb
    const form = new FormData();
    form.append("image", file);

    // Perform the HTTP POST request to imgbb
    const response = await fetch(IMGBB_URL, {
      method: "POST",
      body: form,
    });

    const data = await response.json();

    if (data.success) {
      return NextResponse.json({ status: "success", imageUrl: data.data.url });
    } else {
      return NextResponse.json({ status: "fail", error: data });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}

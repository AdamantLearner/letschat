import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const messages = await prisma.message.findMany();
  return NextResponse.json(messages);
}
export async function POST(req: Request) {
  const body = await req.json();
  const { name, text } = body;

  if (!name || !text) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const message = await prisma.message.create({
    data: { name, text },
  });

  return NextResponse.json({ success: true, message }, { status: 201 });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const skills = await prisma.skill.findMany({
      where: { userId },
    });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, userId } = body;

    if (!name || !userId) {
      return NextResponse.json({ error: "Skill name and userId are required" }, { status: 400 });
    }

    const newSkill = await prisma.skill.create({
      data: { name, userId },
    });

    return NextResponse.json({ success: true, ...newSkill });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add skill" }, { status: 500 });
  }
}

// DELETE: Remove a Skill
export async function DELETE(request: Request) {
  const { id } = await request.json(); // Expect skill ID in the request body

  if (!id) {
    return NextResponse.json({ error: "Skill ID is required" }, { status: 400 });
  }

  try {
    const deletedSkill = await prisma.skill.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Skill deleted successfully", skill: deletedSkill });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}

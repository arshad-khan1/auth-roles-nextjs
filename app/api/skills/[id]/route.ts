import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// DELETE: Remove a Skill
export async function DELETE(req: Request) {
    // Extract customer ID from the URL
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extracting the last part as the ID

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

import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const user = await getCurrentUser();

    if (!user || user.role !== "MANAGER") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { id, name, location, requiredSkills, salary } = body;

        if (!id) {
            return NextResponse.json({ error: "Company ID is required" }, { status: 400 });
        }

        const updatedCompany = await prisma.company.update({
            where: { id },
            data: { name, location, requiredSkills, salary },
        });

        return NextResponse.json({ company: updatedCompany });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update company" }, { status: 500 });
    }
}


export async function DELETE(req: Request) {
    const user = await getCurrentUser();

    if (!user || user.role !== "MANAGER") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Extract customer ID from the URL
        const url = new URL(req.url);
        const id = url.pathname.split('/').pop(); // Extracting the last part as the ID

        // Ensure 'id' is a string
        if (!id || Array.isArray(id)) {
            return NextResponse.json({ error: "Invalid or missing Company ID" }, { status: 400 });
        }

        await prisma.company.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Company deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete company" }, { status: 500 });
    }
}
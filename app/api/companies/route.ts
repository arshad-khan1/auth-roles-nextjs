import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const user = await getCurrentUser();

    if (!user || (user.role !== "ADMIN" && user.role !== "MANAGER")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const companies = await prisma.company.findMany({
            where: { managerId: user.id },
        });
        return NextResponse.json({ companies });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    const user = await getCurrentUser();

    if (!user || user.role !== "MANAGER") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!user.id) {
        return NextResponse.json({ error: "User ID is missing" }, { status: 400 });
    }

    try {
        const body = await req.json();
        const { name, location, requiredSkills, salary } = body;

        // Validate inputs
        if (!name || !location || !requiredSkills || !salary) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const company = await prisma.company.create({
            data: {
                name,
                location,
                requiredSkills,
                salary: parseFloat(salary),
                managerId: user.id,
            },
        });

        return NextResponse.json({ success: true, company });
    } catch (error) {
        console.error("Error creating company:", error);
        return NextResponse.json(
            { error: "Failed to add company" },
            { status: 500 }
        );
    }
}



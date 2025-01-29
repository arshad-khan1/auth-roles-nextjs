import { auth } from "@/auth";

import { prisma } from "@/lib/db";

export const DELETE = auth(async (req) => {
  if (!req.auth) {
    return new Response("Not authenticated", { status: 401 });
  }

  const currentUser = req.auth.user;
  if (!currentUser) {
    return new Response("Invalid user", { status: 401 });
  }

  try {
    await prisma.user.delete({
      where: {
        id: currentUser.id,
      },
    });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }

  return new Response("User deleted successfully!", { status: 200 });
});

export const GET = auth(async (req) => {
  // Check authentication
  if (!req.auth) {
    return new Response("Not authenticated", { status: 401 });
  }

  try {
    // Fetch users
    const users = await prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
        Skill: true, // Include related fields
      },
    });

    return new Response(JSON.stringify({ success: true, data: users }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal server error", { status: 500 });
  }
});
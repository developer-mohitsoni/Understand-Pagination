import prisma from "@/lib/prisma";

// Fetch users with pagination support
export async function fetchUsersWithPagination(limit: number, cursor?: number) {
  const cursorObj = cursor ? { id: cursor } : undefined;
  const users = await prisma.user.findMany({
    take: limit + 1,
    skip: cursor ? 1 : 0,
    cursor: cursorObj,
    orderBy: { id: "asc" },
  });

  const hasNextPage = users.length > limit;
  if (hasNextPage) {
    users.pop(); // Remove the extra user if we have more than the limit
  }

  return {
    users,
    hasNextPage,
    nextCursor: hasNextPage ? users[users.length - 1].id : null,
  };
}

// Create a new user
export async function createUser(name: string, email: string) {
  return await prisma.user.create({
    data: { name, email },
  });
}

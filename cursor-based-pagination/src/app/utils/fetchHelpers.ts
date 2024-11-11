export async function fetchUsers(cursor: number | null = null) {
  const url = cursor
    ? `/api/users?cursor=${cursor}&limit=5`
    : `/api/users?limit=5`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

export async function createUser(name: string, email: string) {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) throw new Error("Failed to create user");
  return response.json();
}

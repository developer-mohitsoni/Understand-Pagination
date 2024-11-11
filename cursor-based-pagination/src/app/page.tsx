"use client";

import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { fetchUsers, createUser } from "@/app/utils/fetchHelpers";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [creating, setCreating] = useState(false);

  const { toast } = useToast();

  const loadUsers = async (cursor: number | null = null) => {
    setLoading(true);
    try {
      const data = await fetchUsers(cursor);
      setUsers((prev) => [...prev, ...data.users]);
      setNextCursor(data.nextCursor);
    } catch (error) {
      toast({ title: "Error loading users", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleLoadMore = () => {
    if (nextCursor) loadUsers(nextCursor);
  };

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);

    try {
      await createUser(name, email);
      setName("");
      setEmail("");
      toast({ title: "User created successfully!", variant: "default" });
      setUsers([]); // Reset users list and fetch again for updated data
      setNextCursor(null); // Reset cursor
      loadUsers();
    } catch (error) {
      toast({ title: (error as Error).message, variant: "destructive" });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <form onSubmit={handleCreateUser} className="mb-6">
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="mb-4"
        />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mb-4"
        />
        <Button type="submit" disabled={creating} className="w-full">
          {creating ? "Creating..." : "Create User"}
        </Button>
      </form>

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-lg">{user.name}</CardTitle>
              <CardDescription className="text-gray-600">
                {user.email}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center mt-6">
        {loading ? (
          <LoadingSpinner className="text-blue-500" />
        ) : (
          nextCursor && (
            <Button
              onClick={handleLoadMore}
              variant="default"
              className="px-4 py-2"
            >
              Load More
            </Button>
          )
        )}
      </div>
    </div>
  );
}

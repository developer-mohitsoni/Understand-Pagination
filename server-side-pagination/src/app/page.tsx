// page.tsx

import PaginationControls from "@/components/PaginationControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  "entry 1",
  "entry 2",
  "entry 3",
  "entry 4",
  "entry 5",
  "entry 6",
  "entry 7",
  "entry 8",
  "entry 9",
  "entry 10",
];

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams.page ?? "1";
  const per_page = searchParams.per_page ?? "5";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = data.slice(start, end);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <Card className="w-full max-w-md bg-white shadow-md rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {entries.map((entry) => (
              <p key={entry} className="text-center text-gray-700">
                {entry}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      <PaginationControls
        hasNextPage={end < data.length}
        hasPrevPage={start > 0}
        currentPage={Number(page)}
        perPage={Number(per_page)}
        totalPages={Math.ceil(data.length / Number(per_page))}
      />
    </div>
  );
}

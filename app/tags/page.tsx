import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { getTags } from "@/lib/actions";

export default async function Tags() {
  const tags = await getTags();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />
      <h1 className="text-2xl font-bold">tags.</h1>

      <section className="mt-4 flex flex-wrap px-4">
        {tags?.map((tag) => (
          <Badge key={tag.id} className="mx-2 mb-2" variant="outline">
            {tag.name}
          </Badge>
        ))}
      </section>
    </main>
  );
}

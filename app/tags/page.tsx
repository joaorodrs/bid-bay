import { Header } from "@/components/header";
import { getTags } from "@/lib/actions";

export default async function Tags() {
  const tags = await getTags();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <h1 className="text-2xl font-bold">tags.</h1>

      {tags?.map((tag) => <p key={tag.id}>{tag.name}</p>)}
    </main>
  );
}

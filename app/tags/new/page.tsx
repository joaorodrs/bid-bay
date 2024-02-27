import { TagForm } from "@/components/forms/tag-form";
import { Header } from "@/components/header";

export default function NewTag() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <h1 className="text-2xl font-bold">create tag.</h1>

      <TagForm />
    </main>
  );
}

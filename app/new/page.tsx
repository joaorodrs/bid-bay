import { PostForm } from "@/components/forms/post-form";
import { Header } from "@/components/header";

export default function NewPost() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <h1 className="text-2xl font-bold">create post.</h1>

      <PostForm />
    </main>
  );
}

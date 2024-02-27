import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/actions";

export default async function Profile() {
  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <h1 className="text-2xl font-bold">{user?.name}</h1>
      <h2 className="text-lg font-medium">{user?.email}</h2>
      <Button className="mt-4">edit profile</Button>
    </main>
  );
}

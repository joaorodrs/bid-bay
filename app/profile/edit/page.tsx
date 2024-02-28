import { ProfileForm } from "@/components/forms/profile-form";
import { Header } from "@/components/header";
import { getCurrentUser } from "@/lib/actions";

export default async function EditProfile() {
  const user = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header />

      <h1 className="text-2xl font-bold">edit profile.</h1>

      <ProfileForm defaultValues={user} />
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { LoginForm } from "@/components/forms/login-form";

export default function Login() {
  return (
    <main className="flex h-screen overflow-y-auto">
      <section className="m-auto flex flex-col">
        <AspectRatio ratio={1 / 1}>
          <Image src="/logo-light.webp" alt="BidBay" fill />
        </AspectRatio>
        <LoginForm />
        <Link
          href="/auth/register"
          className="mt-2 text-center text-sm text-foreground underline"
        >
          new here? sign up
        </Link>
      </section>
    </main>
  );
}

import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { RegisterForm } from "@/components/forms/register-form";

export default function Register() {
  return (
    <main className="flex h-screen overflow-y-auto">
      <section className="m-auto flex flex-col">
        <AspectRatio ratio={1 / 1}>
          <Image src="/logo-light.webp" alt="BidBay" fill />
        </AspectRatio>
        <RegisterForm />
        <a
          href="/register"
          className="mt-2 text-center text-sm text-foreground underline"
        >
          already have an account? sign in
        </a>
      </section>
    </main>
  );
}

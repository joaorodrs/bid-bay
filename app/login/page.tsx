import Image from "next/image";

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
      </section>
    </main>
  );
}

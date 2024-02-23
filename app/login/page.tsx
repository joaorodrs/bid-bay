import { authenticate } from "@/lib/actions";

export default function Login() {
  console.log("Login Page");
  return (
    <main className="flex h-screen overflow-y-auto">
      <form
        action={authenticate}
        className="m-auto flex max-w-96 flex-col gap-4 text-black"
      >
        <input name="email" type="email" placeholder="E-mail" required />
        <input name="password" type="password" placeholder="Senha" required />
        <button type="submit" className="bg-orange-500">
          Entrar
        </button>
      </form>
    </main>
  );
}

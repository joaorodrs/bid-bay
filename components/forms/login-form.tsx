"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { authenticate } from "@/lib/actions";
import { InputField } from "./input-field";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(authenticate)}
        className="m-auto flex flex-col gap-2"
      >
        <InputField name="email" label="E-mail" control={form.control} />
        <InputField
          name="password"
          type="password"
          label="Senha"
          control={form.control}
        />
        <Button type="submit" className="mt-2">
          Entrar
        </Button>
      </form>
    </Form>
  );
}

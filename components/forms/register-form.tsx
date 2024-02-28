"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { register } from "@/lib/actions";
import { InputField } from "./input-field";

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const formSchema = z
  .object({
    name: z.string().min(1, "required"),
    email: z.string().email().min(1, "required"),
    password: z.string().min(6, "password must have at least 6 chars"),
    confirmPassword: z.string().min(1, "required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwords don't match",
  });

export function RegisterForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await register(JSON.stringify(values));
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "invalid sign up info",
          description: err.message,
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-auto flex flex-col gap-2"
      >
        <InputField name="name" label="name" control={form.control} />
        <InputField name="email" label="e-mail" control={form.control} />
        <InputField
          name="password"
          type="password"
          data-testid="password-field"
          label="password"
          control={form.control}
        />
        <InputField
          name="confirmPassword"
          type="password"
          label="confirm your password"
          control={form.control}
        />
        <Button type="submit" className="mt-2">
          {form.formState.isSubmitting ? (
            <ReloadIcon className="size-4 animate-spin" />
          ) : (
            "sign up"
          )}
        </Button>
      </form>
    </Form>
  );
}

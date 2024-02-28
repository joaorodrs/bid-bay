"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { authenticate } from "@/lib/actions";
import { InputField } from "./input-field";
import { ReloadIcon } from "@radix-ui/react-icons";

export interface LoginFormValues {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export function LoginForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await authenticate(JSON.stringify(values));
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "invalid credentials",
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
        <InputField name="email" label="e-mail" control={form.control} />
        <InputField
          name="password"
          type="password"
          label="password"
          control={form.control}
        />
        <Button type="submit" className="mt-2">
          {form.formState.isSubmitting ? (
            <ReloadIcon className="size-4 animate-spin" />
          ) : (
            "enter"
          )}
        </Button>
      </form>
    </Form>
  );
}

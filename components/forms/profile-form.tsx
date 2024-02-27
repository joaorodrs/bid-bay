"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { updateUser } from "@/lib/actions";
import { InputField } from "./input-field";
import { User } from ".prisma/client";

export interface ProfileFormValues {
  name: string;
}

const formSchema = z.object({
  name: z.string().min(1, "required"),
});

export function ProfileForm({
  defaultValues,
}: {
  defaultValues?: Partial<User>;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      await updateUser(JSON.stringify(values));
    } catch (err) {
      if (err instanceof Error) {
        toast({
          title: "invalid update user info",
          description: err.message,
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto mt-10 flex flex-col gap-2"
      >
        <InputField name="name" label="name" control={form.control} />
        <InputField name="email" label="email" control={form.control} />
        <Button type="submit" className="mt-2">
          {form.formState.isSubmitting ? (
            <ReloadIcon className="size-4 animate-spin" />
          ) : (
            "update user"
          )}
        </Button>
      </form>
    </Form>
  );
}

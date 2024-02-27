"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { createTag } from "@/lib/actions";
import { InputField } from "./input-field";

export interface TagFormValues {
  name: string;
}

const formSchema = z.object({
  name: z.string().min(1, "required"),
});

export function TagForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: TagFormValues) => {
    try {
      await createTag(JSON.stringify(values));
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
        className="mx-auto mt-10 flex flex-col gap-2"
      >
        <InputField name="name" label="name" control={form.control} />
        <Button type="submit" className="mt-2">
          {form.formState.isSubmitting ? (
            <ReloadIcon className="size-4 animate-spin" />
          ) : (
            "create tag"
          )}
        </Button>
      </form>
    </Form>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { createPost } from "@/lib/actions";
import { InputField } from "./input-field";

export interface PostFormValues {
  title: string;
  description: string;
  content: string;
}

const formSchema = z.object({
  title: z.string().min(1, "required"),
  description: z.string().min(1, "required"),
  content: z.string().min(1, "required"),
});

export function PostForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: PostFormValues) => {
    try {
      await createPost(JSON.stringify(values));
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
        <InputField name="title" label="title" control={form.control} />
        <InputField
          name="description"
          label="description"
          control={form.control}
        />
        <InputField name="content" label="content" control={form.control} />
        <Button type="submit" className="mt-2">
          {form.formState.isSubmitting ? (
            <ReloadIcon className="size-4 animate-spin" />
          ) : (
            "post"
          )}
        </Button>
      </form>
    </Form>
  );
}

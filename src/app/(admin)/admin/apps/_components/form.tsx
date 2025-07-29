"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { createAppAction } from "../_actions/create-app.action";
import { updateAppAction } from "../_actions/update-app.action";
import { AdminApp } from "./columns";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";

const appSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  url: z.string().url().optional(),
  icon: z.string().optional(),
  category: z.string().optional(),
  type: z.string().min(1),
  featured: z.boolean().optional(),
});

interface Props {
  app: AdminApp | null;
  onSuccess: () => void;
}

export function AppForm({ app, onSuccess }: Props) {
  const form = useForm<z.infer<typeof appSchema>>({
    resolver: zodResolver(appSchema),
    defaultValues: app || { featured: false },
  });

  const { execute: createApp } = useServerAction(createAppAction, {
    onError: () => toast.error("Failed to create app"),
    onSuccess: () => { toast.success("Created"); onSuccess(); },
  });

  const { execute: updateApp } = useServerAction(updateAppAction, {
    onError: () => toast.error("Failed to update app"),
    onSuccess: () => { toast.success("Updated"); onSuccess(); },
  });

  const onSubmit = (values: z.infer<typeof appSchema>) => {
    if (app) {
      updateApp({ id: app.id, data: values });
    } else {
      createApp(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="slug" render={({ field }) => (
          <FormItem>
            <FormLabel>Slug</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="url" render={({ field }) => (
          <FormItem>
            <FormLabel>URL</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="icon" render={({ field }) => (
          <FormItem>
            <FormLabel>Icon</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="category" render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="type" render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="featured" render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <FormLabel>Featured</FormLabel>
          </FormItem>
        )} />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createUserAppAction } from "../_actions/create-user-app.action";
import { updateUserAppAction } from "../_actions/update-user-app.action";
import { AdminUserApp } from "./columns";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";

const schema = z.object({
  userId: z.string().min(1),
  appId: z.string().min(1),
  status: z.string().min(1),
  notes: z.string().optional(),
  contractTitle: z.string().optional(),
  contractFileUrl: z.string().optional(),
});

interface Props {
  app: AdminUserApp | null;
  onSuccess: () => void;
}

export function UserAppForm({ app, onSuccess }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: app
      ? { userId: "", appId: "", status: app.status, notes: app.notes || undefined }
      : { userId: "", appId: "", status: "active" },
  });

  const { execute: createUserApp } = useServerAction(createUserAppAction, {
    onError: () => toast.error("Failed to create user app"),
    onSuccess: () => { toast.success("Created"); onSuccess(); },
  });

  const { execute: updateUserApp } = useServerAction(updateUserAppAction, {
    onError: () => toast.error("Failed to update user app"),
    onSuccess: () => { toast.success("Updated"); onSuccess(); },
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    if (app) {
      updateUserApp({ id: app.id, ...values });
    } else {
      createUserApp(values);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField control={form.control} name="userId" render={({ field }) => (
          <FormItem>
            <FormLabel>User ID</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="appId" render={({ field }) => (
          <FormItem>
            <FormLabel>App ID</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="status" render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="notes" render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl><Textarea {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="contractTitle" render={({ field }) => (
          <FormItem>
            <FormLabel>Contract Title</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="contractFileUrl" render={({ field }) => (
          <FormItem>
            <FormLabel>Contract File URL</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}

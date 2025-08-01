"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  projectName: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  domainType: z.enum(["own", "subdomain"]),
});

export type StartProjectValues = z.infer<typeof formSchema>;

export function StartProjectForm() {
  const router = useRouter();
  const form = useForm<StartProjectValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      projectName: "",
      description: "",
      domainType: "own",
    },
  });

  const onSubmit = async (data: StartProjectValues) => {
    const res = await fetch("/api/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        project_name: data.projectName,
        description: data.description,
        domain_type: data.domainType,
      }),
    });

    if (res.ok) {
      toast.success("Order submitted");
      router.push("/start/thanks");
    } else {
      toast.error("Failed to submit order");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-3xl font-bold mb-4">Start your project</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="projectName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input placeholder="Optional" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={5} placeholder="Tell us about your project" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="domainType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domain type</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="own"
                        checked={field.value === "own"}
                        onChange={() => field.onChange("own")}
                      />
                      <span>Own domain</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="subdomain"
                        checked={field.value === "subdomain"}
                        onChange={() => field.onChange("subdomain")}
                      />
                      <span>Need .hswlp.com subdomain</span>
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">Submit order</Button>
        </form>
      </Form>
    </div>
  );
}


"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { Captcha } from "@/components/captcha";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiGithub as GithubIcon, SiX as XIcon, SiDiscord as DiscordIcon } from "@icons-pack/react-simple-icons";
import { toast } from "sonner";
import { useConfigStore } from "@/state/config";
import { catchaSchema } from "@/schemas/catcha.schema";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(1, "Message cannot be empty"),
  captchaToken: catchaSchema,
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { isTurnstileEnabled } = useConfigStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
      captchaToken: "",
    },
  });

  const captchaToken = useWatch({ control: form.control, name: 'captchaToken' });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send');

      toast.success('Message sent');
      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error('Failed to send message');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contact us</CardTitle>
            <CardDescription>
              We’d love to hear from you. Fill out the form and we’ll get back to you soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <p className="text-sm text-foreground">
                Thanks for reaching out! We’ll respond as soon as possible.
              </p>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Optional" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea rows={5} placeholder="Your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Captcha
                    onSuccess={(token) => form.setValue('captchaToken', token)}
                    validationError={form.formState.errors.captchaToken?.message}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={Boolean(isTurnstileEnabled && !captchaToken)}
                  >
                    Send message
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
            <CardDescription>Reach us through the channels below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium">Email</p>
              <a href="mailto:hello@hswlp.com" className="text-sm text-primary underline">
                hello@hswlp.com
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="GitHub">
                <GithubIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="X">
                <XIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground" aria-label="Discord">
                <DiscordIcon className="h-5 w-5" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


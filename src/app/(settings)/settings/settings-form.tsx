"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateUserProfileAction } from "./settings.actions";
import { useEffect } from "react";
import { useSessionStore } from "@/state/session";
import { userSettingsSchema } from "@/schemas/settings.schema";
import { useServerAction } from "zsa-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { Save, User } from "lucide-react";

export function SettingsForm() {
  const router = useRouter()

  const { execute: updateUserProfile, isPending } = useServerAction(updateUserProfileAction, {
    onError: (error) => {
      toast.dismiss()
      toast.error(error.err?.message || "Failed to update profile")
    },
    onStart: () => {
      toast.loading("Updating your profile...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Profile updated successfully")
      router.refresh()
    }
  })

  const { session, isLoading } = useSessionStore();
  const form = useForm<z.infer<typeof userSettingsSchema>>({
    resolver: zodResolver(userSettingsSchema)
  });

  useEffect(() => {
    if (session) {
      form.reset({
        firstName: session.user.firstName ?? '',
        nickname: session.user.nickname ?? '',
        lastName: session.user.lastName ?? '',
      });
    }
  }, [session, form])

  if (!session || isLoading) {
    return (
      <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <div className="space-y-2">
            <Skeleton className="h-8 w-[200px]" />
            <Skeleton className="h-4 w-[300px]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-[120px]" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  async function onSubmit(values: z.infer<typeof userSettingsSchema>) {
    updateUserProfile(values)
  }

  return (
    <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <User className="w-32 h-32" />
      </div>
      
      <CardHeader className="border-b border-muted-foreground/5 pb-8">
        <CardTitle className="text-2xl font-black tracking-tight">Profile Settings</CardTitle>
        <CardDescription className="text-base">
          Manage your account presence and identity across the HSWLP platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-8 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest font-bold text-muted-foreground">First Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background/50 border-muted-foreground/20 focus:border-primary/50 h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-background/50 border-muted-foreground/20 focus:border-primary/50 h-12 rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Display Name / Nickname</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-background/50 border-muted-foreground/20 focus:border-primary/50 h-12 rounded-xl" />
                  </FormControl>
                  <FormDescription className="text-xs italic">
                    This is how other users will see you in the community.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-6 rounded-2xl bg-muted/30 border border-muted-foreground/5 space-y-4">
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-widest font-bold text-muted-foreground opacity-50">Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    disabled
                    value={session.user.email ?? ''}
                    className="bg-background/30 border-dashed border-muted-foreground/20 h-12 rounded-xl cursor-not-allowed"
                  />
                </FormControl>
                <FormDescription className="text-[10px] uppercase tracking-tighter">
                  Primary account identifier. Contact support to change.
                </FormDescription>
              </FormItem>
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={isPending}
                className="rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <Save className="mr-2 h-4 w-4" />
                {isPending ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

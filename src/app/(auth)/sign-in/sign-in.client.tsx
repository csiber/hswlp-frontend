"use client";

import { signInAction } from "./sign-in.actions";
import { type SignInSchema, signInSchema } from "@/schemas/signin.schema";
import { type ReactNode, useState } from "react";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SeparatorWithText from "@/components/separator-with-text";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import Link from "next/link";
import { KeyIcon, Mail, Lock, ArrowRight, Fingerprint } from "lucide-react";
import { generateAuthenticationOptionsAction, verifyAuthenticationAction } from "@/app/(settings)/settings/security/passkey-settings.actions";
import { startAuthentication } from "@simplewebauthn/browser";
import type { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SignInClientProps {
  redirectPath: string;
}

interface PasskeyAuthenticationButtonProps {
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  redirectPath: string;
}

function PasskeyAuthenticationButton({ className, disabled, children, redirectPath }: PasskeyAuthenticationButtonProps) {
  const { execute: generateOptions } = useServerAction(generateAuthenticationOptionsAction, {
    onError: (error) => {
      toast.dismiss();
      toast.error(error.err?.message || "Failed to retrieve authentication options");
    },
  });

  const { execute: verifyAuthentication } = useServerAction(verifyAuthenticationAction, {
    onError: (error) => {
      toast.dismiss();
      toast.error(error.err?.message || "Authentication failed");
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Authentication successful");
      window.location.href = redirectPath;
    },
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleAuthenticate = async () => {
    try {
      setIsAuthenticating(true);
      toast.loading("Authenticating with passkey...");

      const [result] = await generateOptions({});
      const options = result?.optionsJSON as PublicKeyCredentialRequestOptionsJSON | undefined;

      if (!options) throw new Error("Failed to retrieve authentication options");

      const authenticationResponse = await startAuthentication({ optionsJSON: options });

      await verifyAuthentication({
        response: authenticationResponse,
        challenge: options.challenge,
      });
    } catch (error) {
      console.error("Passkey authentication error:", error);
      toast.dismiss();
      toast.error("Authentication failed");
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <Button
      onClick={handleAuthenticate}
      disabled={isAuthenticating || disabled}
      className={cn("h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 group transition-all", className)}
    >
      {isAuthenticating ? (
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Fingerprint className="mr-2 h-6 w-6" />
        </motion.div>
      ) : (
        <KeyIcon className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
      )}
      {isAuthenticating ? "Checking..." : children || "Sign in with Passkey"}
    </Button>
  );
}

const SignInPage = ({ redirectPath }: SignInClientProps) => {
  const { execute: signIn, isPending } = useServerAction(signInAction, {
    onError: (error) => {
      toast.dismiss()
      toast.error(error.err?.message)
    },
    onStart: () => {
      toast.loading("Signing in...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Welcome back!")
      window.location.href = redirectPath;
    }
  })
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInSchema) => {
    signIn(data)
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 justify-center relative overflow-hidden bg-background py-12">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4"
          >
            <Lock className="h-8 w-8" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Continue your journey on the HSWLP platform.
          </p>
        </div>

        <div className="space-y-8 p-8 md:p-10 bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-muted-foreground/10 relative overflow-hidden">
          <div className="space-y-4">
            <PasskeyAuthenticationButton className="w-full" redirectPath={redirectPath}>
              Sign in with Passkey
            </PasskeyAuthenticationButton>
          </div>

          <SeparatorWithText>
            <span className="uppercase text-[10px] font-black tracking-[0.2em] text-muted-foreground/50">Or use credentials</span>
          </SeparatorWithText>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="Email address"
                          type="email"
                          className="pl-12 h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type="password"
                          placeholder="Password"
                          className="pl-12 h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end px-1">
                <Link href="/forgot-password" title="Reset your password" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/10 transition-all hover:shadow-primary/20 active:scale-[0.98]"
              >
                {isPending ? "Signing in..." : "Access Dashboard"}
                {!isPending && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </form>
          </Form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Don&apos;t have an account yet?{" "}
            <Link 
              href={`/sign-up?redirect=${encodeURIComponent(redirectPath)}`} 
              className="font-bold text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              Create free account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInPage;

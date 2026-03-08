"use client";

import { signUpAction } from "./sign-up.actions";
import { type SignUpSchema, signUpSchema } from "@/schemas/signup.schema";
import { type PasskeyEmailSchema, passkeyEmailSchema } from "@/schemas/passkey.schema";
import { startPasskeyRegistrationAction, completePasskeyRegistrationAction } from "./passkey-sign-up.actions";

import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SeparatorWithText from "@/components/separator-with-text";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { Captcha } from "@/components/captcha";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useServerAction } from "zsa-react";
import Link from "next/link";
import { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import { KeyIcon, Mail, User, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'
import { useConfigStore } from "@/state/config";
import { REDIRECT_AFTER_SIGN_IN } from "@/constants";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SignUpClientProps {
  redirectPath: string;
}

const SignUpPage = ({ redirectPath }: SignUpClientProps) => {
  const { isTurnstileEnabled } = useConfigStore();
  const [isPasskeyModalOpen, setIsPasskeyModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const { execute: signUp, isPending } = useServerAction(signUpAction, {
    onError: (error) => {
      toast.dismiss()
      toast.error(error.err?.message)
    },
    onStart: () => {
      toast.loading("Creating account...")
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Account created successfully")
      window.location.href = redirectPath || REDIRECT_AFTER_SIGN_IN
    }
  })

  const { execute: completePasskeyRegistration } = useServerAction(completePasskeyRegistrationAction, {
    onError: (error) => {
      toast.dismiss()
      toast.error(error.err?.message)
      setIsRegistering(false)
    },
    onSuccess: () => {
      toast.dismiss()
      toast.success("Account created successfully")
      window.location.href = redirectPath || REDIRECT_AFTER_SIGN_IN
    }
  })

  const { execute: startPasskeyRegistration } = useServerAction(startPasskeyRegistrationAction, {
    onError: (error) => {
      toast.dismiss()
      toast.error(error.err?.message)
      setIsRegistering(false)
    },
    onStart: () => {
      toast.loading("Starting passkey registration...")
      setIsRegistering(true)
    },
    onSuccess: async (response) => {
      toast.dismiss()
      if (!response?.data?.optionsJSON) {
        toast.error("Failed to start passkey registration")
        setIsRegistering(false)
        return;
      }

      try {
        const attResp = await startRegistration({
          optionsJSON: response.data.optionsJSON,
          useAutoRegister: true,
        });
        await completePasskeyRegistration({ response: attResp });
      } catch (error: unknown) {
        console.error("Failed to register the passkey:", error);
        toast.error("Failed to register the passkey")
        setIsRegistering(false)
      }
    }
  })

  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const passkeyForm = useForm<PasskeyEmailSchema>({
    resolver: zodResolver(passkeyEmailSchema),
  });

  const captchaToken = useWatch({ control: form.control, name: 'captchaToken' });
  const passkeyCaptchaToken = useWatch({ control: passkeyForm.control, name: 'captchaToken' });

  const onSubmit = async (data: SignUpSchema) => {
    signUp(data)
  }

  const onPasskeySubmit = async (data: PasskeyEmailSchema) => {
    startPasskeyRegistration(data)
  }

  return (
    <div className="min-h-screen flex items-center px-4 justify-center relative overflow-hidden bg-background py-12">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4"
          >
            <ShieldCheck className="h-8 w-8" />
          </motion.div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Join HSWLP</h1>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Create your high-performance cloud account in seconds.
          </p>
        </div>

        <div className="space-y-8 p-8 md:p-10 bg-card/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-muted-foreground/10 relative overflow-hidden">
          <div className="space-y-4">
            <Button
              className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 group transition-all"
              onClick={() => setIsPasskeyModalOpen(true)}
            >
              <KeyIcon className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
              Sign up with Passkey
            </Button>
          </div>

          <SeparatorWithText>
            <span className="uppercase text-[10px] font-black tracking-[0.2em] text-muted-foreground/50">Or register manually</span>
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
                          type="email"
                          placeholder="Email address"
                          className="pl-12 h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="First name"
                          className="h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                          {...field}
                        />
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
                      <FormControl>
                        <Input
                          placeholder="Last name"
                          className="h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                          {...field}
                        />
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
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          placeholder="Nickname (optional)"
                          className="pl-12 h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          className="h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm"
                          className="h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-6 pt-4">
                <Captcha
                  onSuccess={(token) => form.setValue('captchaToken', token)}
                  validationError={form.formState.errors.captchaToken?.message}
                />

                <Button
                  type="submit"
                  className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/10 transition-all hover:shadow-primary/20 active:scale-[0.98]"
                  disabled={isPending || Boolean(isTurnstileEnabled && !captchaToken)}
                >
                  {isPending ? "Creating account..." : "Start Building Now"}
                  {!isPending && <ArrowRight className="ml-2 h-5 w-5" />}
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-relaxed">
              By joining, you agree to our{" "}
              <Link href="/terms" className="font-bold text-foreground hover:text-primary">Terms</Link> & <Link href="/privacy" className="font-bold text-foreground hover:text-primary">Privacy Policy</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link 
              href={`/sign-in?redirect=${encodeURIComponent(redirectPath)}`} 
              className="font-bold text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>

      <Dialog open={isPasskeyModalOpen} onOpenChange={setIsPasskeyModalOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl border-muted-foreground/10 bg-background/95 backdrop-blur-xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <DialogTitle className="text-2xl font-black tracking-tight">Passkey Registration</DialogTitle>
            </div>
            <DialogDescription className="text-base">
              Secure your account with biometric authentication. Faster, safer, and passwordless.
            </DialogDescription>
          </DialogHeader>
          <Form {...passkeyForm}>
            <form onSubmit={passkeyForm.handleSubmit(onPasskeySubmit)} className="space-y-6 mt-6">
              <FormField
                control={passkeyForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                        disabled={isRegistering}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={passkeyForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest font-bold text-muted-foreground">First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          className="h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                          disabled={isRegistering}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={passkeyForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          className="h-14 rounded-2xl bg-background/50 border-muted-foreground/20 focus:border-primary/50 transition-all"
                          disabled={isRegistering}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-6">
                <Captcha
                  onSuccess={(token) => passkeyForm.setValue('captchaToken', token)}
                  validationError={passkeyForm.formState.errors.captchaToken?.message}
                />

                <Button
                  type="submit"
                  className="w-full h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20 transition-all"
                  disabled={isRegistering || Boolean(isTurnstileEnabled && !passkeyCaptchaToken)}
                >
                  {isRegistering ? (
                    <>
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                        <Loader2 className="mr-2 h-5 w-5" />
                      </motion.div>
                      Registering...
                    </>
                  ) : (
                    "Create Passkey"
                  )}
                </Button>
              </div>
              {!isRegistering && (
                <p className="text-xs text-muted-foreground text-center bg-muted/30 p-4 rounded-xl border border-muted-foreground/5 italic">
                  After continuing, your browser will prompt you to create and save a Passkey so you can sign in securely without a password.
                </p>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignUpPage;

"use client";

import { useState, useRef } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import type { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  generateRegistrationOptionsAction,
  verifyRegistrationAction,
  deletePasskeyAction,
} from "./passkey-settings.actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useServerAction } from "zsa-react";
import { PASSKEY_AUTHENTICATOR_IDS } from "@/utils/passkey-authenticator-ids";
import { cn } from "@/lib/utils";
import type { ParsedUserAgent } from "@/types";
import { Fingerprint, Trash2, ShieldCheck, Cpu, Globe, Monitor, Smartphone, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PasskeyRegistrationButtonProps {
  email: string;
  className?: string;
  onSuccess?: () => void;
}

function PasskeyRegistrationButton({ email, className, onSuccess }: PasskeyRegistrationButtonProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setIsRegistering(true);
      const [result] = await generateRegistrationOptionsAction({ email });
      const options = result as PublicKeyCredentialCreationOptionsJSON | undefined;

      if (!options) throw new Error("Failed to get registration options");

      const registrationResponse = await startRegistration({ optionsJSON: options });

      await verifyRegistrationAction({
        email,
        response: registrationResponse,
        challenge: options.challenge,
      });

      toast.success("Passkey registered successfully");
      onSuccess?.();
      router.refresh();
    } catch (error) {
      console.error("Passkey registration error:", error);
      toast.error("Failed to register passkey");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <Button
      onClick={handleRegister}
      disabled={isRegistering}
      className={cn("rounded-xl h-12 px-6 font-bold shadow-lg shadow-primary/20", className)}
    >
      {isRegistering ? (
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
          <Fingerprint className="mr-2 h-5 w-5" />
        </motion.div>
      ) : (
        <Plus className="mr-2 h-5 w-5" />
      )}
      {isRegistering ? "Registering..." : "Add New Passkey"}
    </Button>
  );
}

interface Passkey {
  id: string;
  credentialId: string;
  userId: string;
  createdAt: Date;
  aaguid: string | null;
  userAgent: string | null;
  parsedUserAgent?: ParsedUserAgent;
}

interface PasskeysListProps {
  passkeys: Passkey[];
  currentPasskeyId: string | null;
  email: string | null;
}

export function PasskeysList({ passkeys, currentPasskeyId, email }: PasskeysListProps) {
  const router = useRouter();
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const { execute: deletePasskey, isPending: isDeleting } = useServerAction(deletePasskeyAction, {
    onSuccess: () => {
      toast.success("Passkey deleted");
      dialogCloseRef.current?.click();
      router.refresh();
    }
  });

  const isCurrentPasskey = (passkey: Passkey) =>
    passkey.credentialId === currentPasskeyId;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-muted-foreground/5 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Security & Access</h1>
          </div>
          <p className="text-muted-foreground max-w-lg">
            Manage your passkeys for secure, biometric-based authentication. 
            Passkeys provide the highest level of protection for your account.
          </p>
        </div>
        {email && (
          <PasskeyRegistrationButton
            email={email}
          />
        )}
      </div>

      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          {passkeys.map((passkey, index) => (
            <motion.div
              key={passkey.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <Card className={cn(
                "group overflow-hidden border-muted-foreground/10 bg-card/50 backdrop-blur-sm transition-all duration-300",
                isCurrentPasskey(passkey) ? "border-primary/30 ring-1 ring-primary/10 shadow-lg shadow-primary/5" : "hover:border-primary/20"
              )}>
                <CardHeader className="pb-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className={cn(
                        "h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                        isCurrentPasskey(passkey) ? "bg-primary/20 text-primary" : "bg-muted/50 text-muted-foreground group-hover:bg-primary/5 group-hover:text-primary"
                      )}>
                        {passkey.parsedUserAgent?.device.type === 'mobile' ? <Smartphone className="h-6 w-6" /> : <Monitor className="h-6 w-6" />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <CardTitle className="text-lg font-bold">
                            {passkey.aaguid && (PASSKEY_AUTHENTICATOR_IDS as Record<string, string>)[passkey.aaguid] || "Security Key"}
                          </CardTitle>
                          {isCurrentPasskey(passkey) && (
                            <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                              Current Session
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                          Created {formatDistanceToNow(passkey.createdAt)} ago
                        </div>
                      </div>
                    </div>
                    
                    {!isCurrentPasskey(passkey) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-3xl border-muted-foreground/10 bg-background/95 backdrop-blur-xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-black">Delete passkey?</DialogTitle>
                            <DialogDescription className="text-base mt-2">
                              This will remove this authentication method. You can always add it again later.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="mt-8 flex gap-3">
                            <DialogClose ref={dialogCloseRef} asChild>
                              <Button variant="ghost" className="rounded-xl h-12 flex-1">Cancel</Button>
                            </DialogClose>
                            <Button
                              variant="destructive"
                              disabled={isDeleting}
                              className="rounded-xl h-12 flex-1 font-bold shadow-lg shadow-red-500/20"
                              onClick={() => deletePasskey({ credentialId: passkey.credentialId })}
                            >
                              {isDeleting ? "Deleting..." : "Delete Passkey"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="bg-muted/5 border-t border-muted-foreground/5 py-4">
                  <div className="flex flex-wrap gap-y-2 gap-x-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Globe className="h-3.5 w-3.5" />
                      <span className="font-semibold text-foreground/70">{passkey.parsedUserAgent?.browser.name}</span>
                      <span className="opacity-50 text-xs">{passkey.parsedUserAgent?.browser.major}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Cpu className="h-3.5 w-3.5" />
                      <span className="font-semibold text-foreground/70">{passkey.parsedUserAgent?.os.name}</span>
                      <span className="opacity-50 text-xs">{passkey.parsedUserAgent?.os.version}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {passkeys.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-muted/5 border-2 border-dashed border-muted-foreground/10 rounded-3xl"
          >
            <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4 text-primary opacity-20">
              <Fingerprint className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">No passkeys found</h3>
            <p className="text-muted-foreground mt-2 max-w-xs mx-auto">
              Strengthen your account security by adding a biometric passkey.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

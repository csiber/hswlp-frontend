"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CREDIT_PACKAGES, FREE_MONTHLY_CREDITS } from "@/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StripePaymentForm } from "./stripe-payment-form";
import { createPaymentIntent } from "@/actions/credits.action";
import { Coins, Sparkles, Zap, ArrowUpRight, ShieldCheck } from "lucide-react";
import { useSessionStore } from "@/state/session";
import { useTransactionStore } from "@/state/transaction";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type CreditPackage = (typeof CREDIT_PACKAGES)[number];

export const getPackageIcon = (index: number) => {
  if (index === 2) return <Zap className="h-8 w-8 text-amber-500" />;
  if (index === 1) return <Sparkles className="h-8 w-8 text-blue-500" />;
  return <Coins className="h-8 w-8 text-emerald-500" />;
};

const calculateSavings = (pkg: CreditPackage) => {
  const basePackage = CREDIT_PACKAGES[0];
  const basePrice = basePackage.price / basePackage.credits;
  const currentPrice = pkg.price / pkg.credits;
  const savings = ((basePrice - currentPrice) / basePrice) * 100;
  return Math.round(savings);
};

export function CreditPackages() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const session = useSessionStore((state) => state);
  const transactionsRefresh = useTransactionStore((state) => state.triggerRefresh);
  const sessionIsLoading = session?.isLoading;

  const handlePurchase = async (pkg: CreditPackage) => {
    try {
      const { clientSecret } = await createPaymentIntent({
        packageId: pkg.id,
      });
      setClientSecret(clientSecret);
      setSelectedPackage(pkg);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      toast.error("Failed to initialize payment. Please try again.");
    }
  };

  const handleSuccess = () => {
    setIsDialogOpen(false);
    setSelectedPackage(null);
    setClientSecret(null);
    router.refresh();
    transactionsRefresh();
  };

  return (
    <div className="space-y-8">
      {/* Current Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Coins className="w-48 h-48" />
          </div>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Coins className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-black uppercase tracking-tight">Credit Balance</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-6 relative z-10">
            <div className="flex flex-col gap-1">
              {sessionIsLoading ? (
                <Skeleton className="h-14 w-48" />
              ) : (
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black tracking-tighter">
                    {session?.session?.user?.currentCredits.toLocaleString()}
                  </span>
                  <span className="text-xl font-bold text-muted-foreground">CREDITS</span>
                </div>
              )}
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                You receive <strong>{FREE_MONTHLY_CREDITS}</strong> complimentary credits every month.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Up Section */}
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-black tracking-tight">Top Up Your Credits</h2>
          <p className="text-muted-foreground text-lg">Choose a package that fits your needs. Credits never expire.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CREDIT_PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className={cn(
                "h-full flex flex-col justify-between overflow-hidden border-muted-foreground/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5",
                "relative group"
              )}>
                {index === 2 && (
                  <div className="absolute top-0 right-0">
                    <Badge className="bg-amber-500 text-white rounded-none rounded-bl-xl border-none font-bold px-3 py-1">
                      BEST VALUE
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex flex-col gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      {getPackageIcon(index)}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-black tracking-tight">{pkg.credits.toLocaleString()}</span>
                        <span className="text-sm font-bold text-muted-foreground uppercase">Credits</span>
                      </div>
                      {index > 0 && (
                        <Badge variant="secondary" className="mt-2 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold">
                          Save {calculateSavings(pkg)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 pt-0">
                  <div className="h-px bg-muted-foreground/5 w-full" />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Price</span>
                      <span className="text-3xl font-black text-primary">${pkg.price}</span>
                    </div>
                    <span className="text-xs text-muted-foreground italic">One-time payment</span>
                  </div>
                  
                  <Button
                    onClick={() => {
                      if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
                        handlePurchase(pkg);
                      } else {
                        toast.error("Payment provider error. Please try again later.");
                      }
                    }}
                    className="w-full h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30"
                  >
                    Purchase Now <ArrowUpRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-3xl border-muted-foreground/10 bg-background/95 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black">Secure Checkout</DialogTitle>
            <CardDescription className="text-base">
              Complete your purchase of <strong>{selectedPackage?.credits.toLocaleString()}</strong> credits.
            </CardDescription>
          </DialogHeader>
          {clientSecret && selectedPackage && (
            <div className="mt-4">
              <StripePaymentForm
                packageId={selectedPackage.id}
                clientSecret={clientSecret}
                onSuccess={handleSuccess}
                onCancel={() => setIsDialogOpen(false)}
                credits={selectedPackage.credits}
                price={selectedPackage.price}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

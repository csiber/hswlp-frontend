"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { getTransactions } from "@/actions/credits.action";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, History, Download, ArrowUpCircle, ArrowDownCircle, AlertCircle, Clock } from "lucide-react";
import { format, isPast } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useTransactionStore } from "@/state/transaction";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type TransactionData = Awaited<ReturnType<typeof getTransactions>>

function isTransactionExpired(transaction: TransactionData["transactions"][number]): boolean {
  return transaction.expirationDate ? isPast(new Date(transaction.expirationDate)) : false;
}

export function TransactionHistory() {
  const [data, setData] = useState<TransactionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const refreshTrigger = useTransactionStore((state) => state.refreshTrigger);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const result = await getTransactions({ page });
        setData(result);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [page, refreshTrigger]);

  if (isLoading) {
    return (
      <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-muted-foreground/10 bg-card/50 backdrop-blur-xl overflow-hidden shadow-2xl shadow-primary/5">
      <CardHeader className="border-b border-muted-foreground/5 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <History className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl font-black uppercase tracking-tight">Transaction History</CardTitle>
              <CardDescription>A complete log of your credit usage and top-ups</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-muted-foreground/5 hover:bg-transparent">
                <TableHead className="font-bold uppercase text-[10px] tracking-widest pl-6">Date</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest">Type</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest">Amount</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest">Description</TableHead>
                <TableHead className="font-bold uppercase text-[10px] tracking-widest pr-6 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence mode="popLayout">
                {data?.transactions.length ? data.transactions.map((transaction, index) => {
                  const isUsage = transaction.type === "USAGE";
                  const isExpired = isTransactionExpired(transaction);
                  
                  return (
                    <motion.tr 
                      key={transaction.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="group border-muted-foreground/5 hover:bg-primary/5 transition-colors"
                    >
                      <TableCell className="pl-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{format(new Date(transaction.createdAt), "MMM d, yyyy")}</span>
                          <span className="text-[10px] text-muted-foreground">{format(new Date(transaction.createdAt), "HH:mm")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn(
                          "rounded-lg font-bold text-[10px] uppercase tracking-tighter px-2 py-0.5",
                          isUsage ? "bg-red-500/5 text-red-500 border-red-500/20" : "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
                        )}>
                          {transaction.type.toLowerCase().replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className={cn(
                          "flex items-center gap-1.5 font-black text-sm",
                          isUsage ? "text-red-500" : isExpired ? "text-amber-500" : "text-emerald-500"
                        )}>
                          {isUsage ? <ArrowDownCircle className="h-3.5 w-3.5" /> : <ArrowUpCircle className="h-3.5 w-3.5" />}
                          {isUsage ? "-" : "+"}{Math.abs(transaction.amount)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-foreground/80">{transaction.description}</span>
                          {!isUsage && transaction.expirationDate && (
                            <div className={cn(
                              "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tight",
                              isExpired ? "text-amber-500" : "text-muted-foreground/60"
                            )}>
                              {isExpired ? <AlertCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                              {isExpired ? "Expired" : "Expires"}: {format(new Date(transaction.expirationDate), "MMM d, yyyy")}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        {transaction.type === "PURCHASE" && transaction.paymentIntentId ? (
                          <Button asChild size="sm" variant="ghost" className="h-8 rounded-lg text-primary hover:text-primary hover:bg-primary/10">
                            <a href={`/api/receipts/${transaction.paymentIntentId}`} target="_blank" rel="noopener noreferrer">
                              <Download className="mr-2 h-3.5 w-3.5" /> Receipt
                            </a>
                          </Button>
                        ) : null}
                      </TableCell>
                    </motion.tr>
                  );
                }) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <History className="h-8 w-8 opacity-10" />
                        <p className="font-medium">No transactions found</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>

        {Boolean(data?.pagination.pages && data.pagination.pages > 1) && (
          <div className="p-4 border-t border-muted-foreground/5 flex items-center justify-between bg-muted/10">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg h-9"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <div className="flex items-center gap-2">
              {[...Array(data?.pagination.pages || 0)].map((_, i) => {
                const pageNum = i + 1;
                // Show only current, first, last, and pages around current
                if (
                  pageNum === 1 || 
                  pageNum === data?.pagination.pages || 
                  (pageNum >= page - 1 && pageNum <= page + 1)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-xs font-bold transition-all",
                        page === pageNum ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "hover:bg-primary/10 text-muted-foreground"
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                }
                if (pageNum === page - 2 || pageNum === page + 2) {
                  return <span key={pageNum} className="text-muted-foreground text-xs">...</span>;
                }
                return null;
              })}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="rounded-lg h-9"
              onClick={() => setPage((p) => Math.min(data?.pagination.pages ?? 1, p + 1))}
              disabled={page === (data?.pagination.pages ?? 1)}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

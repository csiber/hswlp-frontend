"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Loader2, UploadCloud, FileText, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ShareAI() {
  const [files, setFiles] = useState<{name: string, size: string, status: 'scanning' | 'safe' | 'risk'}[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    simulateUpload(droppedFiles);
  };

  const simulateUpload = (newFiles: File[]) => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFiles(prevFiles => [
            ...newFiles.map(f => ({
              name: f.name,
              size: `${(f.size / 1024).toFixed(1)} KB`,
              status: (Math.random() > 0.8 ? 'risk' : 'scanning') as 'scanning' | 'safe' | 'risk'
            })),
            ...prevFiles
          ]);
          
          setTimeout(() => {
            setFiles(current => current.map(f => f.status === 'scanning' ? {...f, status: 'safe'} : f));
          }, 2000);
          
          return 0;
        }
        return prev + 10;
      });
    }, 100);
  };

  return (
    <div className="flex-1 flex flex-col gap-6 h-full">
      <div 
        className={cn(
          "flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl transition-all duration-300 relative overflow-hidden",
          isDragging ? "border-primary bg-primary/5 scale-[0.99]" : "border-muted-foreground/20 bg-muted/5",
          uploadProgress > 0 && "pointer-events-none opacity-50"
        )}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {uploadProgress > 0 && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
            <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
            <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
            </div>
            <p className="mt-2 text-sm font-medium">Encrypting & Uploading...</p>
          </div>
        )}
        
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6 transition-transform duration-500 hover:scale-110 hover:rotate-3">
          <Share2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold">ShareAI Secure Drop</h2>
        <p className="text-muted-foreground max-w-sm mt-2 text-center">
          Drag & drop files to scan for sensitive data and generate a secure link.
        </p>
        <Button className="mt-8 rounded-xl h-12 px-8" onClick={() => simulateUpload([new File(["demo"], "document.pdf", { type: "application/pdf" })])}>
          <UploadCloud className="mr-2 h-4 w-4" /> Browse Files
        </Button>
      </div>

      {files.length > 0 && (
        <div className="h-1/3 bg-card/50 border border-muted-foreground/10 rounded-3xl p-4 overflow-y-auto">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-2">Recent Uploads</h3>
          <div className="space-y-2">
            <AnimatePresence>
              {files.map((file, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-muted-foreground/10"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-lg", file.status === 'risk' ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary")}>
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{file.size}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {file.status === 'scanning' && <span className="text-xs text-muted-foreground animate-pulse">Analyzing...</span>}
                    {file.status === 'safe' && <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 gap-1"><CheckCircle2 className="h-3 w-3" /> Safe</Badge>}
                    {file.status === 'risk' && <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20 gap-1"><AlertCircle className="h-3 w-3" /> PII Detected</Badge>}
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-red-500" onClick={() => setFiles(f => f.filter((_, idx) => idx !== i))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

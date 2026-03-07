"use client";

import { App } from "@/db/schema";
import { motion } from "framer-motion";
import { 
  Share2, 
  MessageSquare, 
  HardDrive, 
  Layout,
  ExternalLink,
  Maximize2,
  Settings,
  ArrowUpRight,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Component placeholders for each app
const ShareAI = () => (
  <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-3xl bg-muted/5 p-12 text-center">
    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
      <Share2 className="h-10 w-10 text-primary" />
    </div>
    <h2 className="text-2xl font-bold">ShareAI File Drop</h2>
    <p className="text-muted-foreground max-w-sm mt-2">
      Drag and drop files here to share them securely with AI-powered privacy controls.
    </p>
    <Button className="mt-8 rounded-xl h-12 px-8">Upload Files</Button>
  </div>
);

const Talk = () => (
  <div className="flex-1 flex flex-col h-full bg-card/50 backdrop-blur-xl border border-muted-foreground/10 rounded-3xl overflow-hidden">
    <div className="p-4 border-b border-muted-foreground/10 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <span className="font-bold">Talk Assistant</span>
      </div>
      <Badge variant="outline">Online</Badge>
    </div>
    <div className="flex-1 p-6 space-y-4 overflow-y-auto">
      <div className="bg-muted/50 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm leading-relaxed">
        Hello! I&apos;m your Talk AI assistant. How can I help you today?
      </div>
    </div>
    <div className="p-4 border-t border-muted-foreground/10 bg-muted/20">
      <div className="flex gap-2">
        <input 
          placeholder="Type a message..." 
          className="flex-1 bg-background/50 border border-muted-foreground/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <Button className="rounded-xl h-12 w-12 p-0">
          <ArrowUpRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  </div>
);

const DevShell = () => (
  <div className="flex-1 flex flex-col h-full bg-zinc-950 rounded-3xl border border-zinc-800 overflow-hidden font-mono shadow-2xl">
    <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center gap-2">
      <div className="flex gap-1.5 ml-1">
        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
        <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
      </div>
      <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest ml-4">hswlp-shell v1.0.4</span>
    </div>
    <div className="flex-1 p-6 text-emerald-500 space-y-2 text-sm">
      <p>HSWLP(tm) Multi-Cloud Shell (D1/KV/R2)</p>
      <p className="opacity-50">Connected to cloud-region-eu-1 (D1_PRIMARY)</p>
      <div className="pt-4 flex gap-2">
        <span className="text-primary font-bold">hswlp ~ $</span>
        <span className="animate-pulse">_</span>
      </div>
    </div>
  </div>
);

const NAS = () => (
  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6">
    <div className="md:col-span-1 bg-card/30 backdrop-blur-xl border border-muted-foreground/10 rounded-3xl p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground">Storage</h3>
        <div className="space-y-2">
          {['Documents', 'Photos', 'Backups', 'Shared'].map(folder => (
            <div key={folder} className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/5 cursor-pointer transition-colors group">
              <HardDrive className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              <span className="text-sm font-medium">{folder}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="md:col-span-3 border border-muted-foreground/10 rounded-3xl bg-muted/5 flex items-center justify-center p-12 text-center border-dashed">
       <div className="space-y-4">
         <HardDrive className="h-12 w-12 text-muted-foreground mx-auto opacity-20" />
         <p className="text-muted-foreground italic text-sm">Select a directory to view contents</p>
       </div>
    </div>
  </div>
);

const Builder = () => (
  <div className="flex-1 flex flex-col gap-6 h-full">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-black">Canvas Builder</h2>
        <p className="text-sm text-muted-foreground">Design your landing page by dragging components</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="rounded-lg">Preview</Button>
        <Button size="sm" className="rounded-lg shadow-lg shadow-primary/20">Publish</Button>
      </div>
    </div>
    <div className="flex-1 flex gap-6">
      <div className="w-64 bg-card/50 backdrop-blur-xl border border-muted-foreground/10 rounded-3xl p-6 overflow-y-auto">
        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Components</h3>
        <div className="grid grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square rounded-xl bg-muted border border-muted-foreground/10 flex items-center justify-center hover:border-primary/50 cursor-grab transition-all">
              <Layout className="h-6 w-6 text-muted-foreground/50" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 bg-white dark:bg-zinc-900 border-2 border-dashed border-muted-foreground/10 rounded-3xl flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
            <Plus className="h-8 w-8 text-primary opacity-20" />
          </div>
          <p className="text-muted-foreground italic text-sm">Drop components here to start building</p>
        </div>
      </div>
    </div>
  </div>
);

export function AppShell({ app }: { app: App }) {
  const renderApp = () => {
    switch (app.slug) {
      case 'shareai': return <ShareAI />;
      case 'talk': return <Talk />;
      case 'devshell': return <DevShell />;
      case 'nas': return <NAS />;
      case 'builder': return <Builder />;
      default: return (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center">
            <ExternalLink className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{app.name}</h2>
            <p className="text-muted-foreground max-w-sm">
              This app is currently only available as an external service or its dashboard interface is under development.
            </p>
          </div>
          {app.url && (
            <Button asChild className="rounded-xl h-12 px-8">
              <a href={app.url} target="_blank" rel="noopener noreferrer">
                Visit External Site <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      );
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col h-[calc(100vh-12rem)]"
    >
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/5 text-primary">
             <Settings className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">{app.name}</h1>
            <Badge variant="outline" className="mt-1">{app.type}</Badge>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10">
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {renderApp()}
    </motion.div>
  );
}

"use client";

import { App } from "@/db/schema";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Share2, 
  MessageSquare, 
  Maximize2,
  Settings,
  ArrowUpRight,
  Plus,
  Send,
  Loader2,
  Terminal as TerminalIcon,
  FileText,
  Trash2,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Folder,
  ChevronRight,
  Home,
  Image as ImageIcon,
  Type,
  Square,
  Box,
  ExternalLink
  } from "lucide-react";import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

// --- ShareAI Component ---
const ShareAI = () => {
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
};

// --- Talk Component ---
const Talk = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([
    { role: 'ai', content: "Hello! I'm your Talk AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `I processed your request: "${userMsg}". As a demo AI, I can tell you that the weather in the cloud is always sunny! ☀️` 
      }]);
    }, 1500);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-card/50 backdrop-blur-xl border border-muted-foreground/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-muted-foreground/10 flex items-center justify-between bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center relative">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <span className="font-bold block leading-none">Talk Assistant</span>
            <span className="text-xs text-muted-foreground">Always active</span>
          </div>
        </div>
        <Badge variant="outline" className="bg-background/50">v2.4.0</Badge>
      </div>
      
      <div className="flex-1 p-6 overflow-y-auto" ref={scrollRef}>
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("flex gap-4 max-w-[85%]", msg.role === 'user' ? "ml-auto flex-row-reverse" : "")}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.role === 'ai' ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              )}>
                {msg.role === 'ai' ? <MessageSquare className="h-4 w-4" /> : <div className="h-4 w-4 rounded-full bg-foreground/20" />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                msg.role === 'ai' ? "bg-background border border-muted-foreground/10 rounded-tl-none" : "bg-primary text-primary-foreground rounded-tr-none"
              )}>
                {msg.content}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="bg-background border border-muted-foreground/10 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-muted-foreground/10 bg-muted/20">
        <div className="flex gap-2 relative">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..." 
            className="flex-1 bg-background border border-muted-foreground/20 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/20 pr-14 shadow-sm"
          />
          <Button 
            onClick={sendMessage}
            className="absolute right-2 top-2 bottom-2 rounded-xl w-10 h-10 p-0 shadow-lg shadow-primary/20 transition-transform active:scale-95"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- DevShell Component ---
const DevShell = () => {
  const [history, setHistory] = useState<{cmd: string, out: string}[]>([
    { cmd: '', out: 'HSWLP(tm) Multi-Cloud Shell (D1/KV/R2) \nConnected to cloud-region-eu-1 (D1_PRIMARY)\nType "help" for commands.' }
  ]);
  const [cmd, setCmd] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const executeCmd = () => {
    const command = cmd.trim().toLowerCase();
    let output = "";

    switch (command) {
      case 'help':
        output = "Available commands: help, clear, ls, whoami, date, echo [text]";
        break;
      case 'clear':
        setHistory([]);
        setCmd("");
        return;
      case 'ls':
        output = "drwxr-xr-x  config\n-rw-r--r--  .env\n-rw-r--r--  package.json\n-rw-r--r--  README.md";
        break;
      case 'whoami':
        output = "root@hswlp-cloud";
        break;
      case 'date':
        output = new Date().toString();
        break;
      default:
        if (command.startsWith('echo ')) {
          output = command.substring(5);
        } else if (command === "") {
          output = "";
        } else {
          output = `Command not found: ${command}`;
        }
    }

    setHistory(prev => [...prev, { cmd: cmd, out: output }]);
    setCmd("");
  };

  return (
    <div 
      className="flex-1 flex flex-col h-full bg-[#0d1117] rounded-3xl border border-zinc-800 overflow-hidden font-mono shadow-2xl"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="p-3 bg-[#161b22] border-b border-zinc-800 flex items-center gap-2">
        <div className="flex gap-1.5 ml-1">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
          <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
        </div>
        <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest ml-4 flex items-center gap-2">
          <TerminalIcon className="h-3 w-3" /> hswlp-shell v1.0.4
        </span>
      </div>
      <div className="flex-1 p-6 text-zinc-300 space-y-1 text-sm overflow-y-auto cursor-text" ref={scrollRef}>
        {history.map((entry, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {entry.cmd && (
              <div className="flex gap-2">
                <span className="text-emerald-500 font-bold">➜</span>
                <span className="text-blue-400 font-bold">~</span>
                <span>{entry.cmd}</span>
              </div>
            )}
            {entry.out && <div className="text-zinc-400 pl-4 border-l-2 border-zinc-800 ml-1 mt-1 mb-3">{entry.out}</div>}
          </div>
        ))}
        <div className="flex gap-2 items-center">
          <span className="text-emerald-500 font-bold">➜</span>
          <span className="text-blue-400 font-bold">~</span>
          <input 
            ref={inputRef}
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && executeCmd()}
            className="bg-transparent border-none outline-none flex-1 text-zinc-100"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

// --- NAS Component ---
const NAS = () => {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const rootFolders = ['Documents', 'Photos', 'Backups', 'Shared', 'Projects', 'Downloads'];
  
  const folders = {
    'Documents': ['Resume.pdf', 'Budget.xlsx', 'Notes.txt'],
    'Photos': ['Vacation', 'Family', 'Work'],
    'Backups': ['System_Image_2024', 'Database_Dump'],
    'Shared': ['Team_Brief.docx', 'Logo_Assets'],
    'Projects': ['HSWLP', 'NextJS_Starter'],
    'Downloads': ['Installer.dmg', 'Archive.zip']
  };

  const currentItems = currentPath.length === 0 
    ? rootFolders 
    : (folders[currentPath[0] as keyof typeof folders] || []);

  const handleNavigate = (item: string) => {
    if (currentPath.length === 0) {
      setCurrentPath([item]);
    } else {
      // Simulate opening file
      alert(`Opening ${item}...`);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-6 h-full">
      <div className="flex items-center gap-2 px-4 py-3 bg-card/50 rounded-xl border border-muted-foreground/10">
        <Button variant="ghost" size="sm" onClick={() => setCurrentPath([])}>
          <Home className="h-4 w-4" />
        </Button>
        {currentPath.map((path) => (
          <div key={path} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{path}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 content-start overflow-y-auto">
        {currentItems.map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNavigate(item)}
            className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-card/30 border border-muted-foreground/10 hover:bg-primary/5 hover:border-primary/20 cursor-pointer transition-colors group"
          >
            {item.includes('.') ? (
              <FileText className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
            ) : (
              <Folder className="h-12 w-12 text-amber-500 group-hover:text-amber-400 transition-colors fill-current" />
            )}
            <span className="text-sm font-medium text-center truncate w-full">{item}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Builder Component ---
const Builder = () => {
  const [canvasItems, setCanvasItems] = useState<{id: string, type: string, x: number, y: number}[]>([]);
  
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("type", type);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    if (type) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 24; // Center offset
      const y = e.clientY - rect.top - 24;
      setCanvasItems([...canvasItems, { id: Date.now().toString(), type, x, y }]);
    }
  };

  return (
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
      <div className="flex-1 flex gap-6 overflow-hidden">
        <div className="w-64 bg-card/50 backdrop-blur-xl border border-muted-foreground/10 rounded-3xl p-6 overflow-y-auto">
          <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Components</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'box', icon: Box, label: 'Box' },
              { id: 'text', icon: Type, label: 'Text' },
              { id: 'button', icon: Square, label: 'Button' },
              { id: 'image', icon: ImageIcon, label: 'Image' }
            ].map((item) => (
              <div 
                key={item.id} 
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                className="aspect-square rounded-xl bg-muted border border-muted-foreground/10 flex flex-col items-center justify-center hover:border-primary/50 cursor-grab transition-all gap-2 group"
              >
                <item.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-medium text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div 
          className="flex-1 bg-white dark:bg-[#09090b] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] border-2 border-dashed border-muted-foreground/10 rounded-3xl relative overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {canvasItems.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4">
                <Plus className="h-8 w-8 text-primary opacity-20" />
              </div>
              <p className="text-muted-foreground italic text-sm">Drop components here to start building</p>
            </div>
          )}
          
          {canvasItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              drag
              dragMomentum={false}
              className="absolute cursor-move group"
              style={{ left: item.x, top: item.y }}
            >
              <div className="w-12 h-12 bg-card border border-muted-foreground/20 rounded-xl shadow-lg flex items-center justify-center group-hover:border-primary/50 transition-colors">
                {item.type === 'box' && <Box className="h-6 w-6 text-primary" />}
                {item.type === 'text' && <Type className="h-6 w-6 text-primary" />}
                {item.type === 'button' && <Square className="h-6 w-6 text-primary" />}
                {item.type === 'image' && <ImageIcon className="h-6 w-6 text-primary" />}
              </div>
              <div className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" variant="destructive" className="h-6 w-6 rounded-full" onClick={() => setCanvasItems(prev => prev.filter(i => i.id !== item.id))}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

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
             {/* Use dynamic icon mapping if possible, else fallback */}
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

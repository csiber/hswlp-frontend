"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function Talk() {
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
}

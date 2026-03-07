"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Box, Type, Image as ImageIcon, Trash2, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Builder() {
  const [canvasItems, setCanvasItems] = useState<{id: string, type: string, x: number, y: number}[]>([]);
  
  const handleDragStart = (e: React.DragEvent, type: string) => {
    e.dataTransfer.setData("type", type);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");
    if (type) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left - 24; 
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
}

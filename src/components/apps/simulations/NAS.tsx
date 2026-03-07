"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Folder, FileText, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NAS() {
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
    if (currentPath.length === 0 && !item.includes('.')) {
      setCurrentPath([item]);
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
}

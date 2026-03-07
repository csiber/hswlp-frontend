"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon } from "lucide-react";

export default function DevShell() {
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
}

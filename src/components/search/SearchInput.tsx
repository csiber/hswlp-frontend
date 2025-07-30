"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (v: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <Input
      ref={ref}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search apps, categories and tags"
      className="text-xl p-4 md:p-6"
    />
  );
}

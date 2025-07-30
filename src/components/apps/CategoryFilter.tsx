"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={val => onChange(val || "all")}
      className="flex gap-2"
    >
      <ToggleGroupItem value="all" className="capitalize">All</ToggleGroupItem>
      {categories.map(cat => (
        <ToggleGroupItem key={cat} value={cat} className="capitalize">
          {cat}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

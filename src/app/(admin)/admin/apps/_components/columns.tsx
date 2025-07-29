"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow, format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export type AdminApp = {
  id: string;
  name: string;
  slug: string;
  category: string | null;
  type: string;
  featured: number;
  createdAt: Date;
};

export const getColumns = (
  onEdit: (app: AdminApp) => void,
  onDelete: (app: AdminApp) => void
): ColumnDef<AdminApp>[] => [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "slug", header: "Slug" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "type", header: "Type" },
  {
    accessorKey: "featured",
    header: "Featured",
    cell: ({ row }) => row.getValue("featured") ? "Yes" : "No",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      const formatted = format(new Date(date), "PPpp");
      return (
        <span title={formatted}>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const app = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(app)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(app)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

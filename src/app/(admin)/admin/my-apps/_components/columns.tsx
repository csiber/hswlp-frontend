"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export type AdminUserApp = {
  id: string;
  userEmail: string | null;
  appName: string;
  status: string;
  notes: string | null;
};

export const getColumns = (
  onEdit: (app: AdminUserApp) => void,
  onDelete: (app: AdminUserApp) => void
): ColumnDef<AdminUserApp>[] => [
  { accessorKey: "userEmail", header: "User" },
  { accessorKey: "appName", header: "App" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "notes", header: "Notes" },
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

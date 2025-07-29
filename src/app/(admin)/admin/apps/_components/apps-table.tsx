"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { getColumns, AdminApp } from "./columns";
import { getAppsAction } from "../_actions/get-apps.action";
import { deleteAppAction } from "../_actions/delete-app.action";
import { useServerAction } from "zsa-react";
import { toast } from "sonner";
import { PAGE_SIZE_OPTIONS } from "../admin-constants";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AppForm } from "./form";

export function AppsTable() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [apps, setApps] = useState<AdminApp[]>([]);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editApp, setEditApp] = useState<AdminApp | null>(null);
  const { execute: removeApp } = useServerAction(deleteAppAction, {
    onError: () => toast.error("Failed to delete app"),
    onSuccess: () => fetchApps({ page, pageSize }),
  });

  const { execute: fetchApps, data, error, status } = useServerAction(getAppsAction, {
    onError: () => toast.error("Failed to fetch apps"),
  });

  useEffect(() => {
    fetchApps({ page, pageSize });
  }, [fetchApps, page, pageSize]);

  useEffect(() => {
    if (data) {
      setApps(data.apps);
      setTotal(data.totalCount);
    }
  }, [data]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1);
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Apps</h1>
        <Button onClick={() => { setEditApp(null); setShowForm(true); }}>+ Add App</Button>
      </div>
      {status === 'pending' ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading apps</div>
      ) : (
        <DataTable
          columns={getColumns((app) => { setEditApp(app); setShowForm(true); }, (app) => { if (confirm('Delete?')) removeApp({ id: app.id }); })}
          data={apps}
          pageCount={Math.ceil(total / pageSize)}
          pageIndex={page - 1}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={setPageSize}
          totalCount={total}
          itemNameSingular="app"
          itemNamePlural="apps"
          pageSizeOptions={PAGE_SIZE_OPTIONS}
        />
      )}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editApp ? "Edit App" : "Add App"}</DialogTitle>
          </DialogHeader>
          <AppForm app={editApp} onSuccess={() => { setShowForm(false); fetchApps({ page, pageSize }); }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

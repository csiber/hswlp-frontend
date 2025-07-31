import { Metadata } from "next";
import { BASE_METADATA } from "@/lib/base-metadata";
import DocsPage from "@/components/docs/DocsPage";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "Documentation",
};

export default function DocumentationPage() {
  return (
    <div className="p-6">
      <DocsPage />
    </div>
  );
}

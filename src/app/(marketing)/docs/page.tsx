import { Metadata } from "next";
import DocsPage from "@/components/docs/DocsPage";

export const metadata: Metadata = {
  title: "Documentation",
};

export default function DocumentationPage() {
  return (
    <div className="p-6">
      <DocsPage />
    </div>
  );
}

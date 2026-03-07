import { Metadata } from "next";
import { BASE_METADATA } from "@/lib/base-metadata";
import { MotionSection } from "@/components/ui/MotionSection";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "API Reference",
};

export default function ApiPage() {
  return (
    <MotionSection className="space-y-6 mx-auto max-w-3xl px-6 py-16 prose dark:prose-invert">
      <h1>API Reference</h1>
      <p>The HSWLP API is currently under migration to a more secure system. Please use the web interface for user management and authentication.</p>
      <div className="bg-amber-100 border-l-4 border-amber-500 p-4 dark:bg-amber-900/30 dark:border-amber-700">
        <p className="text-amber-800 dark:text-amber-200 m-0">
          <strong>Notice:</strong> Legacy API endpoints have been deprecated for security reasons. New API documentation will be available soon.
        </p>
      </div>
    </MotionSection>
  );
}

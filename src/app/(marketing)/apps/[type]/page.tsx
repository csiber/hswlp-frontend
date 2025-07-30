import { Metadata } from "next";
import AppsByTypePage from "@/components/apps/AppsByTypePage";

interface PageProps {
  params: { type: string };
}

export function generateStaticParams() {
  return [{ type: "shell" }, { type: "pages" }];
}

export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `${params.type} apps`,
  };
}

export default function TypePage({ params }: PageProps) {
  return <AppsByTypePage type={params.type} />;
}

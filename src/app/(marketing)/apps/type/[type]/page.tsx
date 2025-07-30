import { Metadata } from "next";
import AppsByTypePage from "@/components/apps/AppsByTypePage";

interface PageProps {
  params: Promise<{ type: string }>;
}

export function generateStaticParams() {
  return [{ type: "shell" }, { type: "pages" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  return {
    title: `${type} apps`,
  };
}

export default async function TypePage({ params }: PageProps) {
  const { type } = await params;
  return <AppsByTypePage type={type} />;
}

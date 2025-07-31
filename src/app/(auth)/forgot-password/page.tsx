import { Metadata } from "next";
import { BASE_METADATA } from "@/lib/base-metadata";
import ForgotPasswordClientComponent from "./forgot-password.client";

export const metadata: Metadata = {
  ...BASE_METADATA,
  title: "Elfelejtett jelszó",
  description: "Jelszó visszaállítása",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClientComponent />;
}

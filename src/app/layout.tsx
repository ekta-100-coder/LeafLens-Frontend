
import type { Metadata } from "next";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  title: "LeafLens AI — Grow with confidence",
  description:
    "Understand your plants, improve their health, and build better care routines with LeafLens AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

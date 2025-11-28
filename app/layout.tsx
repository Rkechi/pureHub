import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { AuthProvider } from "@/app/context/AuthContext";

export const metadata: Metadata = {
  title: "PureHive - Smart ESG-Compliant Cleaning Dashboard",
  description: "IoT-powered cleaning management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoulHub.net",
  description: "Experience AI Companionship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-pepsi-dark text-white">
          <Sidebar />
          {/* Main content area - giving left margin to account for fixed sidebar */}
          <main className="flex-1 pl-20 transition-all duration-300">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

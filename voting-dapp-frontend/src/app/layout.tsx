import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { headers } from "next/headers"; // added
import ContextProvider from "../../context"; // added
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Voting App",
  description: "Powered by Reown",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider cookies={cookies}>
            <div className="min-h-screen flex flex-col ">
            <Header />
            <main className="flex-grow">{children}</main>
            <footer className="bg-[#1a1f2c] text-sm text-white py-8">
              <div className="container mx-auto px-4 text-center">
              <p>
                © {new Date().getFullYear()} VotePulse. All rights reserved.
              </p>
              </div>
            </footer>
            </div>
        </ContextProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}

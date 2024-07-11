import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
import { Toaster } from "react-hot-toast";
import { AppbarClient } from "../components/AppbarClient";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wallet Merchant",
  description: "Simple wallet app for merchants",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={inter.className}>
          <Toaster/>
          <AppbarClient />
          {children}
        </body>
      </Providers>
    </html>
  );
}

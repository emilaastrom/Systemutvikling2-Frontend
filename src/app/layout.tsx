import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CustomHeader from "./components/Header";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpareSti",
  description: "Din personlige spareveileder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <body>
          <CustomHeader />
          <div className=" bg-gradient-to-b from-[#d9f7ca] to-[#c9fcb0] dark:bg-slate-700">
            <Navbar />
            <div> {children}</div>
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}

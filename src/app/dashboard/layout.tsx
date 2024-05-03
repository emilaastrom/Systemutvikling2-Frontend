import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navigation/Navbar";
import CustomHeader from "../components/navigation/Header";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoutes from "../components/ProtectedRoutes";

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
          <ProtectedRoutes>
            <CustomHeader />
            <div className=" bg-gradient-to-b from-background-100 to-background-200 dark:bg-slate-700">
              <Navbar />
              <div> {children}</div>
            </div>
          </ProtectedRoutes>
        </body>
      </html>
    </AuthProvider>
  );
}

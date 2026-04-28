import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import SplashLoader from "@/components/SplashLoader";
import Chatbot from "@/components/Chatbot";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PACEFEST 2026 | LIMITLESS ENERGY",
  description: "The biggest technical festival of the decade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col font-inter bg-background selection:bg-primary selection:text-white">
        <AuthProvider>
          <SplashLoader />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Chatbot />
        </AuthProvider>
      </body>
    </html>
  );
}


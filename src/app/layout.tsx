import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import ToasterProvider from "@/app/components/ToasterProvider";
import HeaderPage from "./components/Header";
import Footer from "./components/Footer";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাজার দর | আজকের বাজারের দাম",
  description:
    "নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও বাজারের তুলনা দেখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
         <ToasterProvider />
        <Suspense>
        <HeaderPage />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
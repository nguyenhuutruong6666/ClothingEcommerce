import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { Toaster } from "sonner";
import ScrollToTopAndContactButton from "@/components/common/ScrollToTop";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEXCLO - Thời Trang Nam Cao Cấp",
  description: "TEXCLO - Thương hiệu thời trang nam cao cấp, phong cách và hiện đại.",
  icons: {
    icon: "/images/logo/logo_new.png",
    shortcut: "/images/logo/logo_new.png",
    apple: "/images/logo/logo_new.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReactQueryProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 overflow-x-hidden w-full">{children}</main>
            <Footer />
          </div>
          <ScrollToTopAndContactButton />
          <Toaster richColors={true} />
        </ReactQueryProvider>
      </body>
    </html>
  );
}

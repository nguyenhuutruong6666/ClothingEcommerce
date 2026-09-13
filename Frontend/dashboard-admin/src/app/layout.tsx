import { Metadata } from "next";
import TanstackQueryProvider from "@/lib/tanstack-query-provider";

import "@/app/globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// pages have to be rendered dynamically because supabase server component client uses cookies
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: {
    template: "%s - TEXCLO Admin Dashboard",
    default: "TEXCLO Admin Dashboard",
  },
  icons: {
    icon: "/images/logo_new.png",
    shortcut: "/images/logo_new.png",
    apple: "/images/logo_new.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TanstackQueryProvider >
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors={true} />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}

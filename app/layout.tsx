import "@/app/globals.css";
import { Nav } from "@/components/ui/nav";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import { Inter as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "h-screen w-screen overflow-hidden font-sans antialiased",
          fontSans.className,
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex h-full w-full flex-col overflow-hidden text-foreground">
            <Nav />
            <section className="overflow-x flex flex-1 flex-col overflow-y-auto">
              {children}
            </section>
          </main>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

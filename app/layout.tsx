import type { Metadata } from "next";

import "./globals.css";
import { Exo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import VideoBackground from "@/components/VideoBackground";

const exo = Exo({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Yanis Idir",
  description: "CV de Yanis Idir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo.className} antialiased  overflow-visible`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {" "}
          <VideoBackground>{children}</VideoBackground>
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}

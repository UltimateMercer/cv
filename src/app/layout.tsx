import type { Metadata } from "next";
import { Geist, Geist_Mono, Barlow } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-providers";

import Navbar from "@/components/navbar";
import { IntlProvider } from "@/components/intl-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const barlow = Barlow({
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
  weight: ["200", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CV - Ultimate Mercer",
  creator: "Julian Silva da Cunha",
  metadataBase: new URL("https://ultimatemercer.com"),
  openGraph: {
    title: "Ultimate Mercer",
    description: "Curriculum",
    images: "/ultimate-mercer-base.jpg",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultimate Mercer",
    description: "Curriculum",
    creator: "@nextjs",
    images: ["https://ultimatemercer/ultimate-mercer-base.jpg"], // Must be an absolute URL
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${barlow.variable} ${geistSans.variable} ${geistMono.variable} font-sans min-h-screen antialiased`}
      >
        <IntlProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </IntlProvider>
      </body>
    </html>
  );
}

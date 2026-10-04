import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import ClientLayout from "./ClientLayout";

// config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mariano Frias",
  description: "Front End Engineer with a strong foundation in system design and a background in graphic design. Building scalable, user-centered interfaces using React and Next.js.",
  metadataBase: new URL('https://marianofrias.com'),
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Mariano Frias",
    description: "Front End Engineer building scalable, user-centered interfaces with React and Next.js.",
    url: "https://marianofrias.com",
    siteName: "Mariano Frias Portfolio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Mariano Frias Portfolio",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariano Frias",
    description: "Front End Engineer building scalable, user-centered interfaces with React and Next.js.",
    images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

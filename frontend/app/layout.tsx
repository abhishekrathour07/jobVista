import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"
import AuthGuard from "@/components/custom/AuthGuard/AuthGuard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JobVista",
  icons: "/image.png",
  description: "apply for job | get Your job now | apply for job | job dekho | find career path",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthGuard>
          {children}
        </AuthGuard>
        <Toaster
          position="bottom-right"
          reverseOrder={true}
          toastOptions={{
            duration: 3000,
            style: {
              fontSize: "1rem", // Increase text size
              padding: "16px 24px", // Increase padding
              borderRadius: "10px",
              background: "#ffffff",
              color: "#111827",
              boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
              animation: "slideIn 0.3s ease-out",
            },
            success: {
              iconTheme: {
                primary: "#4F46E5",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}

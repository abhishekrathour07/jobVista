import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"

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
  icons:"/image.png",
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
        {children}
        <Toaster
          position="bottom-right"
          reverseOrder={true}
          toastOptions={{ 
            
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

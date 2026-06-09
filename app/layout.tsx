import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "V-IT | Cộng đồng IT Việt Nam",
    template: "%s | V-IT",
  },
  description:
    "Nền tảng cộng đồng IT Việt Nam — nơi chia sẻ kiến thức, kết nối chuyên gia và cùng nhau phát triển. Mọi lợi nhuận dành cho từ thiện.",
  keywords: ["IT Vietnam", "lập trình", "cộng đồng IT", "bài viết kỹ thuật", "sự kiện IT"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "V-IT Community",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased">{children}</body>
    </html>
  );
}

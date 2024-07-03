import './globals.css'
import { Amiri, Tajawal } from "next/font/google";
const amiri = Tajawal({ weight: ["400", "700"], subsets: ["arabic"] });

export const metadata = {
  title: 'التقويم الهجري ١٤٤٤ - دائرة الشؤون الإسلامية بالشارقة',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={amiri.className}>{children}</body>
    </html>
  )
}

import './globals.css'


export const metadata = {
  title: 'التقويم الهجري ١٤٤٤ - دائرة الشؤون الإسلامية بالشارقة',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  )
}

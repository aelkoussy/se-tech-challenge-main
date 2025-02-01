import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "get your guide demo",
  description: "get your guide demo",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

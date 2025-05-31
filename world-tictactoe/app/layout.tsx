/* Wrap the entire app with MiniKitProvider */
import { Inter } from 'next/font/google'
import { MiniKitProvider } from '@worldcoin/minikit-react/minikit-provider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <MiniKitProvider>
        <body className={inter.className}>{children}</body>
      </MiniKitProvider>
    </html>
  )
}
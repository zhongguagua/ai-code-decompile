import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PC代码反编译工具 - 智能前端代码分析平台",
  description:
    "专业的前端代码反编译和分析工具，支持JavaScript、TypeScript、React、Vue等多种框架，提供智能代码解析和优化建议。",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
          {children}
          <Toaster />
      </body>
    </html>
  )
}

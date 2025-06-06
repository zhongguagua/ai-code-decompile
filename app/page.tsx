import CodeEditor from "@/components/code-editor"
import ParticleBackground from "@/components/particle-background"
import type { Metadata } from "next"
import WeChatModal from "@/components/wechat-modal"
import HeroSection from "@/components/hero-section"
import FeatureShowcase from "@/components/feature-showcase"
import DemoSection from "@/components/demo-section"

export const metadata: Metadata = {
  title: "代码反编译 | 高级前端工具",
  description: "一个炫酷的前端代码片段反编译工具，通过AI智能分析压缩混淆后的JS代码",
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden">
      <ParticleBackground />

      <header className="relative z-10 border-b border-zinc-800 py-6 px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <span className="text-xl font-bold">&lt;/&gt;</span>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              代码反编译器
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 text-xs rounded-full bg-zinc-800 text-zinc-400">BETA</span>
            <span className="text-zinc-400 text-sm hidden lg:block">高级前端工具</span>
            <WeChatModal />
          </div>
        </div>
      </header>

      <div className="flex-1 relative z-10">
        <HeroSection />
        <FeatureShowcase />
        <DemoSection />
        <div className="container mx-auto p-6">
          <CodeEditor />
        </div>
      </div>

      <footer className="relative z-10 border-t border-zinc-800 py-4 px-6 text-center text-sm text-zinc-500">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} 高级前端代码反编译工具 | 探索代码的奥秘</p>
        </div>
      </footer>
    </main>
  )
}

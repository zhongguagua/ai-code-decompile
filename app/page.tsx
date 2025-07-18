import CodeEditor from "@/components/code-editor"
import ParticleBackground from "@/components/particle-background"
import type { Metadata } from "next"
import WeChatModal from "@/components/wechat-modal"
import HeroSection from "@/components/hero-section"
import FeatureShowcase from "@/components/feature-showcase"
import DemoSection from "@/components/demo-section"
import Script from "next/script" 

export const metadata: Metadata = {
  title: "代码反编译 | 高级前端工具",
  description: "一个炫酷的前端代码片段反编译工具，通过AI智能分析压缩混淆后的JS代码",
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-black text-white relative overflow-hidden">
      <Script
        id="baidu-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
           var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?70827dd648a25125eccd3f4b43515f8b";
              var s = document.getElementsByTagName("script")[0];
              s.parentNode.insertBefore(hm, s);
            })();
          `,
        }}
      />

      {/* Microsoft Clarity 分析脚本 */}
      <Script
        id="clarity-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "sgom5itxo0");
          `,
        }}
      />

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

      <footer className="relative z-10 border-t border-zinc-800 py-4 px-6 text-center text-sm text-zinc-500 pb-12">
        <div className="container mx-auto">
          <div className="mt-2 text-xs text-zinc-400 mb-2">
            <p>免责声明：本工具仅限合法学习研究，禁止用于商业代码反编译，使用者须确保代码合法性并承担全部责任</p>
          </div>
          <p>© {new Date().getFullYear()} 高级前端代码反编译工具 | 从机器语言到人类智慧</p>
        </div>
      </footer>
    </main>
  )
}

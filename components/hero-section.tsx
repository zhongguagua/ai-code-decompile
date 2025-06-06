"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const scrollToEditor = () => {
    const editorElement = document.querySelector("#code-editor")
    if (editorElement) {
      editorElement.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-700/30 text-purple-400 text-sm">
            <Sparkles className="h-4 w-4" />
            <span>AI驱动的代码反编译技术</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-purple-400">
              智能解析
            </span>{" "}
            混淆代码，
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400">
              完美还原
            </span>{" "}
            代码结构
          </h1>

          <p className="text-lg text-zinc-300 max-w-xl">
            通过先进的AI技术，我们能够智能分析压缩混淆后的JavaScript代码，不仅完美还原原始结构，还能生成完整的TypeScript类型定义，让代码更清晰、更易读。
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={scrollToEditor}
              className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 py-6 px-8 text-lg"
            >
              立即体验
              <ArrowRight className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-2 text-zinc-400">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500/20 to-green-700/20 border border-green-500/30 flex items-center justify-center">
                <Zap className="h-5 w-5 text-green-400" />
              </div>
              <span className="font-medium">完全免费使用</span>
            </div>
          </div>

          <div className="pt-4 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-600 flex items-center justify-center text-xs font-medium"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm text-zinc-400">
              <span className="text-white font-medium">10,000+</span> 开发者正在使用
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-3xl"></div>
          <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-zinc-800/50 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-zinc-400">代码转换示例</div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-zinc-700/50">
              <div className="p-4 font-mono text-xs text-zinc-400 overflow-hidden">
                <div className="text-zinc-500">// 混淆后的代码</div>
                <pre className="mt-2">
                  {`function a(b,c){return d(b-371,c)}function d(a,b){var c=e();return d=function(f,g){f=f-125;var h=c[f];return h},d(a,b)}var e=function(){var f=["shift","1780730MHUkXj","2911410RJxLsf","push","1642FxhJRJ","4uQbILO","length","2114965nzBvJF","8723208ibdPnP","splice","slice","7198824QUFSxS","9qXSdRG","1337643UWRnXL","unshift","3132900AcxLsm"];return e=function(){return f},e()}(function(b,c){var f=a,g=b();while(!![]){try{var h=-parseInt(f(384))/1+parseInt(f(382))/2*(parseInt(f(376))/3)+parseInt(f(383))/4+-parseInt(f(377))/5+parseInt(f(380))/6+parseInt(f(379))/7*(-parseInt(f(378))/8)+parseInt(f(381))/9;if(h===c)break;else g[f(385)](g[f(382)]())}catch(i){g[f(385)](g[f(382)]())}}}(e,983952));`}
                </pre>
              </div>
              <div className="p-4 font-mono text-xs text-emerald-300 overflow-hidden">
                <div className="text-zinc-500">// 反编译后的代码</div>
                <pre className="mt-2">
                  {`/**
 * 数组操作工具函数
 * @param array 要操作的数组
 * @param index 操作的索引
 * @returns 处理后的数组
 */
function arrayManipulator<T>(
  array: T[],
  index: number
): T[] {
  // 检查数组长度
  if (array.length === 0) {
    return array;
  }
  
  // 执行数组操作
  if (index > 0) {
    array.push(array.shift()!);
  } else {
    array.unshift(array.pop()!);
  }
  
  return array.slice(0);
}`}
                </pre>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </div>
  )
}

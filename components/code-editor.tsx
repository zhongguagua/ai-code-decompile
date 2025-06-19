"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Play, Copy, Check, Code2, Eye, Brain, Sparkles, ChevronDown, Network } from "lucide-react"
import { motion } from "framer-motion"
import CodeVisualizer from "@/components/code-visualizer"
import Editor from "@monaco-editor/react"
import { useAIStream } from "../api/index"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { DEMO_CODES } from "../lib/code"

export default function CodeEditor() {
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("editor")
  const [codeStructure, setCodeStructure] = useState(null)
  const [language, setLanguage] = useState("javascript")
  const [showThinkingDialog, setShowThinkingDialog] = useState(false)
  const [hasReceivedFirstOutput, setHasReceivedFirstOutput] = useState(false)
  const [isRunningDemo, setIsRunningDemo] = useState(false)

  const { streamCompletion } = useAIStream()
  const { toast } = useToast()

  const MAX_CHARACTERS = 5000

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || ""
    if (newCode.length <= MAX_CHARACTERS) {
      setCode(newCode)
      // 自动检测语言类型
      detectLanguage(newCode)
    }
  }

  const detectLanguage = (code: string) => {
    if (code.includes("function") || code.includes("const") || code.includes("let") || code.includes("=>")) {
      setLanguage("javascript")
    } else if (code.includes("<!DOCTYPE") || code.includes("<html") || (code.includes("<") && code.includes(">"))) {
      setLanguage("html")
    } else if (code.includes("{") && code.includes("}") && (code.includes(":") || code.includes("."))) {
      setLanguage("css")
    } else if (code.includes("import") || code.includes("interface") || code.includes("type")) {
      setLanguage("typescript")
    } else {
      setLanguage("javascript")
    }
  }

  const handleDecompile = async () => {
    if (!code.trim()) return

    setIsProcessing(true)
    setShowThinkingDialog(true)
    setHasReceivedFirstOutput(false)
    setOutput("")

    streamCompletion({
      content: code,
      onMessage: (content) => {
        // 收到第一次输出时关闭思考弹框
        if (!hasReceivedFirstOutput) {
          setShowThinkingDialog(false)
          // 自动切换到输出标签页
          setActiveTab("output")
          // 显示成功开始处理的提示
          toast({
            title: "🚀 反编译开始",
            description: "AI 正在分析您的代码，请稍候...",
            duration: 3000,
          })
        }
        setHasReceivedFirstOutput(true)
        setOutput((prev) => prev + content)
      },
      onComplete: () => {
        console.log("Stream completed")
        setIsProcessing(false)
        setShowThinkingDialog(false)
        setIsRunningDemo(false)
        // 显示完成提示
        toast({
          title: "✅ 反编译完成",
          description: "代码分析已完成，您可以查看结果并复制使用。",
          duration: 4000,
        })
      },
      onError: (err) => {
        console.error("反编译失败:", err)

        setOutput("反编译过程中发生错误，请稍后重试")
        setIsProcessing(false)
        setShowThinkingDialog(false)
        setIsRunningDemo(false)

        // 显示错误提示
        toast({
          variant: "destructive",
          title: "❌ 反编译失败",
          description: "处理过程中遇到问题，请检查代码格式或稍后重试。如果问题持续存在，请联系技术支持。",
          duration: 6000,
        })
      },
    })
  }

  const fakeHandleDecompile = (demoKey: string) => {
    setIsProcessing(true)
    setShowThinkingDialog(true)
    setHasReceivedFirstOutput(false)
    setOutput("")

    setTimeout(() => {
      setActiveTab("output")
      setShowThinkingDialog(false)
      const demo = (DEMO_CODES as any)[demoKey]

      // 显示演示开始提示
      toast({
        title: "🎯 演示开始",
        description: `正在展示 ${demo.title} 的反编译效果...`,
        duration: 3000,
      })

      let i = 0
      const typeInterval = setInterval(() => {
        if (i < demo.code2.length) {
          setOutput(demo.code2.slice(0, i + 1))
          i++
        } else {
          clearInterval(typeInterval)
          setIsProcessing(false)
          setIsRunningDemo(false)
          // 显示演示完成提示
          toast({
            title: "🎉 演示完成",
            description: "您可以尝试输入自己的代码进行反编译！",
            duration: 4000,
          })
        }
      }, 10) // 调整打字速度
    }, 2000)
  }

  const handleDemoClick = async (demoKey: string) => {
    const demo = (DEMO_CODES as any)[demoKey]
    if (!demo) return

    setIsRunningDemo(true)

    // 先清空输出
    setOutput("")
    setActiveTab("editor")

    // 显示演示准备提示
    toast({
      title: "🚀 准备演示",
      description: `正在加载 ${demo.title} 示例代码...`,
      duration: 2000,
    })

    // 模拟打字效果填入代码
    setCode("")
    setLanguage(demo.language)

    let i = 0
    const typeInterval = setInterval(() => {
      if (i < demo.code.length) {
        setCode(demo.code.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
        // 代码填入完成后，等待1秒再自动执行反编译
        setTimeout(() => {
          fakeHandleDecompile(demoKey)
        }, 300)
      }
    }, 10) // 调整打字速度
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)

    // 显示复制成功提示
    toast({
      title: "📋 复制成功",
      description: "反编译结果已复制到剪贴板！",
      duration: 2000,
    })
  }

  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: "on" as const,
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: "on" as const,
    theme: "vs-dark",
    padding: { top: 16, bottom: 16 },
  }

  return (
    <>
      <motion.div
        id="code-editor"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="h-full flex flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              代码反编译控制台
            </h2>
            <div className="flex items-center gap-3">
              {/* Demo 示范按钮 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isProcessing}
                    className="gap-2 border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                  >
                    <Sparkles className="h-4 w-4" />
                    {isRunningDemo ? "演示中..." : "试试示范"}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {Object.entries(DEMO_CODES).map(([key, demo]) => (
                    <DropdownMenuItem
                      key={key}
                      onClick={() => handleDemoClick(key)}
                      disabled={isProcessing}
                      className="flex flex-col items-start gap-1 p-3"
                    >
                      <div className="font-medium">{demo.title}</div>
                      <div className="text-xs text-zinc-500 capitalize">{demo.language} 示例</div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={handleDecompile}
                disabled={isProcessing || !code.trim()}
                className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    处理中...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    反编译
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="text-sm text-zinc-400">
            粘贴您的前端代码片段，然后点击"反编译"按钮解析代码结构
            <span className="ml-2 text-purple-400">💡 点击"试试示范"查看工具效果</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <Button
                variant={activeTab === "editor" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("editor")}
                className="gap-2"
              >
                <Code2 className="h-4 w-4" />
                编辑器
                {isRunningDemo && activeTab === "editor" && (
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                )}
              </Button>
              <Button
                variant={activeTab === "output" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("output")}
                className="gap-2"
              >
                <Eye className="h-4 w-4" />
                输出
                {isProcessing && !hasReceivedFirstOutput && (
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                )}
                {output && !isProcessing && <div className="w-2 h-2 bg-green-400 rounded-full"></div>}
              </Button>
              <Button
                variant={activeTab === "visualizer" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("visualizer")}
                className="gap-2"
              >
                <Network className="h-4 w-4" />
                结构图
              </Button>
            </div>
          </div>

          {activeTab === "editor" && (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium">输入代码</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-600/20 text-purple-300">
                    {language.toUpperCase()}
                  </span>
                  {isRunningDemo && (
                    <span className="px-2 py-1 text-xs rounded-full bg-orange-600/20 text-orange-300 animate-pulse">
                      演示中
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <span className={`${code.length > MAX_CHARACTERS * 0.9 ? "text-yellow-400" : "text-zinc-500"}`}>
                    {code.length}/{MAX_CHARACTERS} 字符
                  </span>
                  {code.length >= MAX_CHARACTERS && <span className="text-red-400 font-medium">已达到字符限制</span>}
                </div>
              </div>

              <div className="flex-1 relative rounded-lg overflow-hidden border border-zinc-800 group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 pointer-events-none"></div>

                <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-800/50 flex items-center px-4 z-10">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-xs text-zinc-400">
                    {language === "javascript" && "JavaScript"}
                    {language === "typescript" && "TypeScript"}
                    {language === "html" && "HTML"}
                    {language === "css" && "CSS"}
                  </div>
                  {(isProcessing || isRunningDemo) && (
                    <div className="ml-auto flex items-center gap-2 text-xs text-orange-400">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>{isRunningDemo ? "演示中..." : "处理中..."}</span>
                    </div>
                  )}
                </div>

                <div className="h-full pt-8">
                  <Editor
                    height="400px"
                    language={language}
                    value={code}
                    onChange={handleCodeChange}
                    theme="vs-dark"
                    options={{
                      ...editorOptions,
                      // 确保编辑器在处理过程中仍然可以编辑
                      readOnly: false,
                    }}
                    loading={
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
                      </div>
                    }
                  />
                </div>

                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity border border-purple-500/30 rounded-lg"></div>
              </div>
            </div>
          )}

          {activeTab === "output" && (
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium">反编译结果</span>
                  {output && !isProcessing && (
                    <span className="px-2 py-1 text-xs rounded-full bg-emerald-600/20 text-emerald-300">已完成</span>
                  )}
                  {isProcessing && hasReceivedFirstOutput && (
                    <span className="px-2 py-1 text-xs rounded-full bg-orange-600/20 text-orange-300">生成中...</span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={!output}
                  className="h-8 text-xs gap-1 text-zinc-400 hover:text-white"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                  {copied ? "已复制" : "复制"}
                </Button>
              </div>

              <div className="flex-1 relative rounded-lg overflow-hidden border border-zinc-800">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 pointer-events-none"></div>

                <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-800/50 flex items-center px-4 z-10">
                  <span className="text-xs text-zinc-500">输出结果</span>
                  {output && !isProcessing && (
                    <div className="ml-auto flex items-center gap-2 text-xs text-emerald-400">
                      <Check className="h-3 w-3" />
                      <span>反编译完成</span>
                    </div>
                  )}
                  {isProcessing && hasReceivedFirstOutput && (
                    <div className="ml-auto flex items-center gap-2 text-xs text-orange-400">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>正在生成...</span>
                    </div>
                  )}
                </div>

                <div className="h-full pt-8">
                  {output ? (
                    <Editor
                      height="400px"
                      language={language}
                      value={output}
                      theme="vs-dark"
                      options={{
                        ...editorOptions,
                        readOnly: true,
                        domReadOnly: true,
                        contextmenu: false,
                      }}
                      loading={
                        <div className="flex items-center justify-center h-full">
                          <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                        </div>
                      }
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-zinc-600">
                      <div className="text-center">
                        <div className="mb-2 opacity-50">
                          <Code2 className="h-10 w-10 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">反编译结果将显示在这里</h3>
                        <p className="text-sm text-zinc-500">输入代码并点击反编译按钮开始处理</p>
                        <p className="text-xs text-purple-400 mt-2">💡 试试点击"试试示范"查看效果</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "visualizer" && (
            <div className="flex-1">
              <CodeVisualizer structure={codeStructure} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { lang: "JavaScript", desc: "完整支持ES6+语法解析与转换", color: "from-yellow-600 to-yellow-800" },
            { lang: "TypeScript", desc: "精准类型推导与类型定义生成", color: "from-blue-600 to-blue-800" },
            { lang: "React", desc: "支持函数组件与Hooks的完整转换", color: "from-orange-600 to-orange-800" },
            { lang: "Vue", desc: "全面兼容Vue 2/3语法转换", color: "from-pink-600 to-pink-800" },
          ].map((item) => (
            <motion.div
              key={item.lang}
              whileHover={{ y: -5 }}
              className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-purple-500/50 transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} mb-2 flex items-center justify-center`}
              >
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-sm font-medium mb-1">{item.lang}</h3>
              <p className="text-xs text-zinc-500">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI 思考弹框 */}
      <Dialog open={showThinkingDialog} onOpenChange={setShowThinkingDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="relative">
                <Brain className="h-6 w-6 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>
              </div>
              AI 大模型正在深度思考
            </DialogTitle>
            <div className="text-center py-4">
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">正在分析您的代码结构和语法特征...</p>
                <p className="text-xs text-zinc-500">这可能需要1-2分钟时间，请耐心等待</p>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

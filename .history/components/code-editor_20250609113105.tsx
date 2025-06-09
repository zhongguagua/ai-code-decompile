"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Play, Copy, Check, Code2, Eye } from "lucide-react"
import { motion } from "framer-motion"
import CodeVisualizer from "@/components/code-visualizer"
import Editor from "@monaco-editor/react"
import { useAIStream } from '../api/index';

export default function CodeEditor() {
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lineCount, setLineCount] = useState(1)
  const [activeTab, setActiveTab] = useState("editor")
  const [codeStructure, setCodeStructure] = useState(null)
  const [language, setLanguage] = useState("javascript")

  const { streamCompletion, isLoading, error, abort } = useAIStream();

  const MAX_CHARACTERS = 5000

  useEffect(() => {
    // Count lines for line numbers
    const lines = code.split("\n").length
    setLineCount(lines)
  }, [code])

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

    try {

      setOutput('');
      streamCompletion({
        content: input,
        onMessage: (content) => {
          setOutput(prev => prev + content);
        },
        onComplete: () => {
          console.log('Stream completed');
        },
        onError: (err) => {
          console.error('Error:', err);
        },
      });
    } catch (error) {
      console.error("反编译失败:", error)
      setOutput("反编译过程中发生错误")
      setIsProcessing(false)
    }
  }

  const generateDecompiledCode = (inputCode: string, lang: string) => {
    // 这里是模拟的反编译逻辑，实际项目中应该调用真实的反编译API
    const timestamp = new Date().toLocaleString()

    if (lang === "javascript" || lang === "typescript") {
      return `/**
 * 反编译结果 - ${timestamp}
 * 原始代码已被智能分析和优化
 */

// 检测到的代码类型: ${lang.toUpperCase()}
// 原始代码长度: ${inputCode.length} 字符
// 代码行数: ${inputCode.split("\n").length} 行

${
  inputCode.includes("function")
    ? `
/**
 * 函数定义已被优化和重构
 */`
    : ""
}

${
  inputCode.includes("const") || inputCode.includes("let") || inputCode.includes("var")
    ? `
/**
 * 变量声明已被标准化
 */`
    : ""
}

// 优化后的代码:
${inputCode}

/**
 * 代码质量分析:
 * - 可读性: 良好
 * - 性能: 已优化
 * - 类型安全: ${lang === "typescript" ? "完整" : "需要添加TypeScript类型"}
 * - 建议: ${lang === "javascript" ? "考虑迁移到TypeScript以获得更好的类型安全" : "代码结构良好"}
 */`
    } else if (lang === "html") {
      return `<!-- 
  反编译结果 - ${timestamp}
  HTML结构已被分析和优化
-->

<!-- 检测到的标签数量: ${(inputCode.match(/<\w+/g) || []).length} -->
<!-- 代码长度: ${inputCode.length} 字符 -->

${inputCode}

<!-- 
  HTML质量分析:
  - 语义化: 建议使用更多语义化标签
  - 可访问性: 建议添加alt属性和ARIA标签
  - SEO优化: 建议添加meta标签和结构化数据
-->`
    } else if (lang === "css") {
      return `/**
 * 反编译结果 - ${timestamp}
 * CSS样式已被分析和优化
 */

/* 检测到的选择器数量: ${(inputCode.match(/[^{}]+{/g) || []).length} */
/* 代码长度: ${inputCode.length} 字符 */

${inputCode}

/**
 * CSS质量分析:
 * - 性能: 建议优化选择器性能
 * - 兼容性: 建议添加浏览器前缀
 * - 维护性: 建议使用CSS变量和模块化
 * - 响应式: 建议添加媒体查询
 */`
    }

    return inputCode
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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

        <div className="text-sm text-zinc-400">粘贴您的前端代码片段，然后点击"反编译"按钮解析代码结构</div>
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
            </Button>
            <Button
              variant={activeTab === "output" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("output")}
              className="gap-2"
            >
              <Eye className="h-4 w-4" />
              输出
            </Button>
            <Button
              variant={activeTab === "visualizer" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab("visualizer")}
              className="gap-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
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
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-zinc-500">{lineCount} 行</span>
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
              </div>

              <div className="h-full pt-8">
                <Editor
                  height="400px"
                  language={language}
                  value={code}
                  onChange={handleCodeChange}
                  theme="vs-dark"
                  options={editorOptions}
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
                {output && (
                  <span className="px-2 py-1 text-xs rounded-full bg-emerald-600/20 text-emerald-300">已优化</span>
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
                {output && (
                  <div className="ml-auto flex items-center gap-2 text-xs text-emerald-400">
                    <Check className="h-3 w-3" />
                    <span>反编译完成</span>
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
          { lang: "JavaScript", desc: "支持ES6+语法解析", color: "from-yellow-600 to-yellow-800" },
          { lang: "TypeScript", desc: "完整类型定义生成", color: "from-blue-600 to-blue-800" },
          { lang: "HTML", desc: "语义化标签优化", color: "from-orange-600 to-orange-800" },
          { lang: "CSS", desc: "样式结构分析", color: "from-pink-600 to-pink-800" },
        ].map((item) => (
          <motion.div
            key={item.lang}
            whileHover={{ y: -5 }}
            className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-purple-500/50 transition-colors"
          >
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} mb-2 flex items-center justify-center`}>
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-sm font-medium mb-1">{item.lang}</h3>
            <p className="text-xs text-zinc-500">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

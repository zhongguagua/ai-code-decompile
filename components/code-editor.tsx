"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Play, Copy, Check, Code2, Eye } from "lucide-react"
import { motion } from "framer-motion"
import CodeVisualizer from "@/components/code-visualizer"

export default function CodeEditor() {
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lineCount, setLineCount] = useState(1)
  const [activeTab, setActiveTab] = useState("editor")
  const [codeStructure, setCodeStructure] = useState(null)

  const MAX_CHARACTERS = 5000

  useEffect(() => {
    // Count lines for line numbers
    const lines = code.split("\n").length
    setLineCount(lines)
  }, [code])

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    if (newCode.length <= MAX_CHARACTERS) {
      setCode(newCode)
    }
  }

  const handleDecompile = async () => {
    if (!code.trim()) return

    setIsProcessing(true)

    try {
      // 分析代码结构
      const structure = analyzeCodeStructure(code)
      setCodeStructure(structure)

      // Add a typing effect to the output
      setOutput("")
      const result = code // Replace with actual decompilation logic

      // Simulate processing with a typing effect
      let i = 0
      const typeInterval = setInterval(() => {
        if (i < result.length) {
          setOutput((prev) => prev + result.charAt(i))
          i++
        } else {
          clearInterval(typeInterval)
          setIsProcessing(false)
        }
      }, 5)
    } catch (error) {
      console.error("反编译失败:", error)
      setOutput("反编译过程中发生错误")
      setIsProcessing(false)
    }
  }

  const analyzeCodeStructure = (code: string) => {
    const structure = {
      nodes: [],
      edges: [],
      type: detectCodeType(code),
    }

    if (structure.type === "javascript") {
      return analyzeJavaScript(code)
    } else if (structure.type === "html") {
      return analyzeHTML(code)
    } else if (structure.type === "css") {
      return analyzeCSS(code)
    }

    return structure
  }

  const detectCodeType = (code: string) => {
    if (code.includes("function") || code.includes("const") || code.includes("let") || code.includes("=>")) {
      return "javascript"
    } else if (code.includes("<") && code.includes(">")) {
      return "html"
    } else if (code.includes("{") && code.includes("}") && (code.includes(":") || code.includes("."))) {
      return "css"
    }
    return "unknown"
  }

  const analyzeJavaScript = (code: string) => {
    const nodes = []
    const edges = []
    let nodeId = 0

    // 分析函数定义
    const functionRegex = /function\s+(\w+)\s*$$[^)]*$$|const\s+(\w+)\s*=\s*$$[^)]*$$\s*=>|(\w+)\s*:\s*function/g
    let match

    while ((match = functionRegex.exec(code)) !== null) {
      const funcName = match[1] || match[2] || match[3]
      nodes.push({
        id: `func-${nodeId}`,
        type: "function",
        position: { x: Math.random() * 400, y: Math.random() * 300 },
        data: { label: funcName, type: "Function" },
      })
      nodeId++
    }

    // 分析变量定义
    const varRegex = /(?:var|let|const)\s+(\w+)/g
    while ((match = varRegex.exec(code)) !== null) {
      nodes.push({
        id: `var-${nodeId}`,
        type: "variable",
        position: { x: Math.random() * 400, y: Math.random() * 300 },
        data: { label: match[1], type: "Variable" },
      })
      nodeId++
    }

    // 分析类定义
    const classRegex = /class\s+(\w+)/g
    while ((match = classRegex.exec(code)) !== null) {
      nodes.push({
        id: `class-${nodeId}`,
        type: "class",
        position: { x: Math.random() * 400, y: Math.random() * 300 },
        data: { label: match[1], type: "Class" },
      })
      nodeId++
    }

    return { nodes, edges, type: "javascript" }
  }

  const analyzeHTML = (code: string) => {
    const nodes = []
    const edges = []
    let nodeId = 0

    // 简单的HTML标签分析
    const tagRegex = /<(\w+)[^>]*>/g
    let match
    const tagCounts = {}

    while ((match = tagRegex.exec(code)) !== null) {
      const tagName = match[1].toLowerCase()
      tagCounts[tagName] = (tagCounts[tagName] || 0) + 1
    }

    Object.entries(tagCounts).forEach(([tag, count]) => {
      nodes.push({
        id: `tag-${nodeId}`,
        type: "html",
        position: { x: Math.random() * 400, y: Math.random() * 300 },
        data: { label: `<${tag}> (${count})`, type: "HTML Tag" },
      })
      nodeId++
    })

    return { nodes, edges, type: "html" }
  }

  const analyzeCSS = (code: string) => {
    const nodes = []
    const edges = []
    let nodeId = 0

    // 分析CSS选择器
    const selectorRegex = /([.#]?[\w-]+(?:\s*[>+~]\s*[\w-]+)*)\s*{/g
    let match

    while ((match = selectorRegex.exec(code)) !== null) {
      const selector = match[1].trim()
      nodes.push({
        id: `selector-${nodeId}`,
        type: "css",
        position: { x: Math.random() * 400, y: Math.random() * 300 },
        data: { label: selector, type: "CSS Selector" },
      })
      nodeId++
    }

    return { nodes, edges, type: "css" }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
              <div className="absolute inset-0 bg-zinc-900/90"></div>

              <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-800/50 flex items-center px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>

              <div className="h-full pt-8 flex">
                <div className="hidden md:block py-4 px-2 text-right bg-zinc-900/50 text-zinc-600 select-none">
                  {Array.from({ length: lineCount }).map((_, i) => (
                    <div key={i} className="text-xs">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <textarea
                  value={code}
                  onChange={handleCodeChange}
                  className="flex-1 p-4 font-mono text-sm bg-transparent text-zinc-300 resize-none focus:outline-none placeholder:text-zinc-600 leading-relaxed"
                  placeholder="在此处粘贴您的前端代码片段..."
                  spellCheck="false"
                  style={{
                    minHeight: "300px",
                    height: `${Math.max(300, (code.split("\n").length + 1) * 20)}px`,
                    maxHeight: "600px",
                  }}
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
              <div className="absolute inset-0 bg-zinc-900/90"></div>

              <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-800/50 flex items-center px-4">
                <span className="text-xs text-zinc-500">输出结果</span>
              </div>

              <div className="h-full pt-8 p-4 overflow-auto">
                {output ? (
                  <pre className="font-mono text-sm text-zinc-300 whitespace-pre-wrap">{output}</pre>
                ) : (
                  <div className="h-full flex items-center justify-center text-zinc-600">
                    <div className="text-center">
                      <div className="mb-2 opacity-50">
                        <Code2 className="h-10 w-10 mx-auto" />
                      </div>
                      反编译结果将显示在这里
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["HTML", "CSS", "JavaScript"].map((lang) => (
          <motion.div
            key={lang}
            whileHover={{ y: -5 }}
            className="p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-purple-500/50 transition-colors"
          >
            <h3 className="text-sm font-medium mb-1">{lang} 解析</h3>
            <p className="text-xs text-zinc-500">支持{lang}代码的高级解析和反编译</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, Play, Copy, Check, Code2, Eye, Brain, Sparkles, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import CodeVisualizer from "@/components/code-visualizer"
import Editor from "@monaco-editor/react"
import { useAIStream } from "../api/index"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// 示例代码库
const DEMO_CODES = {
  react: {
    title: "React 函数组件",
    language: "javascript",
    code: `import React, { useState, useEffect } from 'react';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (loading) return <div className="spinner">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="user-profile">
      <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="avatar" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <div className="stats">
        <span>Posts: {user.postsCount}</span>
        <span>Followers: {user.followersCount}</span>
      </div>
    </div>
  );
};

export default UserProfile;`,
  },
  typescript: {
    title: "TypeScript 接口定义",
    language: "typescript",
    code: `interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  profile: UserProfile;
}

interface UserProfile {
  bio: string;
  location: string;
  website?: string;
  socialLinks: SocialLinks;
}

interface SocialLinks {
  twitter?: string;
  github?: string;
  linkedin?: string;
}

class UserService {
  private apiUrl: string;

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  async getUser(id: number): Promise<User> {
    const response = await fetch(\`\${this.apiUrl}/users/\${id}\`);
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    return response.json();
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const response = await fetch(\`\${this.apiUrl}/users/\${id}\`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return response.json();
  }

  async deleteUser(id: number): Promise<void> {
    await fetch(\`\${this.apiUrl}/users/\${id}\`, {
      method: 'DELETE',
    });
  }
}`,
  },
  vue: {
    title: "Vue 3 组合式API",
    language: "javascript",
    code: `<template>
  <div class="todo-app">
    <h1>Todo List</h1>
    <form @submit.prevent="addTodo" class="add-todo-form">
      <input
        v-model="newTodo"
        type="text"
        placeholder="Add a new todo..."
        required
      />
      <button type="submit" :disabled="!newTodo.trim()">Add</button>
    </form>
    
    <div class="filters">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="currentFilter = filter"
        :class="{ active: currentFilter === filter }"
      >
        {{ filter }}
      </button>
    </div>

    <ul class="todo-list">
      <li
        v-for="todo in filteredTodos"
        :key="todo.id"
        :class="{ completed: todo.completed }"
      >
        <input
          type="checkbox"
          v-model="todo.completed"
          @change="updateTodo(todo)"
        />
        <span class="todo-text">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)" class="delete-btn">×</button>
      </li>
    </ul>

    <div class="stats">
      <span>Total: {{ todos.length }}</span>
      <span>Completed: {{ completedCount }}</span>
      <span>Remaining: {{ remainingCount }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const todos = ref([])
const newTodo = ref('')
const currentFilter = ref('All')
const filters = ['All', 'Active', 'Completed']

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false,
      createdAt: new Date()
    })
    newTodo.value = ''
  }
}

const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

const updateTodo = (updatedTodo) => {
  const index = todos.value.findIndex(todo => todo.id === updatedTodo.id)
  if (index !== -1) {
    todos.value[index] = updatedTodo
  }
}

const filteredTodos = computed(() => {
  switch (currentFilter.value) {
    case 'Active':
      return todos.value.filter(todo => !todo.completed)
    case 'Completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})

const completedCount = computed(() => 
  todos.value.filter(todo => todo.completed).length
)

const remainingCount = computed(() => 
  todos.value.filter(todo => !todo.completed).length
)

onMounted(() => {
  // Load todos from localStorage
  const savedTodos = localStorage.getItem('todos')
  if (savedTodos) {
    todos.value = JSON.parse(savedTodos)
  }
})
</script>`,
  },
  html: {
    title: "现代 HTML5 页面",
    language: "html",
    code: `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="现代响应式网页设计示例">
    <title>现代网页设计 - 响应式布局</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <nav class="navbar">
            <div class="nav-brand">
                <img src="/logo.svg" alt="Logo" class="logo">
                <span class="brand-name">ModernWeb</span>
            </div>
            <ul class="nav-menu">
                <li><a href="#home" class="nav-link">首页</a></li>
                <li><a href="#about" class="nav-link">关于</a></li>
                <li><a href="#services" class="nav-link">服务</a></li>
                <li><a href="#contact" class="nav-link">联系</a></li>
            </ul>
            <button class="mobile-menu-toggle" aria-label="切换菜单">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>

    <main class="main-content">
        <section id="home" class="hero-section">
            <div class="container">
                <div class="hero-content">
                    <h1 class="hero-title">构建现代化的网页体验</h1>
                    <p class="hero-description">
                        使用最新的Web技术和设计理念，为用户提供卓越的数字体验
                    </p>
                    <div class="hero-actions">
                        <button class="btn btn-primary">开始体验</button>
                        <button class="btn btn-secondary">了解更多</button>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="/hero-image.jpg" alt="现代网页设计" loading="lazy">
                </div>
            </div>
        </section>

        <section id="features" class="features-section">
            <div class="container">
                <h2 class="section-title">核心特性</h2>
                <div class="features-grid">
                    <article class="feature-card">
                        <div class="feature-icon">🚀</div>
                        <h3>高性能</h3>
                        <p>优化的代码结构和资源加载，确保快速的页面响应</p>
                    </article>
                    <article class="feature-card">
                        <div class="feature-icon">📱</div>
                        <h3>响应式设计</h3>
                        <p>完美适配各种设备屏幕，提供一致的用户体验</p>
                    </article>
                    <article class="feature-card">
                        <div class="feature-icon">🎨</div>
                        <h3>现代设计</h3>
                        <p>遵循最新的设计趋势和用户界面最佳实践</p>
                    </article>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>联系我们</h4>
                    <p>邮箱: contact@modernweb.com</p>
                    <p>电话: +86 123 4567 8900</p>
                </div>
                <div class="footer-section">
                    <h4>关注我们</h4>
                    <div class="social-links">
                        <a href="#" aria-label="微博">微博</a>
                        <a href="#" aria-label="微信">微信</a>
                        <a href="#" aria-label="GitHub">GitHub</a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 ModernWeb. 保留所有权利。</p>
            </div>
        </div>
    </footer>
</body>
</html>`,
  },
  css: {
    title: "现代 CSS 样式",
    language: "css",
    code: `:root {
  --primary-color: #6366f1;
  --secondary-color: #8b5cf6;
  --accent-color: #06b6d4;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
  --background: #ffffff;
  --surface: #f9fafb;
  --border: #e5e7eb;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--background);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Header Styles */
.header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  z-index: 100;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 1.25rem;
}

.logo {
  width: 32px;
  height: 32px;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-weight: 500;
  transition: var(--transition);
  position: relative;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-color);
  transition: var(--transition);
}

.nav-link:hover::after {
  width: 100%;
}

/* Button Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: var(--transition);
  font-size: 0.875rem;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  box-shadow: var(--shadow);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px -8px var(--primary-color);
}

.btn-secondary {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
}

.hero-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Features Section */
.features-section {
  padding: 4rem 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--surface);
  padding: 2rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border);
  text-align: center;
  transition: var(--transition);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-menu {
    display: none;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  :root {
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    --background: #111827;
    --surface: #1f2937;
    --border: #374151;
  }
}`,
  },
}

export default function CodeEditor() {
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lineCount, setLineCount] = useState(1)
  const [activeTab, setActiveTab] = useState("editor")
  const [codeStructure, setCodeStructure] = useState(null)
  const [language, setLanguage] = useState("javascript")
  const [showThinkingDialog, setShowThinkingDialog] = useState(false)
  const [hasReceivedFirstOutput, setHasReceivedFirstOutput] = useState(false)
  const [isRunningDemo, setIsRunningDemo] = useState(false)

  const { streamCompletion } = useAIStream()

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
    setShowThinkingDialog(true)
    setHasReceivedFirstOutput(false)
    setOutput("")

    streamCompletion({
      content: code,
      onMessage: (content) => {
        // 收到第一次输出时关闭思考弹框
        if (!hasReceivedFirstOutput) {
          setShowThinkingDialog(false)
          setHasReceivedFirstOutput(true)
          // 自动切换到输出标签页
          setActiveTab("output")
        }
        setOutput((prev) => prev + content)
      },
      onComplete: () => {
        console.log("Stream completed")
        setIsProcessing(false)
        setShowThinkingDialog(false)
        setIsRunningDemo(false)
      },
      onError: (err) => {
        console.error("反编译失败:", err)
        setOutput("反编译过程中发生错误")
        setIsProcessing(false)
        setShowThinkingDialog(false)
        setIsRunningDemo(false)
      },
    })
  }

  const handleDemoClick = async (demoKey: string) => {
    const demo = DEMO_CODES[demoKey]
    if (!demo) return

    setIsRunningDemo(true)

    // 先清空输出
    setOutput("")
    setActiveTab("editor")

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
          handleDecompile()
        }, 1000)
      }
    }, 10) // 调整打字速度
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
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
                  {isRunningDemo && (
                    <span className="px-2 py-1 text-xs rounded-full bg-orange-600/20 text-orange-300 animate-pulse">
                      演示中
                    </span>
                  )}
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
            <DialogDescription className="text-center py-4">
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  </div>
                </div>
                <p className="text-sm text-zinc-400">正在分析您的代码结构和语法特征...</p>
                <p className="text-xs text-zinc-500">这可能需要几秒钟时间，请耐心等待</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

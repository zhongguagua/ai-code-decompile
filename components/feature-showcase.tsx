"use client"

import { motion } from "framer-motion"
import { Code2, Cpu, Sparkles, Zap, Lock, FileJson } from "lucide-react"

export default function FeatureShowcase() {
  const features = [
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "AI智能分析",
      description: "通过深度学习算法，智能分析压缩混淆后的JavaScript代码，识别代码结构和逻辑",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "完美还原代码",
      description: "不仅还原原始代码结构，还能优化代码质量，使其比原代码更清晰、更易读",
      color: "from-purple-600 to-purple-800",
    },
    {
      icon: <FileJson className="h-6 w-6" />,
      title: "TypeScript类型生成",
      description: "自动生成完整的TypeScript类型定义，提高代码的可维护性和开发效率",
      color: "from-emerald-600 to-emerald-800",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "特殊训练模型",
      description: "经过数百万代码样本训练，能够理解各种编码风格和框架特性",
      color: "from-amber-600 to-amber-800",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "完全免费",
      description: "所有功能完全免费使用，无需注册，无需付费，立即体验强大功能",
      color: "from-green-600 to-green-800",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "安全可靠",
      description: "所有代码分析在本地进行，不会上传到服务器，保障您的代码安全",
      color: "from-red-600 to-red-800",
    },
  ]

  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            强大功能，超越期待
          </span>
        </h2>
        <p className="text-lg text-zinc-300">
          我们的代码反编译工具采用最先进的AI技术，不仅能够解析混淆代码，还能生成比原代码更优质的结果，帮助开发者快速理解和优化代码。
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300"
          >
            <div className="p-6">
              <div
                className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} mb-4 flex items-center justify-center text-white`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

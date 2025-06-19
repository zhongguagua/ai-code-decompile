"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code2, Database, Layers, Zap } from "lucide-react"

interface Node {
  id: string
  type: string
  position: { x: number; y: number }
  data: { label: string; type: string }
}

interface Edge {
  id: string
  source: string
  target: string
}

interface CodeStructure {
  nodes: Node[]
  edges: Edge[]
  type: string
}

interface CodeVisualizerProps {
  structure: CodeStructure | null
}

export default function CodeVisualizer({ structure }: CodeVisualizerProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const getNodeColor = (type: string) => {
    switch (type) {
      case "function":
        return "from-purple-500 to-purple-700"
      case "variable":
        return "from-blue-500 to-blue-700"
      case "class":
        return "from-green-500 to-green-700"
      case "html":
        return "from-orange-500 to-orange-700"
      case "css":
        return "from-pink-500 to-pink-700"
      default:
        return "from-gray-500 to-gray-700"
    }
  }

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "function":
        return <Zap className="h-4 w-4" />
      case "variable":
        return <Database className="h-4 w-4" />
      case "class":
        return <Layers className="h-4 w-4" />
      default:
        return <Code2 className="h-4 w-4" />
    }
  }

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId)
  }

  if (!structure || !structure.nodes.length) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-600">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
              <svg className="h-10 w-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </motion.div>
          <h3 className="text-lg font-medium mb-2">代码结构可视化</h3>
          <p className="text-sm text-zinc-500">通过图表结构化的方式来梳理代码, 开发进行中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="text-sm font-medium">代码结构图</span>
          <span className="px-2 py-1 text-xs rounded-full bg-purple-600/20 text-purple-300">
            {structure.type.toUpperCase()}
          </span>
        </div>
        <div className="text-xs text-zinc-500">{structure.nodes.length} 个节点</div>
      </div>

      <div className="flex-1 relative rounded-lg overflow-hidden border border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 to-blue-900/5"></div>
        <div className="absolute inset-0 bg-zinc-900/90"></div>

        <div className="h-full p-6 overflow-auto">
          <svg width="100%" height="400" className="border border-zinc-800/50 rounded-lg bg-zinc-900/50">
            {/* Grid pattern */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(120, 100, 255, 0.1)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Edges */}
            {structure.edges.map((edge) => {
              const sourceNode = structure.nodes.find((n) => n.id === edge.source)
              const targetNode = structure.nodes.find((n) => n.id === edge.target)

              if (!sourceNode || !targetNode) return null

              return (
                <line
                  key={edge.id}
                  x1={sourceNode.position.x + 60}
                  y1={sourceNode.position.y + 30}
                  x2={targetNode.position.x + 60}
                  y2={targetNode.position.y + 30}
                  stroke="rgba(120, 100, 255, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
              )
            })}

            {/* Nodes */}
            {structure.nodes.map((node, index) => (
              <g key={node.id}>
                <motion.rect
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  x={node.position.x}
                  y={node.position.y}
                  width="120"
                  height="60"
                  rx="8"
                  fill={`url(#gradient-${node.id})`}
                  stroke={selectedNode === node.id ? "rgba(120, 100, 255, 0.8)" : "rgba(120, 100, 255, 0.3)"}
                  strokeWidth={selectedNode === node.id ? "3" : "1"}
                  className="cursor-pointer transition-all duration-200"
                  onClick={() => handleNodeClick(node.id)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    filter: hoveredNode === node.id ? "brightness(1.2)" : "brightness(1)",
                    transform: hoveredNode === node.id ? "scale(1.05)" : "scale(1)",
                    transformOrigin: "center",
                  }}
                />

                <defs>
                  <linearGradient id={`gradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop
                      offset="0%"
                      stopColor={getNodeColor(node.type).split(" ")[0].replace("from-", "")}
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="100%"
                      stopColor={getNodeColor(node.type).split(" ")[2].replace("to-", "")}
                      stopOpacity="0.6"
                    />
                  </linearGradient>
                </defs>

                <text
                  x={node.position.x + 60}
                  y={node.position.y + 25}
                  textAnchor="middle"
                  className="fill-white text-xs font-medium pointer-events-none"
                >
                  {node.data.label.length > 12 ? node.data.label.substring(0, 12) + "..." : node.data.label}
                </text>

                <text
                  x={node.position.x + 60}
                  y={node.position.y + 40}
                  textAnchor="middle"
                  className="fill-zinc-300 text-xs pointer-events-none"
                >
                  {node.data.type}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Node details panel */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-lg border border-zinc-800 bg-zinc-900/50"
        >
          {(() => {
            const node = structure.nodes.find((n) => n.id === selectedNode)
            if (!node) return null

            return (
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${getNodeColor(node.type)}`}>
                  {getNodeIcon(node.type)}
                </div>
                <div>
                  <h4 className="font-medium">{node.data.label}</h4>
                  <p className="text-sm text-zinc-400">{node.data.type}</p>
                </div>
              </div>
            )
          })()}
        </motion.div>
      )}

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
        {[
          { type: "function", label: "函数", icon: Zap },
          { type: "variable", label: "变量", icon: Database },
          { type: "class", label: "类", icon: Layers },
          { type: "html", label: "HTML", icon: Code2 },
          { type: "css", label: "CSS", icon: Code2 },
        ].map(({ type, label, icon: Icon }) => (
          <div key={type} className="flex items-center gap-2 p-2 rounded-lg border border-zinc-800 bg-zinc-900/30">
            <div className={`p-1 rounded bg-gradient-to-br ${getNodeColor(type)}`}>
              <Icon className="h-3 w-3" />
            </div>
            <span className="text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

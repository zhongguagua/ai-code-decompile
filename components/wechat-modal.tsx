"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageCircle, Users, QrCode, Star, Gift } from "lucide-react"
import { motion } from "framer-motion"
import Image from 'next/image';


export default function WeChatModal() {
  const [activeTab, setActiveTab] = useState("group")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-green-500/30 hover:border-green-400/50 text-green-400 hover:text-green-300 transition-all duration-300"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">加入社群</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">
            加入我们的技术社群
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 p-1 bg-zinc-800/50 rounded-lg">
            <button
              onClick={() => setActiveTab("group")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === "group"
                  ? "bg-green-600 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
              }`}
            >
              <Users className="h-4 w-4" />
              微信群
            </button>
            {/* <button
              onClick={() => setActiveTab("official")}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === "official"
                  ? "bg-blue-600 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-700/50"
              }`}
            >
              <Star className="h-4 w-4" />
              公众号
            </button> */}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-4"
          >
            {activeTab === "group" && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-green-400">
                    <Users className="h-5 w-5" />
                    <span className="font-semibold">技术交流群</span>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
                    <div className="w-48 h-48 mx-auto bg-white overflow-hidden rounded-lg flex items-center justify-center">
                      <div className="text-center text-zinc-600">
                        <Image src="/weixin.jpg" width={200} height={300} className="h-[200px] w-full mx-auto mb-2" alt="weixin"></Image>
                      </div>
                    </div>

                    <p className="text-sm">微信群二维码</p>
                    <p className="text-xs mt-1">扫码加好友后备注AI编码 会邀请你加入技术学习交流群</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-green-400">
                        <Gift className="h-4 w-4" />
                        <span>群内福利</span>
                      </div>
                      <ul className="text-zinc-300 space-y-1 text-left">
                        <li>• 🚀 反编译技术分享</li>
                        <li>• 💡 认识JavaScript大佬</li>
                        <li>• 📚 独家学习资源</li>
                        <li>• 🎯 成为内测种子用户</li>
                        <li>• 🔥 上报并优先解决bug</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* {activeTab === "official" && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2 text-blue-400">
                    <Star className="h-5 w-5" />
                    <span className="font-semibold">技术公众号</span>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-4 space-y-3">
                    <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center">
                      <div className="text-center text-zinc-600">
                        <QrCode className="h-16 w-16 mx-auto mb-2" />
                        <p className="text-sm">公众号二维码</p>
                        <p className="text-xs mt-1">关注获取更多资源</p>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-blue-400">
                        <Gift className="h-4 w-4" />
                        <span>精彩内容</span>
                      </div>
                      <ul className="text-zinc-300 space-y-1 text-left">
                        <li>• 📖 深度技术文章</li>
                        <li>• 🛠️ 实用开发工具</li>
                        <li>• 📊 行业趋势分析</li>
                        <li>• 💼 职场发展指南</li>
                        <li>• 🎁 独家资源下载</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )} */}
          </motion.div>

          {/* Call to Action */}
          {/* <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 border border-purple-500/30">
            <div className="text-center space-y-2">
              <h4 className="font-semibold text-purple-300">🎉 新用户专享</h4>
              <p className="text-sm text-zinc-300">
                加入社群即可获得价值 <span className="text-yellow-400 font-bold">¥199</span> 的前端学习资料包
              </p>
              <div className="flex items-center justify-center gap-4 text-xs text-zinc-400 mt-3">
                <span>• Vue3 实战项目</span>
                <span>• React 进阶教程</span>
                <span>• 面试题库</span>
              </div>
            </div>
          </div> */}

          {/* Footer */}
          <div className="text-center text-xs text-zinc-500 space-y-1">
            <p>
              👥 已有 <span className="text-green-400 font-semibold">200+</span> 开发者加入
            </p>
            <p>🔥 每日活跃讨论，技术氛围浓厚</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

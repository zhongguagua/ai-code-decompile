"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"

export default function DemoSection() {
  const [activeTab, setActiveTab] = useState(0)

  const demoExamples = [
    {
      title: "混淆JS代码还原",
      description: "将压缩混淆后难以阅读的JS代码转换为清晰、结构化的代码",
      beforeCode: `const a=function(){let b=!0;return function(c,d){const e=b?function(){if(d){const f=d.apply(c,arguments);return d=null,f}}:function(){};return b=!1,e}}(),c=a(this,function(){return c.toString().search("(((.+)+)+)+$").toString().constructor(c).search("(((.+)+)+)+$")});c();`,
      afterCode: `/**
 * 创建一个只执行一次的函数
 * @param context 函数上下文
 * @param callback 回调函数
 * @returns 处理后的结果
 */
const createOnceFunction = function() {
  // 标记是否是第一次执行
  let isFirstTime = true;
  
  return function(context, callback) {
    // 如果是第一次执行，则调用回调函数
    const onceExecutor = isFirstTime 
      ? function() {
          if (callback) {
            const result = callback.apply(context, arguments);
            // 清除引用，帮助垃圾回收
            callback = null;
            return result;
          }
        } 
      : function() {};
      
    // 设置为非第一次
    isFirstTime = false;
    return onceExecutor;
  };
}();`,
    },
    {
      title: "自动生成TypeScript类型",
      description: "从JavaScript代码自动推导并生成完整的TypeScript类型定义",
      beforeCode: `function processData(data, options) {
  const { sort = true, filter = null } = options || {};
  
  let result = [...data];
  
  if (filter) {
    result = result.filter(item => filter(item));
  }
  
  if (sort) {
    result.sort((a, b) => a.id - b.id);
  }
  
  return {
    items: result,
    count: result.length,
    timestamp: Date.now()
  };
}`,
      afterCode: `/**
 * 处理数据的选项接口
 */
interface ProcessOptions {
  /** 是否排序，默认为true */
  sort?: boolean;
  /** 过滤函数，默认为null */
  filter?: ((item: DataItem) => boolean) | null;
}

/**
 * 数据项接口
 */
interface DataItem {
  /** 唯一标识符 */
  id: number;
  [key: string]: any;
}

/**
 * 处理结果接口
 */
interface ProcessResult {
  /** 处理后的数据项 */
  items: DataItem[];
  /** 数据项数量 */
  count: number;
  /** 处理时间戳 */
  timestamp: number;
}

/**
 * 处理数据函数
 * @param data 要处理的数据数组
 * @param options 处理选项
 * @returns 处理结果
 */
function processData(
  data: DataItem[], 
  options?: ProcessOptions
): ProcessResult {
  const { sort = true, filter = null } = options || {};
  
  let result = [...data];
  
  if (filter) {
    result = result.filter(item => filter(item));
  }
  
  if (sort) {
    result.sort((a, b) => a.id - b.id);
  }
  
  return {
    items: result,
    count: result.length,
    timestamp: Date.now()
  };
}`,
    },
    {
      title: "代码优化与重构",
      description: "不仅还原代码，还能优化代码结构，提高可读性和性能",
      beforeCode: `function x(a,b,c){var r=[];for(var i=0;i<a.length;i++){if(b(a[i])){r.push(c(a[i]));}}return r;}
const y = [1,2,3,4,5,6,7,8,9,10];
const z = x(y, function(n){return n%2==0;}, function(n){return n*n;});
console.log(z);`,
      afterCode: `/**
 * 高阶函数：映射并过滤数组元素
 * @param array 输入数组
 * @param filterFn 过滤函数
 * @param mapFn 映射函数
 * @returns 处理后的新数组
 */
function mapFilterArray<T, R>(
  array: T[],
  filterFn: (item: T) => boolean,
  mapFn: (item: T) => R
): R[] {
  // 使用函数式编程方法重构
  return array
    .filter(filterFn)
    .map(mapFn);
}

// 示例数据
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 获取偶数的平方
const evenSquares = mapFilterArray(
  numbers,
  (n) => n % 2 === 0,  // 过滤偶数
  (n) => n * n         // 计算平方
);

console.log(evenSquares); // [4, 16, 36, 64, 100]`,
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
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            代码转换效果展示
          </span>
        </h2>
        <p className="text-lg text-zinc-300">
          查看我们的AI反编译器如何将混淆、难以理解的代码转换为清晰、结构化且带有完整类型定义的高质量代码。
        </p>
      </motion.div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide border-b border-zinc-800">
          {demoExamples.map((example, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-4 text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === index ? "text-white border-b-2 border-purple-500" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {example.title}
            </button>
          ))}
        </div>

        <div className="p-6">
          <p className="text-lg font-medium mb-2">{demoExamples[activeTab].title}</p>
          <p className="text-zinc-400 mb-6">{demoExamples[activeTab].description}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
              <div className="bg-zinc-800 px-4 py-2 text-sm font-medium">混淆前的代码</div>
              <pre className="p-4 text-xs md:text-sm font-mono text-zinc-300 overflow-auto max-h-96">
                {demoExamples[activeTab].beforeCode}
              </pre>
            </div>

            <div className="bg-zinc-950 rounded-lg border border-zinc-800 overflow-hidden">
              <div className="bg-zinc-800 px-4 py-2 text-sm font-medium flex items-center justify-between">
                <span>反编译后的代码</span>
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <Check className="h-4 w-4" />
                  <span>优化完成</span>
                </div>
              </div>
              <pre className="p-4 text-xs md:text-sm font-mono text-emerald-300 overflow-auto max-h-96">
                {demoExamples[activeTab].afterCode}
              </pre>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">准备好体验强大的代码反编译了吗？</h3>
              <p className="text-zinc-400">立即尝试我们的AI代码反编译工具，完全免费！</p>
            </div>
            <Button
              onClick={() => {
                const editorElement = document.querySelector("#code-editor")
                if (editorElement) {
                  editorElement.scrollIntoView({ behavior: "smooth" })
                }
              }}
              className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
            >
              立即体验
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

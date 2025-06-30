import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// 方案1：容错的代码块提取（推荐）
export const extractCodeBlocksStreaming = (text: string): string[] => {
  const matches: string[] = [];
  
  // 先尝试匹配完整的代码块
  const completeBlockRegex = /```(?:typescript|javascript|js|ts)?\s*\n?([\s\S]*?)```/g;
  let match;
  
  while ((match = completeBlockRegex.exec(text)) !== null) {
    matches.push(match[1].trim());
  }
  
  // 如果没有完整代码块，尝试匹配未闭合的代码块（流式场景）
  if (matches.length === 0) {
    const incompleteBlockRegex = /```(?:typescript|javascript|js|ts)?\s*\n?([\s\S]*?)$/;
    const incompleteMatch = text.match(incompleteBlockRegex);
    
    if (incompleteMatch && incompleteMatch[1]) {
      // 检查这确实是一个代码块的开始，而不是普通文本中的反引号
      const beforeBlock = text.substring(0, text.indexOf('```'));
      const hasCodeStart = /```(?:typescript|javascript|js|ts)?\s*\n?/.test(text);
      
      if (hasCodeStart) {
        matches.push(incompleteMatch[1].trim());
      }
    }
  }
  
  return matches;
};
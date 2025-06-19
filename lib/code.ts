// 示例代码库
export const DEMO_CODES = {
    javascript: {
        title: 'JavaScript',
        language: 'javascript',
        code: `!function(r=100){if("number"!=typeof r||r<1)throw new Error("please input number");const t=r=>{if(r<2)return!1;for(let t=2,e=Math.sqrt(r);t<=e;t++)if(r%t===0)return!1;return!0},e=[];for(let n=1;n<=r;n++){t(String(n*n).split("").reduce(((r,t)=>r+ +t),0))&&e.push(n)}}();`,
        code2: `// 定义一个函数，用于判断一个数字是否为质数
function isPrime(num: number): boolean {
    // 小于2的数字不是质数
    if (num < 2) return false;
    // 计算平方根作为循环上限
    const sqrt = Math.sqrt(num);
    // 遍历从2到平方根的所有整数
    for (let i = 2; i <= sqrt; i++) {
        // 如果能被整除则不是质数
        if (num % i === 0) return false;
    }
    return true;
}

// 计算数字各位数之和的函数
function digitSum(num: number): number {
    // 将数字转为字符串再分割为字符数组
    const digits = String(num).split('');
    // 使用reduce将每个字符转为数字后累加
    return digits.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}

// 主函数：查找满足条件的数字
function findSpecialNumbers(maxNumber: number = 100): number[] {
    // 验证输入必须是大于等于1的数字
    if (typeof maxNumber !== 'number' || maxNumber < 1) {
        throw new Error('输入必须是大于等于1的数字');
    }

    const result: number[] = []; // 存储结果的数组

    // 遍历从1到maxNumber的所有数字
    for (let n = 1; n <= maxNumber; n++) {
        const square = n * n;        // 计算当前数字的平方
        const sum = digitSum(square); // 计算平方值的各位数之和
        
        // 如果各位数之和是质数，则将当前数字加入结果
        if (isPrime(sum)) {
            result.push(n);
        }
    }

    return result; // 返回结果数组
}

// 导出函数供外部使用
export { isPrime, digitSum, findSpecialNumbers };`,
    },
};

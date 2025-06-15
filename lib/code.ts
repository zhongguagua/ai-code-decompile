// 示例代码库
export const DEMO_CODES = {
    javascript: {
        title: 'JavaScript',
        language: 'javascript',
        code: `!function(r=100){if("number"!=typeof r||r<1)throw new Error("please input number");const t=r=>{if(r<2)return!1;for(let t=2,e=Math.sqrt(r);t<=e;t++)if(r%t===0)return!1;return!0},e=[];for(let n=1;n<=r;n++){t(String(n*n).split("").reduce(((r,t)=>r+ +t),0))&&e.push(n)}}();`,
    },
};
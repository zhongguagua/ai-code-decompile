**English** | **[中文](README.md)**

---

# JSUnpack – Transform Unreadable Frontend Code into Understandable Code

**JSUnpack** is an AI-based JavaScript decompilation and analysis tool,
designed to analyze **bundled, minified, and obfuscated frontend code**, helping developers understand "how this website is actually implemented."

👉 Try it online: https://www.jsunpack.tech/

---

## 🤔 When do you need JSUnpack?

If you're doing any of the following, this tool is for you:

- Want to study **a website's interactions, animations, or overall implementation**
- Only have JS files loaded in the browser, **without source code or build configuration**
- Facing code bundled by Webpack / Vite / Rollup with severely obfuscated variable names
- Want to analyze the implementation logic of **xx.js / React / Vue and other complex frontend outputs**
- Existing tools can only format code, but **it's still very hard to understand**

JSUnpack's goal is to **help people truly understand what frontend products are doing**.

---

## ✨ What can JSUnpack do?

### 🧠 AI-Driven Code Understanding
- Analyzes code logic based on context, not simple string replacement
- Identifies key processes, core functions, and module structures
- Helps understand complex control flow and business logic

### 🔍 Deobfuscation and Dependency Recognition
- Intelligently infers the actual purpose of variables and functions
- Automatically recognizes common third-party libraries and framework code
- Reduces irrelevant code interference, focusing on truly valuable implementation parts

### 🧩 Oriented Towards Real Engineering Scenarios
- Suitable for real build products with multiple entries and chunks
- Supports highly compressed, mixed-framework, and business/library code interwoven scenarios
- Not a demo-level tool, but designed for real projects

---

## 🚀 Try it Online Now

No installation, no configuration needed:

👉 https://www.jsunpack.tech/
**Paste obfuscated JS → One-click analysis → Get understandable results**

---

## 🎯 Example Use Cases

- Analyze competitor or reference site implementations before technology selection
- Learn complex interactions, animations, WebGL, or engineering architecture design
- Troubleshoot online issues, understand legacy frontend products
- Security research, architecture analysis, technical research (legal and compliant scenarios)

---

## ⚠️ Technical Boundaries and Principles of Use

- JSUnpack **does not aim to restore the original source code 100%**
- After multiple rounds of bundling and obfuscation, some semantic information is inherently irreversible
- This tool is only for **learning, analysis, research, and problem location**
- Does not provide any cracking, authorization bypass, or commercial protection circumvention capabilities

---

## Our Story
👉 https://www.jsunpack.tech/blog/our-story-and-vision/

## 📦 What is this repository?

This repository is the **open-source frontend implementation of JSUnpack**,
used for interface display and interaction, containing only UI and interaction logic.

### Tech Stack
- React
- Next.js
- TypeScript
- Tailwind CSS
- @radix-ui

### Local Run
```bash
node >= 18

npm install
npm run dev
```

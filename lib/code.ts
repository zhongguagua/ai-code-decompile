// 示例代码库
export const DEMO_CODES = {
    react: {
        title: 'React 函数组件',
        language: 'javascript',
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
        title: 'TypeScript 接口定义',
        language: 'typescript',
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
        title: 'Vue 3 组合式API',
        language: 'javascript',
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
        title: '现代 HTML5 页面',
        language: 'html',
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
        title: '现代 CSS 样式',
        language: 'css',
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
};
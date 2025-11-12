<template>
  <div class="home-view">
    <div class="home-container">
      <h1>欢迎使用 CoPage</h1>
      <p class="subtitle">多人在线协作编辑平台</p>

      <div class="action-buttons">
        <button class="btn btn-primary" @click="goToDocuments">
          进入文档列表
        </button>
        <button class="btn btn-secondary" @click="goToLogin">
          登录
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToDocuments = () => {
  router.push('/documents')
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.home-view {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.home-container {
  text-align: center;
  color: white;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 3rem;
  opacity: 0.9;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}
</style>

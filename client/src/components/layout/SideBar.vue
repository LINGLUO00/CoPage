<template>
  <aside class="sidebar">
    <div class="sidebar-icons">
      <!-- 文件图标 -->
      <button class="sidebar-icon" :class="{ active: layoutStore.middlePanelType === 'files' }"
        @click="layoutStore.toggleMiddlePanel('files')" title="文件管理">
        <i class="pi pi-folder"></i>
      </button>

      <!-- AI 助手图标 -->
      <button class="sidebar-icon" :class="{ active: layoutStore.middlePanelType === 'ai' }"
        @click="layoutStore.toggleMiddlePanel('ai')" title="AI 助手">
        <i class="pi pi-sparkles"></i>
      </button>

      <!-- 聊天图标 -->
      <button class="sidebar-icon" :class="{ active: layoutStore.middlePanelType === 'chat' }"
        @click="layoutStore.toggleMiddlePanel('chat')" title="团队聊天">
        <i class="pi pi-comments"></i>
      </button>

      <div class="sidebar-divider"></div>

      <!-- 搜索图标 -->
      <button class="sidebar-icon" @click="handleSearch" title="搜索">
        <i class="pi pi-search"></i>
      </button>

      <!-- 设置图标 -->
      <button class="sidebar-icon" :class="{ active: layoutStore.middlePanelType === 'settings' }"
        @click="layoutStore.toggleMiddlePanel('settings')" title="设置">
        <i class="pi pi-cog"></i>
      </button>
    </div>

    <div class="sidebar-bottom">
      <!-- 用户头像 -->
      <button class="sidebar-icon user-avatar" title="个人中心">
        <i class="pi pi-user"></i>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'

const router = useRouter()
const layoutStore = useLayoutStore()

const handleSearch = () => {
  // TODO: 实现搜索功能
  console.log('打开搜索')
}

const goToSettings = () => {
  router.push('/settings')
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 0;
  border-right: 1px solid var(--border-color);
  flex-shrink: 0;
}

.sidebar-icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.sidebar-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-icon {
  width: 48px;
  height: 48px;
  border: none;
  background: transparent;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: all 0.2s ease;
  position: relative;
}

.sidebar-icon:hover {
  background: var(--hover-bg);
  transform: translateX(2px);
}

.sidebar-icon.active {
  background: var(--primary-color);
  color: white;
}

.sidebar-icon.active::before {
  content: '';
  position: absolute;
  left: -8px;
  width: 3px;
  height: 24px;
  background: var(--primary-color);
  border-radius: 0 2px 2px 0;
}

.sidebar-icon i {
  font-size: 20px;
}

.sidebar-divider {
  width: 32px;
  height: 1px;
  background: var(--border-color);
  margin: 8px 0;
}

.user-avatar {
  background: var(--primary-color);
  color: white;
}

.user-avatar:hover {
  background: var(--secondary-color);
  transform: scale(1.05);
}
</style>

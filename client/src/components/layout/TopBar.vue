<template>
  <header class="top-bar glass">
    <div class="topbar-left">
      <button class="icon-btn" @click="layoutStore.toggleSideBar" title="切换侧边栏">
        <i class="pi pi-bars"></i>
      </button>
      <div class="app-title">
        <i class="pi pi-file-edit"></i>
        <span>CoPage</span>
      </div>
    </div>

    <div class="topbar-center">
      <div class="breadcrumb">
        <span>{{ currentPageTitle }}</span>
      </div>
    </div>

    <div class="topbar-right">
      <button class="icon-btn" @click="toggleTheme" :title="isDark ? '切换到亮色模式' : '切换到暗色模式'">
        <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'"></i>
      </button>

      <button class="icon-btn" title="通知">
        <i class="pi pi-bell"></i>
        <span class="badge">3</span>
      </button>

      <button class="icon-btn" @click="goToProfile" title="个人中心">
        <i class="pi pi-user"></i>
      </button>

      <button class="icon-btn" @click="layoutStore.toggleTopBar" title="隐藏顶部栏">
        <i class="pi pi-times"></i>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'  // 添加 onMounted
import { useRouter, useRoute } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'

const router = useRouter()
const route = useRoute()
const layoutStore = useLayoutStore()

const isDark = ref(true)  // 改为 true，默认开启暗色模式

const currentPageTitle = computed(() => {
  return (route.meta.title as string) || 'CoPage'
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark-mode', isDark.value)
}

const goToProfile = () => {
  router.push('/settings')
}

// 添加：在组件挂载时应用暗色模式
onMounted(() => {
  document.documentElement.classList.add('dark-mode')
})
</script>

<style scoped>
.top-bar {
  height: var(--topbar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--glass-border);
  margin: 8px 8px 0 8px;
  border-radius: 12px;
}

.topbar-left,
.topbar-center,
.topbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.topbar-left {
  flex: 1;
}

.topbar-center {
  flex: 2;
  justify-content: center;
}

.topbar-right {
  flex: 1;
  justify-content: flex-end;
}

.app-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
  user-select: none;
}

.breadcrumb {
  color: var(--text-color);
  font-size: 14px;
  font-weight: 500;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: all 0.2s ease;
  position: relative;
}

.icon-btn:hover {
  background: var(--hover-bg);
}

.icon-btn i {
  font-size: 18px;
}

.badge {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #ff4757;
  color: white;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
  font-weight: 600;
}
</style>

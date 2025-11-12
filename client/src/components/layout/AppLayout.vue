<template>
  <div class="app-layout">
    <!--topBar-->
    <TopBar v-if="layoutStore.showTopBar" />
    <div class="layout-body" :class="{ 'no-topbar': !layoutStore.showTopBar }">
      <!-- 侧边栏和中间栏 -->
      <div class="left-panel-container glass" v-if="layoutStore.showSideBar">
        <SideBar />

        <!-- 中间栏（根据类型切换显示） -->
        <MiddlePanel v-if="layoutStore.middlePanelType" />
      </div>
      <!-- 主内容区 -->
      <main class="main-content glass">
        <RouterView />
      </main>
    </div>
  </div>
</template>


<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useLayoutStore } from '@/stores/layout'
import TopBar from './TopBar.vue'
import SideBar from './SideBar.vue'
import MiddlePanel from './MiddlePanel.vue'

const layoutStore = useLayoutStore()
</script>

<style scoped>
.app-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
  position: relative;
}

/* 添加背景装饰元素 */
.app-layout::before,
.app-layout::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  z-index: 0;
}

.app-layout::before {
  content: '';
  position: absolute;
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%);
  top: -200px;
  right: -200px;
  z-index: 0;
  animation: float 6s ease-in-out infinite;
}

.app-layout::after {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 200, 200, 0.3) 0%, transparent 70%);
  bottom: -50px;
  left: -50px;
  filter: blur(60px);
}

.layout-body {
  flex: 1;
  display: flex;
  height: calc(100vh - var(--topbar-height));
  overflow: hidden;
  position: relative;
  z-index: 1;
  gap: 8px;
  padding: 8px;
}

.layout-body.no-topbar {
  height: 100vh;
}

/* 左侧面板容器（包含侧边栏和中间栏） */
.left-panel-container {
  display: flex;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.main-content {
  flex: 1;
  overflow-y: auto;
  border-radius: 12px;
  position: relative;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
</style>

<template>
  <aside class="middle-panel">
    <div class="panel-header">
      <h3 class="panel-title">
        <i :class="panelIcon"></i>
        {{ panelTitle }}
      </h3>
      <button class="close-btn" @click="layoutStore.toggleMiddlePanel(null)" title="关闭">
        <i class="pi pi-times"></i>
      </button>
    </div>

    <div class="panel-content">
      <!-- 文件管理面板 -->
      <FilesPanel v-if="layoutStore.middlePanelType === 'files'" />

      <!-- AI 助手面板 -->
      <AIPanel v-if="layoutStore.middlePanelType === 'ai'" />

      <!-- 聊天面板 -->
      <ChatPanel v-if="layoutStore.middlePanelType === 'chat'" />

      <!-- 设置面板 -->
      <SettingsPanel v-if="layoutStore.middlePanelType === 'settings'" />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import FilesPanel from './panels/FilesPanel.vue'
import AIPanel from './panels/AIPanel.vue'
import ChatPanel from './panels/ChatPanel.vue'

const layoutStore = useLayoutStore()

const panelTitle = computed(() => {
  switch (layoutStore.middlePanelType) {
    case 'files':
      return '文件管理'
    case 'ai':
      return 'AI 助手'
    case 'chat':
      return '团队聊天'
    case 'settings':
      return '设置'
    default:
      return ''
  }
})

const panelIcon = computed(() => {
  switch (layoutStore.middlePanelType) {
    case 'files':
      return 'pi pi-folder'
    case 'ai':
      return 'pi pi-sparkles'
    case 'chat':
      return 'pi pi-comments'
    case 'settings':
      return 'pi pi-cog'
    default:
      return ''
  }
})
</script>

<style scoped>
.middle-panel {
  width: var(--middle-panel-width);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.panel-title i {
  color: var(--primary-color);
}

.close-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--hover-bg);
  color: var(--text-color);
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

/* 自定义滚动条 */
.panel-content::-webkit-scrollbar {
  width: 6px;
}

.panel-content::-webkit-scrollbar-track {
  background: transparent;
}

.panel-content::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}
</style>

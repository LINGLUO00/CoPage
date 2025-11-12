<template>
  <div class="editor-view">
    <!-- 编辑器头部 -->
    <div class="editor-header">
      <div class="editor-header-left">
        <CoButton type="text" icon="pi pi-arrow-left" @click="goBack">
          返回
        </CoButton>
        <div class="document-info">
          <input v-model="documentTitle" class="document-title-input" placeholder="无标题文档" @blur="saveTitle" />
          <span class="save-status">
            <i :class="saveStatusIcon"></i>
            {{ saveStatusText }}
          </span>
        </div>
      </div>

      <div class="editor-header-right">
        <!-- 协作用户 -->
        <div class="collaborators">
          <div v-for="user in collaborators" :key="user.id" class="collaborator-avatar" :title="user.name"
            :style="{ background: user.color }">
            {{ user.name.charAt(0) }}
          </div>
        </div>

        <CoButton icon="pi pi-users" type="secondary" @click="showShareDialog = true">
          分享
        </CoButton>

        <CoButton icon="pi pi-ellipsis-v" type="text" @click="showMenu = !showMenu" />
      </div>
    </div>

    <!-- 编辑器主体 -->
    <div class="editor-container">
      <div class="editor-wrapper">
        <Editor v-model="content" />
      </div>
    </div>

    <!-- 分享对话框 -->
    <CoModal v-model:visible="showShareDialog" title="分享文档" width="500px">
      <div class="share-dialog">
        <div class="share-input-group">
          <CoInput v-model="shareEmail" placeholder="输入邮箱地址" prefix-icon="pi pi-envelope" />
          <CoButton icon="pi pi-send">邀请</CoButton>
        </div>

        <div class="share-list">
          <h4>已分享给</h4>
          <div v-for="user in sharedUsers" :key="user.id" class="share-item">
            <div class="share-user-info">
              <div class="share-user-avatar" :style="{ background: user.color }">
                {{ user.name.charAt(0) }}
              </div>
              <div>
                <div class="share-user-name">{{ user.name }}</div>
                <div class="share-user-email">{{ user.email }}</div>
              </div>
            </div>
            <select v-model="user.permission" class="permission-select">
              <option value="view">查看</option>
              <option value="edit">编辑</option>
              <option value="admin">管理员</option>
            </select>
          </div>
        </div>

        <div class="share-link">
          <h4>通过链接分享</h4>
          <div class="share-input-group">
            <CoInput :model-value="shareLink" readonly />
            <CoButton icon="pi pi-copy" @click="copyShareLink">复制</CoButton>
          </div>
        </div>
      </div>
    </CoModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Editor from 'primevue/editor'
import CoButton from '@/components/common/Button.vue'
import CoInput from '@/components/common/Input.vue'
import CoModal from '@/components/common/Modal.vue'
import { useToast } from '@/composables/useToast'
const route = useRoute()
const router = useRouter()
const toast = useToast()

// 文档信息
const documentId = ref(route.params.id as string)
const documentTitle = ref('无标题文档')
const content = ref('')

// 保存状态
const isSaving = ref(false)
const lastSaved = ref<Date | null>(null)
const autoSaveTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const saveStatusIcon = computed(() => {
  if (isSaving.value) return 'pi pi-spin pi-spinner'
  if (lastSaved.value) return 'pi pi-check'
  return 'pi pi-clock'
})

const saveStatusText = computed(() => {
  if (isSaving.value) return '保存中...'
  if (lastSaved.value) {
    const now = new Date()
    const diff = Math.floor((now.getTime() - lastSaved.value.getTime()) / 1000)
    if (diff < 60) return '刚刚保存'
    if (diff < 3600) return `${Math.floor(diff / 60)} 分钟前保存`
    return '已保存'
  }
  return '未保存'
})

// 协作用户
const collaborators = ref([
  { id: '1', name: '张三', color: '#667eea' },
  { id: '2', name: '李四', color: '#f093fb' },
  { id: '3', name: '王五', color: '#4facfe' }
])

// 分享功能
const showShareDialog = ref(false)
const shareEmail = ref('')
const shareLink = ref('https://copage.app/share/abc123')
const sharedUsers = ref([
  { id: '1', name: '张三', email: 'zhangsan@example.com', color: '#667eea', permission: 'edit' },
  { id: '2', name: '李四', email: 'lisi@example.com', color: '#f093fb', permission: 'view' }
])

// 菜单
const showMenu = ref(false)


// 返回
const goBack = () => {
  router.push('/documents')
}

// 保存标题
const saveTitle = () => {
  console.log('保存标题:', documentTitle.value)
  autoSave()
}

// 文本变化处理
const handleTextChange = () => {
  // 清除之前的定时器
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value)
  }

  // 设置新的自动保存定时器（2秒后保存）
  autoSaveTimer.value = setTimeout(() => {
    autoSave()
  }, 2000)
}

// 自动保存
const autoSave = async () => {
  isSaving.value = true

  // 模拟保存到服务器
  await new Promise(resolve => setTimeout(resolve, 500))

  lastSaved.value = new Date()
  isSaving.value = false

  console.log('自动保存成功')
}

// 复制分享链接
const copyShareLink = () => {
  navigator.clipboard.writeText(shareLink.value)
  toast.success('链接已复制到剪贴板')
}

// 加载文档
const loadDocument = async () => {
  // 模拟从服务器加载文档
  await new Promise(resolve => setTimeout(resolve, 500))

  documentTitle.value = '项目计划文档'
  content.value = '<h1>欢迎使用 CoPage</h1><p>这是一个多人在线协作编辑平台。</p>'

  console.log('文档加载成功:', documentId.value)
}

onMounted(() => {
  loadDocument()
})

onUnmounted(() => {
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value)
  }
})
</script>

<style scoped>
.editor-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 编辑器头部 */
.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.editor-header-left,
.editor-header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.document-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.document-title-input {
  border: none;
  background: transparent;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  padding: 4px 8px;
  border-radius: 4px;
  outline: none;
  transition: background 0.2s ease;
}

.document-title-input:hover,
.document-title-input:focus {
  background: rgba(0, 0, 0, 0.05);
}

.save-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-secondary);
  padding: 0 8px;
}

/* 协作用户 */
.collaborators {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.collaborator-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border: 2px solid white;
  margin-left: -8px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.collaborator-avatar:first-child {
  margin-left: 0;
}

.collaborator-avatar:hover {
  transform: translateY(-2px);
  z-index: 1;
}

/* 编辑器容器 */
.editor-container {
  flex: 1;
  padding: 0px;
  overflow: hidden;
  display: flex;
}

.editor-wrapper {
  width: 100%;
  max-width: none;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
}

/* PrimeVue Editor 样式覆盖 */
.editor-wrapper :deep(.p-editor-container) {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: transparent;
}

/* Toolbar 样式 */
.editor-wrapper :deep(.p-editor-toolbar) {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-color);
  border-radius: 0;
  padding: 12px;
  flex-shrink: 0;
}

.editor-wrapper :deep(.ql-picker-label):hover {
  color: var(--primary-color) !important;
}

/* Toolbar 按钮悬停效果 */
.editor-wrapper :deep(.ql-toolbar button):hover,
.editor-wrapper :deep(.ql-toolbar button.ql-active) {
  background: rgba(102, 126, 234, 0.1);
  border-radius: 4px;
}

.editor-wrapper :deep(.ql-toolbar button.ql-active .ql-stroke) {
  stroke: var(--primary-color) !important;
}

.editor-wrapper :deep(.ql-toolbar button.ql-active .ql-fill) {
  fill: var(--primary-color) !important;
}

/* 编辑内容区域 */
.editor-wrapper :deep(.p-editor-content) {
  flex: 1;
  border: none;
  overflow-y: auto;
  background: transparent;
  /* 防止 flex 溢出 */
  min-height: 0;
}

.editor-wrapper :deep(.ql-container) {
  background: transparent !important;
  font-family: inherit;
  height: 100%;
  border: none !important;
}

.editor-wrapper :deep(.ql-editor) {
  padding: 24px;
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-color);
  background: transparent !important;
  /* 占满高度 */
  min-height: 100%;
}

.editor-wrapper :deep(.ql-editor.ql-blank::before) {
  color: var(--text-secondary);
  font-style: normal;
  opacity: 0.5;
}

/* 下拉菜单样式 */
.editor-wrapper :deep(.ql-picker-options) {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.editor-wrapper :deep(.ql-picker-item) {
  color: #2c3e50;
}

.editor-wrapper :deep(.ql-picker-item:hover) {
  background: var(--hover-bg);
}

/* 分享对话框 */
.share-dialog {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.share-input-group {
  display: flex;
  gap: 8px;
}

.share-list h4,
.share-link h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.share-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  margin-bottom: 8px;
}

.share-user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.share-user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
}

.share-user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
}

.share-user-email {
  font-size: 12px;
  color: var(--text-secondary);
}

.permission-select {
  padding: 6px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: white;
  color: var(--text-color);
  font-size: 13px;
  cursor: pointer;
  outline: none;
}

.permission-select:focus {
  border-color: var(--primary-color);
}
</style>

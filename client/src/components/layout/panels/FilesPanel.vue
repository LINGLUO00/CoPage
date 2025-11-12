<template>
  <div class="files-panel">
    <div class="search-box">
      <i class="pi pi-search"></i>
      <input type="text" placeholder="搜索文件..." v-model="searchQuery" />
    </div>

    <div class="actions">
      <button class="action-btn" @click="createNewFile" title="新建文件">
        <i class="pi pi-file-plus"></i>
      </button>
      <button class="action-btn" @click="createNewFolder" title="新建文件夹">
        <i class="pi pi-folder-plus"></i>
      </button>
      <button class="action-btn" @click="refreshFiles" title="刷新">
        <i class="pi pi-refresh"></i>
      </button>
    </div>

    <div class="files-tree">
      <div v-for="item in filteredFiles" :key="item.id" class="file-item" :class="{ active: item.id === activeFileId }"
        @click="selectFile(item)">
        <i :class="item.type === 'folder' ? 'pi pi-folder' : 'pi pi-file'"></i>
        <span class="file-name">{{ item.name }}</span>
        <button class="file-menu-btn" @click.stop="showFileMenu(item)">
          <i class="pi pi-ellipsis-v"></i>
        </button>
      </div>

      <div v-if="filteredFiles.length === 0" class="empty-state">
        <i class="pi pi-inbox"></i>
        <p>暂无文件</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  updatedAt: string
}

const router = useRouter()
const searchQuery = ref('')
const activeFileId = ref<string | null>(null)

// 模拟文件数据
const files = ref<FileItem[]>([
  { id: '1', name: '我的文档', type: 'folder', updatedAt: '2024-01-01' },
  { id: '2', name: '项目计划.md', type: 'file', updatedAt: '2024-01-02' },
  { id: '3', name: '团队协作', type: 'folder', updatedAt: '2024-01-03' },
  { id: '4', name: '会议记录.md', type: 'file', updatedAt: '2024-01-04' },
  { id: '5', name: '产品设计', type: 'folder', updatedAt: '2024-01-05' },
])

const filteredFiles = computed(() => {
  if (!searchQuery.value) return files.value
  return files.value.filter(file =>
    file.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const selectFile = (item: FileItem) => {
  activeFileId.value = item.id
  if (item.type === 'file') {
    router.push(`/editor/${item.id}`)
  }
}

const createNewFile = () => {
  console.log('创建新文件')
  // TODO: 实现创建文件功能
}

const createNewFolder = () => {
  console.log('创建新文件夹')
  // TODO: 实现创建文件夹功能
}

const refreshFiles = () => {
  console.log('刷新文件列表')
  // TODO: 实现刷新功能
}

const showFileMenu = (item: FileItem) => {
  console.log('显示文件菜单', item)
  // TODO: 实现右键菜单
}
</script>

<style scoped>
.files-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.search-box i {
  color: var(--text-secondary);
  font-size: 14px;
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: var(--text-color);
}

.search-box input::placeholder {
  color: var(--text-secondary);
}

.actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  flex: 1;
  padding: 8px;
  border: 1px solid var(--border-color);
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.files-tree {
  flex: 1;
  overflow-y: auto;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 4px;
}

.file-item:hover {
  background: var(--hover-bg);
}

.file-item.active {
  background: var(--primary-color);
  color: white;
}

.file-item i {
  font-size: 16px;
  color: var(--primary-color);
}

.file-item.active i {
  color: white;
}

.file-name {
  flex: 1;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-menu-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease;
}

.file-item:hover .file-menu-btn {
  opacity: 1;
}

.file-menu-btn:hover {
  background: rgba(0, 0, 0, 0.1);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: var(--text-secondary);
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-state p {
  font-size: 14px;
}
</style>

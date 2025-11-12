<template>
  <div class="settings-panel">
    <div class="settings-nav">
      <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id">
        <i :class="tab.icon"></i>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <div class="settings-content">
      <!-- 个人资料 -->
      <div v-if="activeTab === 'profile'" class="settings-section">
        <h3>个人资料</h3>
        <div class="form-group">
          <label>用户名</label>
          <input type="text" v-model="profile.username" placeholder="输入用户名" />
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="email" v-model="profile.email" placeholder="输入邮箱" />
        </div>
        <div class="form-group">
          <label>个人简介</label>
          <textarea v-model="profile.bio" placeholder="介绍一下自己..." rows="3"></textarea>
        </div>
        <button class="save-btn">保存更改</button>
      </div>

      <!-- 外观设置 -->
      <div v-if="activeTab === 'appearance'" class="settings-section">
        <h3>外观设置</h3>
        <div class="form-group">
          <label>主题模式</label>
          <div class="radio-group">
            <label class="radio-option">
              <input type="radio" name="theme" value="light" v-model="appearance.theme" />
              <span>浅色模式</span>
            </label>
            <label class="radio-option">
              <input type="radio" name="theme" value="dark" v-model="appearance.theme" />
              <span>深色模式</span>
            </label>
            <label class="radio-option">
              <input type="radio" name="theme" value="auto" v-model="appearance.theme" />
              <span>跟随系统</span>
            </label>
          </div>
        </div>
        <div class="form-group">
          <label>字体大小</label>
          <input type="range" min="12" max="18" v-model="appearance.fontSize" />
          <span class="range-value">{{ appearance.fontSize }}px</span>
        </div>
      </div>

      <!-- 通知设置 -->
      <div v-if="activeTab === 'notifications'" class="settings-section">
        <h3>通知设置</h3>
        <div class="toggle-group">
          <label class="toggle-item">
            <span>文档更新通知</span>
            <input type="checkbox" v-model="notifications.documentUpdates" />
          </label>
          <label class="toggle-item">
            <span>评论提醒</span>
            <input type="checkbox" v-model="notifications.comments" />
          </label>
          <label class="toggle-item">
            <span>任务分配通知</span>
            <input type="checkbox" v-model="notifications.tasks" />
          </label>
          <label class="toggle-item">
            <span>团队消息</span>
            <input type="checkbox" v-model="notifications.messages" />
          </label>
        </div>
      </div>

      <!-- 关于 -->
      <div v-if="activeTab === 'about'" class="settings-section">
        <h3>关于 CoPage</h3>
        <div class="about-info">
          <div class="app-logo">
            <i class="pi pi-file-edit" style="font-size: 48px; color: var(--primary-color);"></i>
          </div>
          <h4>CoPage</h4>
          <p>版本 0.1.0</p>
          <p class="description">多人在线协作编辑平台</p>
          <div class="links">
            <a href="#" class="link-btn">官方网站</a>
            <a href="#" class="link-btn">使用文档</a>
            <a href="#" class="link-btn">问题反馈</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('profile')

const tabs = [
  { id: 'profile', label: '个人资料', icon: 'pi pi-user' },
  { id: 'appearance', label: '外观', icon: 'pi pi-palette' },
  { id: 'notifications', label: '通知', icon: 'pi pi-bell' },
  { id: 'about', label: '关于', icon: 'pi pi-info-circle' }
]

const profile = ref({
  username: '用户名',
  email: 'user@example.com',
  bio: ''
})

const appearance = ref({
  theme: 'light',
  fontSize: 14
})

const notifications = ref({
  documentUpdates: true,
  comments: true,
  tasks: true,
  messages: true
})
</script>

<style scoped>
.settings-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0;
}

.settings-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 16px;
}

.tab-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  color: var(--text-color);
  transition: all 0.2s ease;
}

.tab-btn:hover {
  background: var(--hover-bg);
}

.tab-btn.active {
  background: var(--primary-color);
  color: white;
}

.tab-btn i {
  font-size: 16px;
}

.settings-content {
  flex: 1;
  overflow-y: auto;
}

.settings-section h3 {
  font-size: 16px;
  margin-bottom: 16px;
  color: var(--text-color);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 6px;
  color: var(--text-color);
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.02);
  color: var(--text-color);
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
}

.form-group textarea {
  resize: vertical;
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
}

.form-group input[type="range"] {
  width: calc(100% - 50px);
  margin-right: 10px;
}

.range-value {
  font-size: 13px;
  color: var(--text-secondary);
}

.toggle-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.toggle-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text-color);
}

.toggle-item input[type="checkbox"] {
  width: 40px;
  height: 20px;
  cursor: pointer;
}

.save-btn {
  padding: 10px 20px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.save-btn:hover {
  background: var(--secondary-color);
  transform: translateY(-1px);
}

.about-info {
  text-align: center;
}

.app-logo {
  margin: 20px 0;
}

.about-info h4 {
  font-size: 20px;
  margin-bottom: 8px;
  color: var(--text-color);
}

.about-info p {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.about-info .description {
  font-size: 14px;
  color: var(--text-color);
  margin: 16px 0;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 20px;
}

.link-btn {
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-color);
  font-size: 13px;
  transition: all 0.2s ease;
}

.link-btn:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  color: var(--primary-color);
}
</style>

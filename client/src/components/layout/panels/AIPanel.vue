<template>
  <div class="ai-panel">
    <div class="ai-header">
      <div class="ai-status">
        <div class="status-dot"></div>
        <span>AI 助手在线</span>
      </div>
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <div v-for="message in messages" :key="message.id" class="message"
        :class="{ 'user-message': message.sender === 'user' }">
        <div class="message-avatar">
          <i :class="message.sender === 'user' ? 'pi pi-user' : 'pi pi-sparkles'"></i>
        </div>
        <div class="message-content">
          <div class="message-text">{{ message.text }}</div>
          <div class="message-time">{{ message.time }}</div>
        </div>
      </div>

      <div v-if="isTyping" class="message">
        <div class="message-avatar">
          <i class="pi pi-sparkles"></i>
        </div>
        <div class="message-content">
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="ai-input">
      <textarea v-model="userInput" placeholder="向 AI 提问..." @keydown.enter.exact.prevent="sendMessage"
        rows="1"></textarea>
      <button class="send-btn" @click="sendMessage" :disabled="!userInput.trim()">
        <i class="pi pi-send"></i>
      </button>
    </div>

    <div class="quick-actions">
      <button class="quick-btn" @click="quickAction('总结文档')">
        <i class="pi pi-file"></i>
        总结文档
      </button>
      <button class="quick-btn" @click="quickAction('优化内容')">
        <i class="pi pi-star"></i>
        优化内容
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Message {
  id: string
  sender: 'user' | 'ai'
  text: string
  time: string
}

const userInput = ref('')
const isTyping = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const messages = ref<Message[]>([
  {
    id: '1',
    sender: 'ai',
    text: '你好！我是 AI 助手，有什么可以帮助你的吗？',
    time: '10:00'
  }
])

const sendMessage = async () => {
  if (!userInput.value.trim()) return

  const newMessage: Message = {
    id: Date.now().toString(),
    sender: 'user',
    text: userInput.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  messages.value.push(newMessage)
  userInput.value = ''

  await scrollToBottom()

  // 模拟 AI 回复
  isTyping.value = true
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      id: Date.now().toString(),
      sender: 'ai',
      text: '这是一个模拟的 AI 回复。实际使用时需要接入真实的 AI 接口。',
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })
    scrollToBottom()
  }, 1500)
}

const quickAction = (action: string) => {
  userInput.value = action
  sendMessage()
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
.ai-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
}

.ai-header {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
}

.ai-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #2ecc71;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 8px;
}

.message {
  display: flex;
  gap: 10px;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-message .message-avatar {
  background: var(--secondary-color);
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-message .message-content {
  align-items: flex-end;
}

.message-text {
  background: rgba(102, 126, 234, 0.1);
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  max-width: 85%;
  word-wrap: break-word;
}

.user-message .message-text {
  background: var(--primary-color);
  color: white;
}

.message-time {
  font-size: 11px;
  color: var(--text-secondary);
  padding: 0 4px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 10px 14px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  width: fit-content;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-8px);
  }
}

.ai-input {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.ai-input textarea {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  resize: none;
  font-size: 14px;
  color: var(--text-color);
  font-family: inherit;
  max-height: 100px;
}

.ai-input textarea::placeholder {
  color: var(--text-secondary);
}

.send-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: var(--primary-color);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.send-btn:hover:not(:disabled) {
  background: var(--secondary-color);
  transform: scale(1.05);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quick-actions {
  display: flex;
  gap: 8px;
}

.quick-btn {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
  transition: all 0.2s ease;
}

.quick-btn:hover {
  background: var(--hover-bg);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.quick-btn i {
  font-size: 14px;
}
</style>

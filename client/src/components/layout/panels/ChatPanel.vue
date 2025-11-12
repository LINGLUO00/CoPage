<template>
  <div class="chat-panel">
    <!-- 聊天室列表 -->
    <div class="chat-rooms">
      <div class="rooms-header">
        <span>聊天室</span>
        <button class="add-room-btn" @click="createRoom" title="创建聊天室">
          <i class="pi pi-plus"></i>
        </button>
      </div>
      <div class="rooms-list">
        <div v-for="room in rooms" :key="room.id" class="room-item" :class="{ active: room.id === activeRoomId }"
          @click="selectRoom(room.id)">
          <div class="room-icon">
            <i class="pi pi-users"></i>
          </div>
          <div class="room-info">
            <div class="room-name">{{ room.name }}</div>
            <div class="room-last-message">{{ room.lastMessage }}</div>
          </div>
          <div class="room-badge" v-if="room.unread > 0">
            {{ room.unread }}
          </div>
        </div>
      </div>
    </div>

    <!-- 聊天消息区域 -->
    <div class="chat-messages" ref="messagesContainer" v-if="activeRoomId">
      <div v-for="message in currentMessages" :key="message.id" class="chat-message"
        :class="{ 'own-message': message.userId === currentUserId }">
        <div class="message-avatar">
          <img v-if="message.avatar" :src="message.avatar" :alt="message.userName" />
          <i v-else class="pi pi-user"></i>
        </div>
        <div class="message-bubble">
          <div class="message-header">
            <span class="user-name">{{ message.userName }}</span>
            <span class="message-time">{{ message.time }}</span>
          </div>
          <div class="message-text">{{ message.text }}</div>
        </div>
      </div>
    </div>

    <div v-else class="empty-chat">
      <i class="pi pi-comments"></i>
      <p>选择一个聊天室开始对话</p>
    </div>

    <!-- 输入区域 -->
    <div class="chat-input" v-if="activeRoomId">
      <button class="input-action-btn" title="添加附件">
        <i class="pi pi-paperclip"></i>
      </button>
      <textarea v-model="messageInput" placeholder="输入消息..." @keydown.enter.exact.prevent="sendMessage"
        rows="1"></textarea>
      <button class="input-action-btn" title="表情">
        <i class="pi pi-face-smile"></i>
      </button>
      <button class="send-message-btn" @click="sendMessage" :disabled="!messageInput.trim()">
        <i class="pi pi-send"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

interface Room {
  id: string
  name: string
  lastMessage: string
  unread: number
}

interface Message {
  id: string
  userId: string
  userName: string
  avatar?: string
  text: string
  time: string
}

const activeRoomId = ref<string>('1')
const currentUserId = ref('user1') // 当前用户ID
const messageInput = ref('')
const messagesContainer = ref<HTMLElement | null>(null)

// 聊天室列表
const rooms = ref<Room[]>([
  { id: '1', name: '项目讨论组', lastMessage: '大家下午好！', unread: 3 },
  { id: '2', name: '产品设计团队', lastMessage: '新设计稿已上传', unread: 0 },
  { id: '3', name: '技术交流', lastMessage: '今天的代码审查会议', unread: 1 },
  { id: '4', name: '运营团队', lastMessage: '周报提交提醒', unread: 0 },
])

// 模拟消息数据
const allMessages = ref<Record<string, Message[]>>({
  '1': [
    {
      id: '1',
      userId: 'user2',
      userName: '张三',
      text: '大家下午好！',
      time: '14:30'
    },
    {
      id: '2',
      userId: 'user1',
      userName: '我',
      text: '下午好！今天的任务进展如何？',
      time: '14:32'
    },
    {
      id: '3',
      userId: 'user3',
      userName: '李四',
      text: '我这边的功能开发已经完成了',
      time: '14:35'
    }
  ],
  '2': [
    {
      id: '1',
      userId: 'user4',
      userName: '王五',
      text: '新设计稿已上传，大��看看',
      time: '10:20'
    }
  ],
  '3': [],
  '4': []
})

const currentMessages = computed(() => {
  return activeRoomId.value ? allMessages.value[activeRoomId.value] || [] : []
})

const selectRoom = (roomId: string) => {
  activeRoomId.value = roomId
  // 清除未读标记
  const room = rooms.value.find(r => r.id === roomId)
  if (room) {
    room.unread = 0
  }
  scrollToBottom()
}

const sendMessage = async () => {
  if (!messageInput.value.trim() || !activeRoomId.value) return

  const newMessage: Message = {
    id: Date.now().toString(),
    userId: currentUserId.value,
    userName: '我',
    text: messageInput.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  if (!allMessages.value[activeRoomId.value]) {
    allMessages.value[activeRoomId.value] = []
  }

  allMessages.value[activeRoomId.value].push(newMessage)

  // 更新房间最后消息
  const room = rooms.value.find(r => r.id === activeRoomId.value)
  if (room) {
    room.lastMessage = messageInput.value
  }

  messageInput.value = ''
  await scrollToBottom()
}

const createRoom = () => {
  console.log('创建聊天室')
  // TODO: 实现创建聊天室功能
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>

<style scoped>
.chat-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 12px;
}

.chat-rooms {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 12px;
}

.rooms-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 13px;
  color: var(--text-color);
}

.add-room-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.add-room-btn:hover {
  background: var(--hover-bg);
  color: var(--primary-color);
}

.rooms-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.room-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.room-item:hover {
  background: var(--hover-bg);
}

.room-item.active {
  background: var(--primary-color);
  color: white;
}

.room-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.room-item.active .room-icon {
  background: white;
  color: var(--primary-color);
}

.room-info {
  flex: 1;
  overflow: hidden;
}

.room-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.room-last-message {
  font-size: 12px;
  color: var(--text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.room-item.active .room-last-message {
  color: rgba(255, 255, 255, 0.8);
}

.room-badge {
  width: 20px;
  height: 20px;
  background: #ff4757;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-right: 8px;
}

.chat-message {
  display: flex;
  gap: 10px;
  animation: slideIn 0.3s ease;
}

.chat-message.own-message {
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
  overflow: hidden;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-bubble {
  max-width: 75%;
}

.message-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  padding: 0 4px;
}

.own-message .message-header {
  flex-direction: row-reverse;
}

.user-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-color);
}

.message-time {
  font-size: 11px;
  color: var(--text-secondary);
}

.message-text {
  background: rgba(102, 126, 234, 0.1);
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.own-message .message-text {
  background: var(--primary-color);
  color: white;
}

.empty-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  gap: 12px;
}

.empty-chat i {
  font-size: 48px;
  opacity: 0.5;
}

.empty-chat p {
  font-size: 14px;
}

.chat-input {
  display: flex;
  gap: 8px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  align-items: center;
}

.input-action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.input-action-btn:hover {
  background: var(--hover-bg);
  color: var(--primary-color);
}

.chat-input textarea {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  resize: none;
  font-size: 14px;
  color: var(--text-color);
  font-family: inherit;
  max-height: 80px;
  min-height: 20px;
}

.chat-input textarea::placeholder {
  color: var(--text-secondary);
}

.send-message-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--primary-color);
  color: white;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.send-message-btn:hover:not(:disabled) {
  background: var(--secondary-color);
  transform: scale(1.05);
}

.send-message-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
</style>

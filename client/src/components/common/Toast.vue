<template>
  <Transition name="toast-slide">
    <div v-if="visible" class="co-toast" :class="toastClasses">
      <div class="co-toast__icon">
        <i :class="iconClass"></i>
      </div>
      <div class="co-toast__content">
        <div v-if="title" class="co-toast__title">{{ title }}</div>
        <div class="co-toast__message">{{ message }}</div>
      </div>
      <button v-if="showClose" class="co-toast__close" @click="close">
        <i class="pi pi-times"></i>
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

export interface ToastProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  message: string
  title?: string
  duration?: number
  showClose?: boolean
  onClose?: () => void
}

const props = withDefaults(defineProps<ToastProps>(), {
  type: 'info',
  duration: 3000,
  showClose: true
})

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const toastClasses = computed(() => {
  return [`co-toast--${props.type}`]
})

const iconClass = computed(() => {
  const icons = {
    success: 'pi pi-check-circle',
    error: 'pi pi-times-circle',
    warning: 'pi pi-exclamation-triangle',
    info: 'pi pi-info-circle'
  }
  return icons[props.type]
})

const close = () => {
  visible.value = false
  if (timer) {
    clearTimeout(timer)
  }
  setTimeout(() => {
    props.onClose?.()
  }, 300)
}

const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      close()
    }, props.duration)
  }
}

onMounted(() => {
  visible.value = true
  startTimer()
})

defineExpose({
  close
})
</script>

<style scoped>
.co-toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-width: 300px;
  max-width: 500px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border-left: 4px solid;
  margin-bottom: 12px;
}

.co-toast--success {
  border-left-color: #2ecc71;
}

.co-toast--error {
  border-left-color: #e74c3c;
}

.co-toast--warning {
  border-left-color: #f39c12;
}

.co-toast--info {
  border-left-color: #3498db;
}

.co-toast__icon {
  flex-shrink: 0;
  font-size: 20px;
}

.co-toast--success .co-toast__icon {
  color: #2ecc71;
}

.co-toast--error .co-toast__icon {
  color: #e74c3c;
}

.co-toast--warning .co-toast__icon {
  color: #f39c12;
}

.co-toast--info .co-toast__icon {
  color: #3498db;
}

.co-toast__content {
  flex: 1;
}

.co-toast__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 4px;
}

.co-toast__message {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.co-toast__close {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s ease;
  padding: 0;
}

.co-toast__close:hover {
  background: var(--hover-bg);
  color: var(--text-color);
}

/* 动画 */
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s ease;
}

.toast-slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-slide-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
</style>

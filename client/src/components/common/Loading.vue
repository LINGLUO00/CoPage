<template>
  <div class="co-loading" :class="loadingClasses">
    <div class="co-loading__spinner" :class="`co-loading__spinner--${type}`">
      <!-- 圆形加载器 -->
      <div v-if="type === 'circle'" class="spinner-circle">
        <div class="circle"></div>
      </div>

      <!-- 点状加载器 -->
      <div v-else-if="type === 'dots'" class="spinner-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- 脉冲加载器 -->
      <div v-else-if="type === 'pulse'" class="spinner-pulse">
        <div class="pulse"></div>
      </div>

      <!-- 条形加载器 -->
      <div v-else-if="type === 'bars'" class="spinner-bars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div v-if="text" class="co-loading__text">{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface LoadingProps {
  type?: 'circle' | 'dots' | 'pulse' | 'bars'
  size?: 'small' | 'medium' | 'large'
  text?: string
  fullscreen?: boolean
}

const props = withDefaults(defineProps<LoadingProps>(), {
  type: 'circle',
  size: 'medium',
  fullscreen: false
})

const loadingClasses = computed(() => {
  return [
    `co-loading--${props.size}`,
    {
      'co-loading--fullscreen': props.fullscreen
    }
  ]
})
</script>

<style scoped>
.co-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.co-loading--fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  z-index: 9999;
}

/* 尺寸 */
.co-loading--small .co-loading__spinner {
  width: 24px;
  height: 24px;
}

.co-loading--medium .co-loading__spinner {
  width: 40px;
  height: 40px;
}

.co-loading--large .co-loading__spinner {
  width: 60px;
  height: 60px;
}

.co-loading__text {
  font-size: 14px;
  color: var(--text-secondary);
}

/* 圆形加载器 */
.spinner-circle {
  width: 100%;
  height: 100%;
  position: relative;
}

.spinner-circle .circle {
  width: 100%;
  height: 100%;
  border: 3px solid rgba(102, 126, 234, 0.2);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 点状加载器 */
.spinner-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
}

.spinner-dots span {
  width: 8px;
  height: 8px;
  background: var(--primary-color);
  border-radius: 50%;
  animation: dots-bounce 1.4s infinite ease-in-out;
}

.spinner-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.spinner-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes dots-bounce {

  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }

  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 脉冲加载器 */
.spinner-pulse {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner-pulse .pulse {
  width: 60%;
  height: 60%;
  background: var(--primary-color);
  border-radius: 50%;
  animation: pulse 1.2s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(0.8);
    opacity: 0.5;
  }

  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 条形加载器 */
.spinner-bars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 100%;
}

.spinner-bars span {
  width: 4px;
  height: 100%;
  background: var(--primary-color);
  border-radius: 2px;
  animation: bars-stretch 1.2s ease-in-out infinite;
}

.spinner-bars span:nth-child(1) {
  animation-delay: -0.45s;
}

.spinner-bars span:nth-child(2) {
  animation-delay: -0.3s;
}

.spinner-bars span:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes bars-stretch {

  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }

  20% {
    transform: scaleY(1);
  }
}
</style>

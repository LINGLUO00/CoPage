<template>
  <Teleport to="body">
    <div class="co-toast-container">
      <component v-for="item in toasts" :key="item.id" :is="ToastComponent" v-bind="item.props"
        @close="removeToast(item.id)" />
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Toast, { type ToastProps } from './Toast.vue'

interface ToastItem {
  id: number
  props: ToastProps
}

const ToastComponent = Toast
const toasts = ref<ToastItem[]>([])
let toastId = 0

const addToast = (props: ToastProps) => {
  const id = toastId++
  toasts.value.push({
    id,
    props: {
      ...props,
      onClose: () => {
        props.onClose?.()
        removeToast(id)
      }
    }
  })
  return id
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex(item => item.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

defineExpose({
  addToast
})
</script>

<style scoped>
.co-toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  pointer-events: none;
}

.co-toast-container>* {
  pointer-events: auto;
}
</style>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="visible" class="co-modal-overlay" @click="handleOverlayClick">
        <Transition name="modal-slide">
          <div v-if="visible" class="co-modal" :class="modalClasses" @click.stop>
            <!-- 头部 -->
            <div class="co-modal__header">
              <slot name="header">
                <h3 class="co-modal__title">{{ title }}</h3>
              </slot>
              <button v-if="showClose" class="co-modal__close" @click="handleClose">
                <i class="pi pi-times"></i>
              </button>
            </div>

            <!-- 内容 -->
            <div class="co-modal__body">
              <slot></slot>
            </div>

            <!-- 底部 -->
            <div v-if="showFooter" class="co-modal__footer">
              <slot name="footer">
                <CoButton v-if="showCancel" type="secondary" @click="handleCancel">
                  {{ cancelText }}
                </CoButton>
                <CoButton :type="confirmType" :loading="confirmLoading" @click="handleConfirm">
                  {{ confirmText }}
                </CoButton>
              </slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import CoButton from './Button.vue'

interface ModalProps {
  visible?: boolean
  title?: string
  width?: string
  showClose?: boolean
  showFooter?: boolean
  showCancel?: boolean
  confirmText?: string
  cancelText?: string
  confirmType?: 'primary' | 'success' | 'danger' | 'warning'
  confirmLoading?: boolean
  closeOnClickOverlay?: boolean
  center?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  visible: false,
  title: '提示',
  width: '500px',
  showClose: true,
  showFooter: true,
  showCancel: true,
  confirmText: '确定',
  cancelText: '取消',
  confirmType: 'primary',
  confirmLoading: false,
  closeOnClickOverlay: true,
  center: false
})

const emit = defineEmits<{
  'update:visible': [value: boolean]
  close: []
  confirm: []
  cancel: []
}>()

const modalClasses = computed(() => {
  return {
    'co-modal--center': props.center
  }
})

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('update:visible', false)
  emit('cancel')
}

const handleOverlayClick = () => {
  if (props.closeOnClickOverlay) {
    handleClose()
  }
}

// 监听 visible 变化，控制 body 滚动
watch(() => props.visible, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.co-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.co-modal {
  background: white;
  border-radius: 12px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: v-bind(width);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.co-modal--center .co-modal__body {
  text-align: center;
}

/* 头部 */
.co-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}

.co-modal__title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.co-modal__close {
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
}

.co-modal__close:hover {
  background: var(--hover-bg);
  color: var(--text-color);
}

/* 内容 */
.co-modal__body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  color: var(--text-color);
  line-height: 1.6;
}

/* 底部 */
.co-modal__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
}

/* 动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.3s ease;
}

.modal-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.modal-slide-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>

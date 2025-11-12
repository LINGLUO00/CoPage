<template>
  <button class="co-button" :class="buttonClasses" :disabled="disabled || loading" @click="handleClick">
    <i v-if="loading" class="pi pi-spin pi-spinner"></i>
    <i v-else-if="icon" :class="icon"></i>
    <span v-if="$slots.default" class="button-text">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ButtonProps {
  type?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  icon?: string
  round?: boolean
  block?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  round: false,
  block: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  return [
    `co-button--${props.type}`,
    `co-button--${props.size}`,
    {
      'is-disabled': props.disabled,
      'is-loading': props.loading,
      'is-round': props.round,
      'is-block': props.block
    }
  ]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.co-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  outline: none;
}

.co-button:active {
  transform: translateY(1px);
}

/* 尺寸 */
.co-button--small {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 6px;
}

.co-button--medium {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 8px;
}

.co-button--large {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
}

/* 类型 - Primary */
.co-button--primary {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.co-button--primary:hover:not(.is-disabled):not(.is-loading) {
  background: var(--secondary-color);
  border-color: var(--secondary-color);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* 类型 - Secondary */
.co-button--secondary {
  background: transparent;
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.co-button--secondary:hover:not(.is-disabled):not(.is-loading) {
  background: var(--hover-bg);
  transform: translateY(-1px);
}

/* 类型 - Success */
.co-button--success {
  background: #2ecc71;
  color: white;
  border-color: #2ecc71;
}

.co-button--success:hover:not(.is-disabled):not(.is-loading) {
  background: #27ae60;
  border-color: #27ae60;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.3);
}

/* 类型 - Danger */
.co-button--danger {
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
}

.co-button--danger:hover:not(.is-disabled):not(.is-loading) {
  background: #c0392b;
  border-color: #c0392b;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.3);
}

/* 类型 - Warning */
.co-button--warning {
  background: #f39c12;
  color: white;
  border-color: #f39c12;
}

.co-button--warning:hover:not(.is-disabled):not(.is-loading) {
  background: #e67e22;
  border-color: #e67e22;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
}

/* 类型 - Text */
.co-button--text {
  background: transparent;
  color: var(--primary-color);
  border-color: transparent;
  padding: 4px 8px;
}

.co-button--text:hover:not(.is-disabled):not(.is-loading) {
  background: var(--hover-bg);
}

/* 状态 - Disabled */
.co-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 状态 - Loading */
.co-button.is-loading {
  cursor: wait;
  opacity: 0.8;
}

/* 形状 - Round */
.co-button.is-round {
  border-radius: 999px;
}

/* 布局 - Block */
.co-button.is-block {
  width: 100%;
  display: flex;
}

.button-text {
  display: inline-block;
}
</style>

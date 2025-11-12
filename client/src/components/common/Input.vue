<template>
  <div class="co-input" :class="inputWrapperClasses">
    <!-- 前缀图标 -->
    <span v-if="prefixIcon" class="co-input__prefix">
      <i :class="prefixIcon"></i>
    </span>

    <!-- 输入框 -->
    <input v-if="type !== 'textarea'" :type="type" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
      :readonly="readonly" :maxlength="maxlength" class="co-input__inner" @input="handleInput" @focus="handleFocus"
      @blur="handleBlur" @change="handleChange" />

    <!-- 文本域 -->
    <textarea v-else :value="modelValue" :placeholder="placeholder" :disabled="disabled" :readonly="readonly"
      :maxlength="maxlength" :rows="rows" class="co-input__textarea" @input="handleInput" @focus="handleFocus"
      @blur="handleBlur" @change="handleChange"></textarea>

    <!-- 后缀图标 -->
    <span v-if="suffixIcon || showClear || showPassword" class="co-input__suffix">
      <!-- 清除按钮 -->
      <i v-if="showClear && modelValue && !disabled" class="pi pi-times co-input__clear" @click="handleClear"></i>

      <!-- 密码显示/隐藏 -->
      <i v-else-if="showPassword" :class="passwordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'" class="co-input__password"
        @click="togglePassword"></i>

      <!-- 自定义后缀图标 -->
      <i v-else-if="suffixIcon" :class="suffixIcon"></i>
    </span>

    <!-- 字数统计 -->
    <span v-if="showWordLimit && maxlength" class="co-input__count">
      {{ String(modelValue).length }} / {{ maxlength }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'textarea'
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  showPassword?: boolean
  prefixIcon?: string
  suffixIcon?: string
  size?: 'small' | 'medium' | 'large'
  maxlength?: number
  showWordLimit?: boolean
  rows?: number
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '请输入',
  disabled: false,
  readonly: false,
  clearable: false,
  showPassword: false,
  size: 'medium',
  rows: 3
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  input: [value: string | number]
  change: [value: string | number]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}>()

const isFocused = ref(false)
const passwordVisible = ref(false)
const currentType = ref(props.type)

const inputWrapperClasses = computed(() => {
  return [
    `co-input--${props.size}`,
    {
      'is-disabled': props.disabled,
      'is-focused': isFocused.value,
      'co-input--prefix': props.prefixIcon,
      'co-input--suffix': props.suffixIcon || showClear.value || props.showPassword,
      'co-input--textarea': props.type === 'textarea'
    }
  ]
})

const showClear = computed(() => {
  return props.clearable && !props.readonly && !props.disabled
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  let value: string | number = target.value

  if (props.type === 'number') {
    value = value === '' ? '' : Number(value)
  }

  emit('update:modelValue', value)
  emit('input', value)
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  let value: string | number = target.value

  if (props.type === 'number') {
    value = value === '' ? '' : Number(value)
  }

  emit('change', value)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value
  currentType.value = passwordVisible.value ? 'text' : 'password'
}
</script>

<style scoped>
.co-input {
  position: relative;
  display: inline-flex;
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;
}

.co-input:hover:not(.is-disabled) {
  border-color: var(--primary-color);
}

.co-input.is-focused {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.co-input.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.05);
}

/* 尺寸 */
.co-input--small .co-input__inner,
.co-input--small .co-input__textarea {
  padding: 6px 12px;
  font-size: 12px;
}

.co-input--medium .co-input__inner,
.co-input--medium .co-input__textarea {
  padding: 8px 14px;
  font-size: 14px;
}

.co-input--large .co-input__inner,
.co-input--large .co-input__textarea {
  padding: 10px 16px;
  font-size: 16px;
}

/* 输入框本体 */
.co-input__inner,
.co-input__textarea {
  flex: 1;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-color);
  font-family: inherit;
}

.co-input__inner::placeholder,
.co-input__textarea::placeholder {
  color: var(--text-secondary);
}

.co-input__textarea {
  resize: vertical;
  line-height: 1.5;
}

.co-input.is-disabled .co-input__inner,
.co-input.is-disabled .co-input__textarea {
  cursor: not-allowed;
}

/* 前缀和后缀 */
.co-input__prefix,
.co-input__suffix {
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: var(--text-secondary);
}

.co-input--prefix .co-input__inner {
  padding-left: 0;
}

.co-input--suffix .co-input__inner {
  padding-right: 0;
}

/* 清除按钮和密码图标 */
.co-input__clear,
.co-input__password {
  cursor: pointer;
  transition: color 0.2s ease;
  font-size: 14px;
}

.co-input__clear:hover,
.co-input__password:hover {
  color: var(--primary-color);
}

/* 字数统计 */
.co-input--textarea {
  flex-direction: column;
  align-items: stretch;
}

.co-input__count {
  padding: 4px 12px;
  font-size: 12px;
  color: var(--text-secondary);
  text-align: right;
  border-top: 1px solid var(--border-color);
  background: rgba(0, 0, 0, 0.01);
}
</style>

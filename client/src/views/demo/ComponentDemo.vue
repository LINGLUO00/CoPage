<template>
  <div class="component-demo">
    <div class="demo-container">
      <section class="demo-section">
        <h2>按钮组件 Button</h2>

        <div class="demo-group">
          <h4>类型</h4>
          <div class="demo-row">
            <CoButton type="primary">Primary</CoButton>
            <CoButton type="secondary">Secondary</CoButton>
            <CoButton type="success">Success</CoButton>
            <CoButton type="danger">Danger</CoButton>
            <CoButton type="warning">Warning</CoButton>
            <CoButton type="text">Text</CoButton>
          </div>
        </div>

        <div class="demo-group">
          <h4>尺寸</h4>
          <div class="demo-row">
            <CoButton size="small">Small</CoButton>
            <CoButton size="medium">Medium</CoButton>
            <CoButton size="large">Large</CoButton>
          </div>
        </div>

        <div class="demo-group">
          <h4>带图标</h4>
          <div class="demo-row">
            <CoButton icon="pi pi-check">确认</CoButton>
            <CoButton icon="pi pi-times" type="danger">取消</CoButton>
            <CoButton icon="pi pi-search" type="secondary">搜索</CoButton>
            <CoButton icon="pi pi-plus" type="success">新建</CoButton>
          </div>
        </div>

        <div class="demo-group">
          <h4>圆角和块级</h4>
          <div class="demo-row">
            <CoButton round>圆角按钮</CoButton>
            <CoButton round icon="pi pi-heart" type="danger">喜欢</CoButton>
          </div>
          <div class="demo-row">
            <CoButton block>块级按钮</CoButton>
          </div>
        </div>

        <div class="demo-group">
          <h4>状态</h4>
          <div class="demo-row">
            <CoButton disabled>禁用按钮</CoButton>
            <CoButton loading>加载中</CoButton>
            <CoButton :loading="isLoading" @click="handleLoadingClick">
              点击测试加载
            </CoButton>
          </div>
        </div>
      </section>

      <section class="demo-section">
        <h2>输入框组件 Input</h2>

        <div class="demo-group">
          <h4>基础用法</h4>
          <div class="demo-column">
            <CoInput v-model="inputValue1" placeholder="请输入内容" />
            <p class="demo-text">输入的值: {{ inputValue1 }}</p>
          </div>
        </div>

        <div class="demo-group">
          <h4>尺寸</h4>
          <div class="demo-column">
            <CoInput v-model="inputValue2" size="small" placeholder="小尺寸" />
            <CoInput v-model="inputValue2" size="medium" placeholder="中尺寸" />
            <CoInput v-model="inputValue2" size="large" placeholder="大尺寸" />
          </div>
        </div>

        <div class="demo-group">
          <h4>带图标</h4>
          <div class="demo-column">
            <CoInput v-model="inputValue3" prefix-icon="pi pi-search" placeholder="搜索" />
            <CoInput v-model="inputValue3" suffix-icon="pi pi-calendar" placeholder="选择日期" />
          </div>
        </div>

        <div class="demo-group">
          <h4>可清空</h4>
          <div class="demo-column">
            <CoInput v-model="inputValue1" clearable placeholder="可清空的输入框" />
          </div>
        </div>

        <div class="demo-group">
          <h4>密码框</h4>
          <div class="demo-column">
            <CoInput v-model="inputValue2" type="password" show-password placeholder="请输入密码" />
          </div>
        </div>

        <div class="demo-group">
          <h4>文本域</h4>
          <div class="demo-column">
            <CoInput v-model="textareaValue" type="textarea" placeholder="请输入多行文本" :rows="4" />
            <CoInput v-model="textareaValue" type="textarea" placeholder="带字数限制的文本域" :maxlength="100" show-word-limit
              :rows="4" />
          </div>
        </div>

        <div class="demo-group">
          <h4>禁用和只读</h4>
          <div class="demo-column">
            <CoInput model-value="禁用状态" disabled placeholder="禁用" />
            <CoInput model-value="只读状态" readonly placeholder="只读" />
          </div>
        </div>
      </section>
      <section class="demo-section">
        <h2>模态框组件 Modal</h2>

        <div class="demo-group">
          <h4>基础用法</h4>
          <div class="demo-row">
            <CoButton @click="showModal1 = true">打开模态框</CoButton>
          </div>
        </div>

        <div class="demo-group">
          <h4>自定义内容</h4>
          <div class="demo-row">
            <CoButton @click="showModal2 = true">自定义内容</CoButton>
          </div>
        </div>

        <div class="demo-group">
          <h4>不同类型</h4>
          <div class="demo-row">
            <CoButton type="success" @click="showModal3 = true">成功提示</CoButton>
            <CoButton type="danger" @click="showModal4 = true">危险操作</CoButton>
          </div>
        </div>

        <!-- 模态框实例 -->
        <CoModal v-model:visible="showModal1" title="基础模态框">
          <p>这是一个基础的模态框组件。</p>
          <p>你可以在这里放置任何内容。</p>
        </CoModal>

        <CoModal v-model:visible="showModal2" title="自定义内容" width="600px">
          <div style="padding: 20px 0;">
            <h4 style="margin-bottom: 12px;">这是自定义的内容</h4>
            <CoInput placeholder="在模态框中输入内容" style="margin-bottom: 12px;" />
            <CoInput type="textarea" placeholder="多行文本输入" :rows="4" />
          </div>
        </CoModal>

        <CoModal v-model:visible="showModal3" title="操作成功" confirm-type="success" :show-cancel="false" center>
          <div style="padding: 20px 0;">
            <i class="pi pi-check-circle" style="font-size: 48px; color: #2ecc71;"></i>
            <p style="margin-top: 16px; font-size: 16px;">操作已成功完成！</p>
          </div>
        </CoModal>

        <CoModal v-model:visible="showModal4" title="危险操作" confirm-type="danger" confirm-text="删除"
          :confirm-loading="modalLoading" @confirm="handleModalConfirm">
          <p>此操作将永久删除该文件，是否继续？</p>
        </CoModal>
      </section>
      <section class="demo-section">
        <h2>消息提示组件 Toast</h2>

        <div class="demo-group">
          <h4>不同类型</h4>
          <div class="demo-row">
            <CoButton type="success" @click="showSuccessToast">成功消息</CoButton>
            <CoButton type="danger" @click="showErrorToast">错误消息</CoButton>
            <CoButton type="warning" @click="showWarningToast">警告消息</CoButton>
            <CoButton @click="showInfoToast">普通消息</CoButton>
          </div>
        </div>

        <div class="demo-group">
          <h4>自定义配置</h4>
          <div class="demo-row">
            <CoButton @click="showCustomToast">自定义持续时间</CoButton>
          </div>
        </div>

        <div class="demo-info">
          <p><strong>使用方法：</strong></p>
          <pre><code>import { useToast } from '@/composables/useToast'

              const toast = useToast()

              // 显示成功消息
              toast.success('操作成功', '成功')

              // 显示错误消息
              toast.error('操作失败', '错误')

              // 显示警告消息
              toast.warning('请注意', '警告')

              // 显示普通消息
              toast.info('提示信息')</code></pre>
        </div>
      </section>
      <section class="demo-section">
        <h2>加载动画组件 Loading</h2>

        <div class="demo-group">
          <h4>不同类型</h4>
          <div class="demo-row">
            <div class="loading-demo-item">
              <CoLoading type="circle" />
              <span>Circle</span>
            </div>
            <div class="loading-demo-item">
              <CoLoading type="dots" />
              <span>Dots</span>
            </div>
            <div class="loading-demo-item">
              <CoLoading type="pulse" />
              <span>Pulse</span>
            </div>
            <div class="loading-demo-item">
              <CoLoading type="bars" />
              <span>Bars</span>
            </div>
          </div>
        </div>

        <div class="demo-group">
          <h4>不同尺寸</h4>
          <div class="demo-row">
            <div class="loading-demo-item">
              <CoLoading size="small" text="小" />
            </div>
            <div class="loading-demo-item">
              <CoLoading size="medium" text="中" />
            </div>
            <div class="loading-demo-item">
              <CoLoading size="large" text="大" />
            </div>
          </div>
        </div>

        <div class="demo-group">
          <h4>带文字</h4>
          <div class="demo-row">
            <div class="loading-demo-item">
              <CoLoading type="circle" text="加载中..." />
            </div>
            <div class="loading-demo-item">
              <CoLoading type="dots" text="请稍候..." />
            </div>
          </div>
        </div>

        <div class="demo-group">
          <h4>全屏加载</h4>
          <div class="demo-row">
            <CoButton @click="showFullscreenLoading">显示全屏加载</CoButton>
            <CoButton type="secondary" @click="showCustomLoading('dots')">Dots 加载</CoButton>
            <CoButton type="secondary" @click="showCustomLoading('pulse')">Pulse 加载</CoButton>
            <CoButton type="secondary" @click="showCustomLoading('bars')">Bars 加载</CoButton>
          </div>
        </div>

        <div class="demo-group">
          <h4>局部加载</h4>
          <div class="demo-row">
            <CoButton @click="showLocalLoading">显示局部加载</CoButton>
          </div>
          <div v-if="localLoading" class="local-loading-container">
            <CoLoading type="circle" text="加载中..." />
          </div>
          <div v-else class="local-loading-container">
            <p>点击按钮查看局部加载效果</p>
          </div>
        </div>

        <div class="demo-info">
          <p><strong>使用方法：</strong></p>
          <pre><code>// 全屏加载
              import { useLoading } from '@/composables/useLoading'

              const loading = useLoading()

              // 显示加载
              loading.show({ text: '加载中...', type: 'circle' })

              // 隐藏加载
              loading.hide()

              // 局部加载（在模板中使用）
              &lt;CoLoading type="circle" text="加载中..." /&gt;</code></pre>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CoButton from '@/components/common/Button.vue'
import CoInput from '@/components/common/Input.vue'
import CoModal from '@/components/common/Modal.vue'
import { useToast } from '@/composables/useToast'
import CoLoading from '@/components/common/Loading.vue'
import { useLoading } from '@/composables/useLoading'

const loading = useLoading()
const localLoading = ref(false)

const showFullscreenLoading = () => {
  loading.show({ text: '加载中...', type: 'circle' })
  setTimeout(() => {
    loading.hide()
  }, 3000)
}

const showCustomLoading = (type: 'circle' | 'dots' | 'pulse' | 'bars') => {
  loading.show({ text: '请稍候...', type })
  setTimeout(() => {
    loading.hide()
  }, 2000)
}

const showLocalLoading = () => {
  localLoading.value = true
  setTimeout(() => {
    localLoading.value = false
  }, 3000)
}
const toast = useToast()

const showSuccessToast = () => {
  toast.success('操作成功！', '成功提示')
}

const showErrorToast = () => {
  toast.error('操作失败，请重试', '错误提示')
}

const showWarningToast = () => {
  toast.warning('请注意检查输入内容', '警告')
}

const showInfoToast = () => {
  toast.info('这是一条普通消息')
}

const showCustomToast = () => {
  toast.show({
    type: 'success',
    message: '这是一个自定义持续时间的消息，5秒后自动关闭',
    duration: 5000,
    showClose: true
  })
}
const showModal1 = ref(false)
const showModal2 = ref(false)
const showModal3 = ref(false)
const showModal4 = ref(false)
const modalLoading = ref(false)

const handleModalConfirm = () => {
  modalLoading.value = true
  setTimeout(() => {
    modalLoading.value = false
    showModal4.value = false
  }, 2000)
}
const inputValue1 = ref('')
const inputValue2 = ref('')
const inputValue3 = ref('')
const textareaValue = ref('')
const isLoading = ref(false)

const handleLoadingClick = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}
</script>

<style scoped>
.component-demo {
  width: 100%;
  height: 100%;
  padding: 24px;
  overflow-y: auto;
}

.demo-container {
  max-width: 1200px;
  margin: 0 auto;
}

.demo-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.demo-section h2 {
  font-size: 24px;
  margin-bottom: 24px;
  color: var(--text-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 12px;
}

.demo-group {
  margin-bottom: 24px;
}

.demo-group h4 {
  font-size: 16px;
  margin-bottom: 12px;
  color: var(--text-color);
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-text {
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0;
}

.demo-info {
  background: rgba(102, 126, 234, 0.05);
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
}

.demo-info p {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: var(--text-color);
}

.demo-info pre {
  margin: 0;
  padding: 12px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  overflow-x: auto;
}

.demo-info code {
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 12px;
  color: var(--text-color);
  line-height: 1.6;
}

.loading-demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  min-width: 120px;
}

.loading-demo-item span {
  font-size: 13px;
  color: var(--text-secondary);
}

.local-loading-container {
  margin-top: 16px;
  padding: 40px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 150px;
}

.local-loading-container p {
  color: var(--text-secondary);
  margin: 0;
}
</style>

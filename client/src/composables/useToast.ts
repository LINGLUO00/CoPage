import { createApp, h } from 'vue'
import ToastContainer from '@/components/common/ToastContainer.vue'
import type { ToastProps } from '@/components/common/Toast.vue'

let toastInstance: any = null

const getToastInstance = () => {
  if (!toastInstance) {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const app = createApp({
      render() {
        return h(ToastContainer, { ref: 'toast' })
      }
    })

    const vm = app.mount(container)
    toastInstance = (vm as any).$refs.toast
  }
  return toastInstance
}

export const useToast = () => {
  const show = (props: ToastProps) => {
    const instance = getToastInstance()
    return instance.addToast(props)
  }

  const success = (message: string, title?: string) => {
    return show({ type: 'success', message, title })
  }

  const error = (message: string, title?: string) => {
    return show({ type: 'error', message, title })
  }

  const warning = (message: string, title?: string) => {
    return show({ type: 'warning', message, title })
  }

  const info = (message: string, title?: string) => {
    return show({ type: 'info', message, title })
  }

  return {
    show,
    success,
    error,
    warning,
    info
  }
}

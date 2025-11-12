import { createApp, h, ref } from 'vue'
import Loading from '@/components/common/Loading.vue'

interface LoadingOptions {
  text?: string
  type?: 'circle' | 'dots' | 'pulse' | 'bars'
  size?: 'small' | 'medium' | 'large'
}

let loadingInstance: any = null
let loadingCount = 0

export const useLoading = () => {
  const show = (options: LoadingOptions = {}) => {
    loadingCount++

    if (!loadingInstance) {
      const container = document.createElement('div')
      document.body.appendChild(container)

      const app = createApp({
        setup() {
          const visible = ref(true)
          const loadingProps = ref({
            fullscreen: true,
            ...options
          })

          return () => visible.value ? h(Loading, loadingProps.value) : null
        }
      })

      loadingInstance = {
        vm: app.mount(container),
        app,
        container
      }
    }
  }

  const hide = () => {
    loadingCount--

    if (loadingCount <= 0 && loadingInstance) {
      loadingCount = 0
      loadingInstance.app.unmount()
      document.body.removeChild(loadingInstance.container)
      loadingInstance = null
    }
  }

  return {
    show,
    hide
  }
}

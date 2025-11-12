import { defineStore } from 'pinia'
import { ref } from 'vue'


export type PanelType = 'files' | 'ai' | 'chat' | 'settings' | null
export const useLayoutStore = defineStore('layout', () => {
  const showTopBar = ref(true)
  const showSideBar = ref(true)

  const middlePanelType = ref<PanelType>(null)

  const toggleTopBar = () => {
    showTopBar.value = !showTopBar.value
  }
  const toggleSideBar = () => {
    showSideBar.value = !showSideBar.value
  }

  const toggleMiddlePanel = (panelType: PanelType) => {
    if (middlePanelType.value === panelType) {
      middlePanelType.value = null
    } else {
      middlePanelType.value = panelType
    }
  }

  return {
    showTopBar,
    showSideBar,
    middlePanelType,
    toggleTopBar,
    toggleSideBar,
    toggleMiddlePanel
  }

})

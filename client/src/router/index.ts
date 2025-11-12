import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/HomeView.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: { title: '注册', requiresAuth: false }
  },
  {
    path: '/documents',
    name: 'DocumentList',
    component: () => import('@/views/document/DocumentListView.vue'),
    meta: { title: '文档列表', requiresAuth: true }
  },
  {
    path: '/editor/:id',
    name: 'Editor',
    component: () => import('@/views/editor/EditorView.vue'),
    meta: { title: '编辑器', requiresAuth: true }
  },
  {
    path: '/demo',
    name: 'ComponentDemo',
    component: () => import('@/views/demo/ComponentDemo.vue'),
    meta: { title: '组件演示' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫（后续会完善）
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'CoPage'} - 多人在线协作编辑`
  next()
})

export default router

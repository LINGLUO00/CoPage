this is the front-end of CoPage using vue3
src/                                   # Vue3 前端源码
├── assets/                            # 静态资源
│   ├── styles/
│   │   ├── main.css
│   │   ├── variables.css             # CSS 变量
│   │   ├── frosted-glass.css         # 毛玻璃效果
│   │   └── themes/
│   │       ├── light.css
│   │       └── dark.css
│   ├── images/
│   │   ├── logo.svg
│   │   ├── backgrounds/
│   │   └── illustrations/
│   ├── icons/
│   │   └── *.svg
│   └── fonts/
│       └── custom-fonts.woff2
│
├── components/                        # Vue 组件
│   ├── layout/                        # 布局组件
│   │   ├── AppLayout.vue
│   │   ├── TopBar.vue
│   │   ├── SideBar.vue
│   │   └── FloatingTrigger.vue
│   ├── editor/                        # 编辑器组件
│   │   ├── RichEditor.vue             # 富文本编辑器
│   │   ├── Toolbar.vue                # 工具栏
│   │   ├── CollaborativeCursor.vue    # 协作光标
│   │   └── CommentThread.vue          # 评论线程
│   ├── document/                      # 文档组件
│   │   ├── DocumentCard.vue
│   │   ├── DocumentTree.vue
│   │   ├── VersionHistory.vue
│   │   └── ShareDialog.vue
│   ├── chat/                          # 聊天组件
│   │   ├── ChatPanel.vue
│   │   ├── MessageBubble.vue
│   │   └── UserTyping.vue
│   ├── user/                          # 用户组件
│   │   ├── UserAvatar.vue
│   │   ├── OnlineUsers.vue
│   │   └── UserProfile.vue
│   └── common/                        # 通用组件
│       ├── Button.vue
│       ├── Input.vue
│       ├── Modal.vue
│       ├── Loading.vue
│       └── Toast.vue
│
├── views/                             # 页面视图
│   ├── auth/
│   │   ├── LoginView.vue              # 登录页
│   │   ├── RegisterView.vue           # 注册页
│   │   └── ForgotPasswordView.vue     # 忘记密码
│   ├── document/
│   │   ├── DocumentListView.vue       # 文档列表
│   │   ├── DocumentDetailView.vue     # 文档详情
│   │   └── DocumentSearchView.vue     # 文档搜索
│   ├── editor/
│   │   └── EditorView.vue             # 编辑器页面
│   ├── settings/
│   │   ├── SettingsView.vue           # 设置主页
│   │   ├── ProfileSettings.vue        # 个人资料
│   │   ├── AppearanceSettings.vue     # 外观设置
│   │   └── LayoutSettings.vue         # 布局设置
│   └── home/
│       └── HomeView.vue               # 主页/欢迎页
│
├── stores/                            # Pinia 状态管理
│   ├── index.ts                       # Store 统一导出
│   ├── auth.ts                        # 认证状态
│   ├── user.ts                        # 用户状态
│   ├── document.ts                    # 文档状态
│   ├── editor.ts                      # 编辑器状态
│   ├── collaboration.ts               # 协作状态
│   ├── chat.ts                        # 聊天状态
│   ├── layout.ts                      # 布局状态
│   └── notification.ts                # 通知状态
│
├── composables/                       # 组合式函数（Hooks）
│   ├── useAuth.ts                     # 认证相关
│   ├── useWebSocket.ts                # WebSocket 连接
│   ├── useCollaboration.ts            # 实时协作
│   ├── useKeyboardShortcuts.ts        # 快捷键
│   ├── useLocalStorage.ts             # 本地存储
│   └── useTheme.ts                    # 主题切换
│
├── services/                          # 服务层
│   ├── api/                           # HTTP API 调用
│   │   ├── index.ts                   # Axios 配置
│   │   ├── auth.api.ts                # 认证 API
│   │   ├── user.api.ts                # 用户 API
│   │   ├── document.api.ts            # 文档 API
│   │   └── chat.api.ts                # 聊天 API
│   ├── websocket/                     # WebSocket 服务
│   │   ├── index.ts                   # WebSocket 管理
│   │   ├── collaboration.ws.ts        # 协作 WebSocket
│   │   └── chat.ws.ts                 # 聊天 WebSocket
│   └── tauri/                         # Tauri 本地功能
│       ├── index.ts
│       ├── file.ts                    # 文件操作
│       ├── dialog.ts                  # 对话框
│       └── window.ts                  # 窗口管理
│
├── types/                             # TypeScript 类型定义
│   ├── index.ts
│   ├── user.ts
│   ├── document.ts
│   ├── editor.ts
│   ├── chat.ts
│   └── api.ts
│
├── utils/                             # 工具函数
│   ├── format.ts                      # 格式化
│   ├── validation.ts                  # 验证
│   ├── date.ts                        # 日期处理
│   └── crypto.ts                      # 加密/解密
│
├── router/                            # Vue Router
│   ├── index.ts                       # 路由配置
│   ├── guards.ts                      # 路由守卫
│   └── routes/
│       ├── auth.ts
│       ├── document.ts
│       └── editor.ts
│
├── plugins/                           # Vue 插件
│   ├── primevue.ts                    # PrimeVue 配置
│   └── i18n.ts                        # 国际化
│
├── App.vue                            # 根组件
├── main.ts                            # 入口文件
└── env.d.ts                           # 环境变量类型

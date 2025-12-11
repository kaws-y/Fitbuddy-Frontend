# FitBuddy Pro Frontend

基于 uni-app (Vue 3 + Vite + TypeScript) 的跨平台前端应用。

## 技术栈

- **框架**: uni-app 3.x
- **UI 框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5.x
- **语言**: TypeScript
- **状态管理**: Pinia
- **样式**: SCSS (可选)

## 项目结构

```
frontend/
├── src/
│   ├── pages/              # 页面
│   │   ├── index/          # 首页/聊天页
│   │   ├── auth/           # 认证页面（登录/注册）
│   │   ├── training/       # 训练计划页面
│   │   ├── nutrition/      # 营养计划页面
│   │   ├── progress/       # 进度跟踪页面
│   │   └── user/           # 用户中心页面
│   ├── components/         # 可复用组件
│   ├── composables/        # 组合式函数
│   ├── stores/             # Pinia 状态管理
│   ├── utils/              # 工具函数
│   ├── api/                # API 调用
│   ├── static/             # 静态资源
│   ├── App.vue             # 应用入口组件
│   ├── main.ts             # 应用入口文件
│   ├── pages.json          # 页面路由配置
│   └── manifest.json       # 应用配置
├── index.html              # H5 入口
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── package.json            # 项目依赖
```

## 开发指南

### 安装依赖

```bash
cd frontend
npm install
```

### 开发模式

```bash
# H5 开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin

# App 开发
npm run dev:app
```

### 构建

```bash
# 构建 H5
npm run build:h5

# 构建微信小程序
npm run build:mp-weixin

# 构建 Android App
npm run build:app-android

# 构建 iOS App
npm run build:app-ios
```

### 类型检查

```bash
npm run type-check
```

## 支持平台

- ✅ H5 (浏览器)
- ✅ 微信小程序
- ✅ Android App
- ✅ iOS App
- ⚠️ 其他小程序平台（需要额外配置）

## 环境变量

在 `.env.development` 和 `.env.production` 中配置：

- `VITE_API_BASE_URL`: 后端 API 地址
- `VITE_APP_TITLE`: 应用标题

## 开发规范

### 组件命名

- 页面组件：使用 kebab-case，如 `user-profile.vue`
- 通用组件：使用 PascalCase，如 `ChatMessage.vue`

### 样式单位

- 使用 `rpx` 作为响应式单位（750rpx = 屏幕宽度）
- 字体大小建议：28-32rpx（正文），48-56rpx（标题）

### API 调用

- 统一使用 `uni.request` 封装
- 添加请求拦截器处理认证
- 添加响应拦截器处理错误

### 状态管理

- 使用 Pinia 管理全局状态
- 每个功能模块创建独立的 store
- 使用 Composition API 风格

## 注意事项

1. **跨平台兼容性**：不同平台的 API 和组件可能有差异，使用条件编译处理
2. **性能优化**：避免过度渲染，使用 `v-show` 代替 `v-if`（频繁切换时）
3. **网络请求**：添加 loading 状态和错误处理
4. **用户体验**：提供友好的错误提示和加载反馈

## 相关文档

- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [Vue 3 文档](https://cn.vuejs.org/)
- [Vite 文档](https://cn.vitejs.dev/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)

# 我的数字动物寓所

这是一个温馨可爱的动物主题个人网站，展示你对动物的热爱和个性。

## 功能特性

- **首页**：欢迎动画、动物朋友展示、最新动态
- **动物相册**：分类浏览、照片故事、点赞互动
- **动物故事**：博客文章、评论互动
- **关于我**：个人介绍、联系方式
- **管理后台**：内容管理（添加/编辑/删除动物、照片、故事）

## 技术栈

- **前端**：React, Tailwind CSS, Framer Motion
- **后端**：Express.js
- **数据存储**：本地 JSON 文件

## 快速开始

1. **安装依赖**

```bash
npm install
```

2. **启动开发服务器**

```bash
npm run dev
```

这将同时启动前端（http://localhost:5173）和后端 API 服务（http://localhost:3001）。

## 管理后台

访问 `/admin` 路径即可进入管理后台。
默认管理员密码：`admin123`

## 项目结构

- `src/`：前端源代码
  - `components/`：UI 组件
  - `pages/`：页面组件
  - `contexts/`：React Context 状态管理
  - `hooks/`：自定义 Hooks
  - `types/`：TypeScript 类型定义
- `api/`：后端源代码
  - `routes/`：API 路由
  - `data/`：JSON 数据文件

## 贡献

欢迎提交 Pull Request 或 Issue！

## 许可证

MIT

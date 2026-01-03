# Fusions - BSC USDT Staking Platform

一个现代化的去中心化 USDT 质押平台，运行在 BSC (Binance Smart Chain) 链上。

## 功能特性

- 🔐 钱包连接（支持 MetaMask）
- 💰 USDT 质押功能
- 📊 实时数据统计
- 🎨 现代化科技感 UI 设计
- ⚡ 流畅的动画效果
- 🔒 安全的智能合约交互

## 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Ethers.js** - 以太坊/BSC 交互
- **Framer Motion** - 动画库
- **Lucide React** - 图标库

## 安装和运行

### 前置要求

- Node.js 16+ 
- npm 或 yarn
- MetaMask 浏览器扩展

### 安装依赖

```bash
cd frontend
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## 项目结构

```
frontend/
├── src/
│   ├── components/      # React 组件
│   │   ├── Header.jsx
│   │   ├── WalletConnect.jsx
│   │   ├── StakingPanel.jsx
│   │   └── StatsPanel.jsx
│   ├── hooks/          # 自定义 Hooks
│   │   └── useWallet.js
│   ├── App.jsx         # 主应用组件
│   ├── main.jsx        # 入口文件
│   └── index.css       # 全局样式
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 配置说明

### BSC 网络配置

应用默认连接到 BSC 主网。如果需要切换到测试网，请修改 `src/hooks/useWallet.js` 中的网络配置。

### 智能合约地址

在 `src/components/StakingPanel.jsx` 中配置：
- `USDT_CONTRACT_ADDRESS`: BSC 主网 USDT 合约地址
- `STAKING_CONTRACT_ADDRESS`: 质押合约地址（需要部署后更新）

## 部署到 Vercel

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 Vercel 中导入项目
3. 配置构建命令：`npm run build`
4. 配置输出目录：`dist`
5. 添加自定义域名：fusions.cc

## 注意事项

- 确保智能合约已部署并经过审计
- 更新 `STAKING_CONTRACT_ADDRESS` 为实际部署的合约地址
- 在生产环境使用前，请充分测试所有功能
- 建议进行安全审计

## 许可证

MIT


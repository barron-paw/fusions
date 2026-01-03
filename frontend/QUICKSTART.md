# 快速开始指南

## 第一步：安装依赖

```bash
cd frontend
npm install
```

## 第二步：启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

## 第三步：连接钱包

1. 确保已安装 MetaMask 浏览器扩展
2. 点击"连接钱包"按钮
3. 在 MetaMask 中确认连接
4. 如果不在 BSC 主网，系统会自动提示切换网络

## 第四步：配置智能合约

在部署智能合约后，需要更新以下文件中的合约地址：

**文件**: `src/components/StakingPanel.jsx`

```javascript
// 更新质押合约地址
const STAKING_CONTRACT_ADDRESS = '你的质押合约地址'
```

## 部署到 Vercel

1. 将代码推送到 Git 仓库
2. 访问 https://vercel.com
3. 导入项目
4. Vercel 会自动检测 Vite 项目
5. 点击部署
6. 在设置中添加自定义域名：fusions.cc

## 注意事项

- 确保智能合约已部署到 BSC 主网
- 更新 `STAKING_CONTRACT_ADDRESS` 为实际合约地址
- 在生产环境部署前进行充分测试


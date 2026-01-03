# 如何将前端代码上传到 GitHub

## 方法一：使用 Git 命令行（推荐）

### 前提条件
1. 确保已安装 Git：https://git-scm.com/downloads
2. 确保已在 GitHub 创建仓库（名称：fusions）

### 步骤

#### 1. 打开终端/命令行
在项目根目录（`D:\fusions\frontend`）打开 PowerShell 或 CMD

#### 2. 初始化 Git 仓库
```bash
git init
```

#### 3. 添加所有文件
```bash
git add .
```

#### 4. 提交代码
```bash
git commit -m "Initial commit: Fusions frontend"
```

#### 5. 添加远程仓库
将 `barron-paw` 替换为你的 GitHub 用户名：
```bash
git remote add origin https://github.com/barron-paw/fusions.git
```

#### 6. 推送到 GitHub
```bash
git branch -M main
git push -u origin main
```

如果遇到认证问题，可能需要：
- 使用 Personal Access Token 代替密码
- 或使用 SSH 方式连接

---

## 方法二：使用 GitHub Desktop（图形界面）

### 步骤

1. **下载 GitHub Desktop**
   - 访问：https://desktop.github.com/
   - 下载并安装

2. **登录 GitHub 账户**
   - 打开 GitHub Desktop
   - 登录你的 GitHub 账户

3. **添加本地仓库**
   - 点击 `File` → `Add Local Repository`
   - 选择 `D:\fusions\frontend` 目录
   - 如果目录不是 Git 仓库，会提示初始化

4. **提交代码**
   - 在左侧看到所有更改的文件
   - 在底部输入提交信息：`Initial commit: Fusions frontend`
   - 点击 `Commit to main`

5. **发布到 GitHub**
   - 点击 `Publish repository`
   - 选择仓库名称：`fusions`
   - 选择是否公开（Public/Private）
   - 点击 `Publish Repository`

---

## 方法三：使用 VS Code 的 Git 功能

### 步骤

1. **打开项目**
   - 在 VS Code 中打开 `D:\fusions\frontend` 目录

2. **初始化 Git**
   - 按 `Ctrl + Shift + P` 打开命令面板
   - 输入 `Git: Initialize Repository`
   - 选择当前文件夹

3. **提交代码**
   - 点击左侧源代码管理图标（或按 `Ctrl + Shift + G`）
   - 点击 `+` 号暂存所有更改
   - 输入提交信息：`Initial commit: Fusions frontend`
   - 点击 `✓` 提交

4. **推送到 GitHub**
   - 点击 `...` 菜单
   - 选择 `Publish to GitHub`
   - 输入仓库名称：`fusions`
   - 选择是否公开
   - 点击 `Publish`

---

## 常见问题

### 1. 认证失败
如果推送时提示认证失败，需要：
- 生成 Personal Access Token：https://github.com/settings/tokens
- 使用 Token 代替密码

### 2. 仓库已存在文件
如果 GitHub 仓库已经有 README 文件，需要先拉取：
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### 3. 忽略 node_modules
确保 `.gitignore` 文件包含：
```
node_modules
dist
```

---

## 上传后的下一步

1. **在 Vercel 中部署**
   - 访问 https://vercel.com
   - 导入 GitHub 仓库
   - 自动部署

2. **配置自定义域名**
   - 在 Vercel 项目设置中添加域名：`fusions.cc`
   - 按照提示配置 DNS

---

## 快速命令总结

```bash
# 在 frontend 目录下执行
git init
git add .
git commit -m "Initial commit: Fusions frontend"
git remote add origin https://github.com/barron-paw/fusions.git
git branch -M main
git push -u origin main
```

**注意**：将 `barron-paw` 替换为你的实际 GitHub 用户名！


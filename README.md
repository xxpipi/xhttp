<p align="center">
  <img src="https://raw.githubusercontent.com/koolcy/xhttp/main/assets/banner.svg" alt="XHTTP Config" width="900">
</p>

<h1 align="center">XHTTP 配置生成器</h1>

<p align="center">
  <b>轻量 · 快速 · 浏览器本地生成</b><br>
  基于 Cloudflare Worker 的 XHTTP 配置工具
</p>

<p align="center">
  <a href="https://github.com/koolcy/xhttp"><img src="https://img.shields.io/badge/GitHub-koolcy%2Fxhttp-181717?logo=github" alt="GitHub"></a>
  <img src="https://img.shields.io/badge/Cloudflare-Worker-f38020?logo=cloudflare&logoColor=white" alt="Cloudflare Worker">
  <img src="https://img.shields.io/badge/Xray-XHTTP-7c5cff" alt="Xray XHTTP">
</p>

---

## ✨ 功能

- 🔗 粘贴 `vless://` 链接自动解析
- ⬆️ 上行 / 下行 XHTTP 配置
- 🔐 SNI / Host / Path 配置
- 🌐 优选 IP / 域名
- 📦 多格式输出：Xray JSON、v2rayN、完整配置、小火箭链接、v2rayN 链接
- 📋 一键复制生成结果
- 💾 支持下载当前格式
- 🔒 完全浏览器本地处理，不保存节点信息
- ☁️ 无需 KV、D1 或其他后端服务

## 🖥️ 页面预览

### ① 首页 · 上行 / 下行配置

<p align="center">
  <img src="https://raw.githubusercontent.com/koolcy/xhttp/main/assets/preview-home.svg" alt="XHTTP Config 首页与上下行配置" width="900">
</p>

### ② 多格式输出

<p align="center">
  <img src="https://raw.githubusercontent.com/koolcy/xhttp/main/assets/preview-output.svg" alt="XHTTP 多格式输出" width="900">
</p>

### ③ v2rayN XHTTP Extra

<p align="center">
  <img src="https://raw.githubusercontent.com/koolcy/xhttp/main/assets/preview-v2rayn.svg" alt="v2rayN XHTTP Extra" width="900">
</p>

## 🚀 Cloudflare Worker 部署

1. 在 Cloudflare Dashboard 创建 Worker。
2. 使用仓库中的 `_worker.js` 作为 Worker 入口。
3. 如果使用 Workers Builds，确保仓库根目录包含 `wrangler.jsonc`。
4. Deploy command 使用：

```bash
npx wrangler deploy
```

项目不依赖 KV、D1 或其他后端服务。

## 📁 项目结构

```text
xhttp/
├── _worker.js
├── wrangler.jsonc
├── README.md
└── assets/
    ├── banner.svg
    ├── preview-home.svg
    ├── preview-output.svg
    └── preview-v2rayn.svg
```

## 🔗 项目地址

https://github.com/xxpipi/xhttp

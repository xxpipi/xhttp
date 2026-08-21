# XHTTP 配置生成器

Cloudflare Worker 纯静态 XHTTP 配置生成器。

## 功能

- VLESS / XHTTP 参数填写
- 粘贴 `vless://` 链接自动解析
- 上行 / 下行配置
- SNI / Host / Path 默认继承
- 优选 IP / 域名
- XHTTP 连接调优参数
- Xray JSON 生成
- 一键复制配置
- 完全浏览器本地处理，不保存节点信息

## Cloudflare Worker 部署

1. 在 Cloudflare Dashboard 创建 Worker。
2. 打开代码编辑器。
3. 将 `_worker.js` 全部复制进去。
4. 保存并部署。

项目不依赖 KV、D1 或其他后端服务。

## 项目地址

https://github.com/xxpipi/xhttp

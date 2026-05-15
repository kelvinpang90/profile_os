# Deployment — kelvinpeng.com

静态站，部署到自托管 VPS（与 erp_os / crm_os 同台机器、同一外层 nginx）。

```
GitHub push main
   ↓
GitHub Actions (.github/workflows/deploy.yml)
   ├─ npm ci && npm run build → dist/
   └─ rsync dist/  ──ssh──▶  VPS:/srv/sites/kelvinpeng.com/
                                ↓
                         /srv/infra nginx
                         kelvinpeng.conf → root /srv/sites/kelvinpeng.com
                                ↓
                      https://kelvinpeng.com
```

---

## 一、首次 VPS 端初始化（只做一次）

```bash
# 1. 建静态文件目录
sudo mkdir -p /srv/sites/kelvinpeng.com
sudo chown deploy:deploy /srv/sites/kelvinpeng.com   # 改成你的 deploy 用户

# 2. 复制 nginx server_block
sudo cp deploy/nginx/kelvinpeng.conf /srv/infra/nginx/conf.d/kelvinpeng.conf

# 3. 校验 + reload（外层 nginx 假设是 docker 容器名 infra_nginx，按你实际情况）
sudo docker exec infra_nginx nginx -t
sudo docker exec infra_nginx nginx -s reload
```

> 如外层 nginx 不是容器而是宿主机进程：`sudo nginx -t && sudo nginx -s reload`

> 通配符证书 `*.kelvinpeng.com` 假设已挂在 `/etc/nginx/certs/kelvinpeng.com/`。如果路径不同，改 [kelvinpeng.conf](nginx/kelvinpeng.conf) 里 `ssl_certificate` 两行。

---

## 二、GitHub Secrets 配置

到 https://github.com/kelvinpang90/profile_os/settings/secrets/actions 加 5 个 secret：

| Secret name        | 值                                                                       | 说明 |
|--------------------|--------------------------------------------------------------------------|-----|
| `SSH_HOST`         | `vps.kelvinpeng.com` 或 IP                                               | VPS 地址 |
| `SSH_USER`         | `deploy`（或你 erp_os 用的同一个部署用户）                                | SSH 登录用户 |
| `SSH_PORT`         | `22`（如果改过非标准端口填实际值）                                       | SSH 端口 |
| `SSH_PRIVATE_KEY`  | `-----BEGIN OPENSSH PRIVATE KEY-----` 起始的整段私钥内容                  | GHA 用来 SSH 进 VPS；对应公钥要加到 VPS `~/.ssh/authorized_keys` |
| `DEPLOY_PATH`      | `/srv/sites/kelvinpeng.com/`                                             | 目标目录，**末尾斜杠不能省** |

> 建议**复用 erp_os 仓库的同一组 secrets**（同一台 VPS、同一个部署用户、同一把密钥）。如果是新生成密钥：
> ```bash
> ssh-keygen -t ed25519 -f deploy_kelvinpeng -C "gha-deploy-kelvinpeng"
> # 把 deploy_kelvinpeng.pub 内容追加到 VPS:~/.ssh/authorized_keys
> # 把 deploy_kelvinpeng（私钥）整段贴到 SSH_PRIVATE_KEY secret
> ```

---

## 三、触发部署

```bash
git push origin main
```

或者 GitHub Actions 页面手动点 "Run workflow"（已开启 workflow_dispatch）。

部署完成后 workflow 会自动 curl `https://kelvinpeng.com` 做 smoke test，返回 200 就算成功。

---

## 四、回滚

rsync 部署没有版本号，回滚两种方式：

**A. 回滚到上一个 git commit**：
```bash
git revert HEAD && git push   # 自动触发重新部署
```

**B. 临时回滚**（不动 git）：
```bash
# 在 VPS 上保留快照（可加到 cron）
rsync -a /srv/sites/kelvinpeng.com/ /srv/sites/backups/kelvinpeng.com-$(date +%F-%H%M)/
# 出问题时
sudo rsync -a --delete /srv/sites/backups/kelvinpeng.com-2026-05-15-1430/ /srv/sites/kelvinpeng.com/
```

---

## 五、本地预览

```bash
npm run dev       # 开发，http://localhost:5173
npm run build     # 生产构建到 dist/
npm run preview   # 预览构建结果，http://localhost:4173
```

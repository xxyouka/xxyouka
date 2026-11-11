# xxyouka · 个人作品集

入口 `index.html`。纯静态单页，没有构建步骤、没有框架、没有追踪脚本。线上：<https://xxyouka.github.io/>。

> 2026-11-11 起源码并入 `xxyouka` 仓库的 `site/` 目录；部署仍发布到原仓库 `xxyouka/xxyouka.github.io` 的 `main` 分支。

## 目录

| 路径 | 内容 |
| --- | --- |
| `index.html` | 单页结构、项目卡、案例文案、元数据与 JSON-LD |
| `site.css` | 视觉、响应式与弹窗；文件末尾是 2026-11-11 的优化层 |
| `site.js` | 筛选、案例弹窗、图库、分享、复制邮箱、键盘与历史记录 |
| `ocean.js` | ASCII 海洋运行产物；源码在 `source/ocean/` |
| `source/ocean/` | 海洋的 TypeScript 源码（含 `site-entry.ts`） |
| `assets/` | WebP 项目截图、SVG 图标、Noto Serif SC 字体子集、分享图 |
| `404.html` | GitHub Pages 根站 404 |
| `robots.txt`、`sitemap.xml` | 抓取与站点地图 |
| `THIRD-PARTY-LICENSE.txt` | 第三方许可 |

## 本地预览

在仓库根目录运行：

```bash
./scripts/preview.sh 8766
```

然后打开 <http://127.0.0.1:8766/site/>。也可以直接：

```bash
python3 -m http.server 8766 --bind 127.0.0.1
```

Windows 仍可用 `start-preview.ps1`。页面没有构建步骤，改完刷新即可。

## 改内容

- 项目卡片、首屏、关于、联系：`index.html`
- 案例文案、图片列表、链接、证据数字：`site.js` 里的 `projects`、`caseMeta`、`caseNotes`
- 视觉与手机排版：`site.css`；新增规则优先追加到末尾，避免翻改旧的层叠
- 图片与图标：`assets/`
- 分享预览图：`assets/og-cover-20261102c.png`（1200×630，对应 `og:image`）

## ASCII 海洋

海洋是固定视口的背景，不随页面高度拉伸：桌面约 93 条鱼、手机约 45–110 条，按视口面积计算；标签页隐藏、元素不可见或系统开启“减少动态效果”时停止计算。

修改 `source/ocean/` 后重新打包（需要一次性的 `esbuild`）：

```bash
npx esbuild source/ocean/site-entry.ts \
  --bundle --minify --format=iife --target=es2020 \
  --outfile=ocean.js
```

页面引用带版本号：`ocean.js?v=YYYYMMDD-vN`。改完 `ocean.js`、`site.css` 或 `site.js` 后，同步更新 `index.html` 里的版本号，避免返回用户拿到旧缓存。

## 图片

站内截图统一为 WebP，HTML 里写明 `width`/`height` 与 `alt`，首屏主图使用 `fetchpriority="high"`。新增或替换图片时：

1. 保持原始比例，导出 WebP（照片 82–86，含文字截图 88–90）；
2. 更新 `index.html` / `site.js` / 文档中的文件名；
3. 运行 `python3 scripts/check.py` 检查引用。

## 分享与 SEO

- canonical、`og:url`、`og:image` 与 Twitter Card 均指向 `https://xxyouka.github.io/`。
- `robots.txt` 与 `sitemap.xml` 已提供；`404.html` 带 `noindex`。
- JSON-LD 使用 `ProfilePage` + `Person`，作品列在 `hasPart`。
- 若站点地址变化，需要同步修改 `index.html` 头部的绝对地址与两个 SEO 文件。

## 案例链接

项目链接使用 `#project/项目代号`，可直接打开对应详情；支持前后切换、方向键换图、复制链接、浏览器返回关闭。本地预览生成的是本机地址，部署后自动使用正式站点地址。

## 验证

仓库根目录运行：

```bash
python3 scripts/check.py
```

2026-11-11 的复查：HTML 结构校验通过；axe（桌面、手机、弹窗）0 违规；320 / 360 / 390 / 600 / 768 / 1024 / 1200 / 1440px 无横向溢出；海洋在 1440×900 下约 59fps（无 GPU 的 headless Chromium），固定视口后不再随文档高度增加计算量。详细的人工验收记录见 git 历史。

## 字体与配色

- 标题：Noto Serif SC 子集（`assets/fonts/noto-serif-sc-display.woff2`，SIL OFL 1.1）。
- 正文：系统无衬线；标签与编号：等宽。
- 配色：Catppuccin Mocha；项目字符画使用 Teal、Peach、Mauve、Yellow。

## 部署

```bash
./scripts/deploy.sh
```

脚本会先跑 `scripts/check.py`，确认工作区干净后，用 `git subtree push` 把 `site/` 推到 `xxyouka.github.io` 的 `main`。线上地址保持不变。

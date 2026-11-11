# xx · 作品集 / Portfolio

一个单页作品集：杂志编辑风，中英双语，零依赖、零构建、零追踪。

> 2026-11-11 起源码并入 `xxyouka` 仓库的 `portfolio/` 目录；部署仍发布到原仓库 `xxyouka/portfolio`。

**Live → [xxyouka.github.io/portfolio](https://xxyouka.github.io/portfolio/)**

## 内容

- 封面故事：校园猫猫、pet-id
- 作品索引：果智瞳、software-test-helper、BitClock、danmu-player
- 荣誉、关于、更多实验

## 技术

纯 HTML / CSS / 原生 JavaScript。没有框架、没有外部字体、没有统计脚本，静态托管即可运行。

- 亮 / 暗色跟随系统，可手动切换并记忆
- 响应式，320px 起可读
- `prefers-reduced-motion` 下关闭动效
- 自绘 SVG 图标与封面，站内图片已压缩去元数据

## 结构

```text
index.html          单页
404.html            404
assets/
  cat-detail.png    校园猫猫 · 猫咪详情页
  pet-id/           pet-id 底库样本（6 张）
  og.jpg            社交分享图
```

## 许可

站内文字与图片归 xx 所有，未经许可请勿转载。项目截图中的猫来自校园猫猫与 pet-id 的校园猫底库。
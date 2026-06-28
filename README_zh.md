# 宇宙奇点✨

> 一款放置类增量游戏，玩家需要从量子奇点中提取暗物质，不断提升，最终超越宇宙大爆炸。

本项目以独特的视角诠释了放置类游戏，着重展现宇宙主题和复杂的游戏机制。它采用现代网络技术构建，提供视觉效果震撼且极具策略性的游戏体验。

## 目录📜

- [关于](#about)
- [特征](#features)
- [技术栈](#tech-stack)
- [安装](#installation)
- [用法](#usage)
- [项目结构](#project-structure)
- [贡献](#contributing)
- [执照](#license)
- [重要链接](#important-links)

## 关于🌌

《宇宙奇点》是一款放置类增量游戏，玩家需要管理从量子奇点中提取暗物质的过程。游戏包含策略升级、声望机制以及跨越宇宙周期的独特发展系统。它旨在为喜欢复杂模拟和资源管理游戏的玩家提供深度且引人入胜的游戏体验。

## 特色🚀

- **深度渐进机制：**通过层层升级和声望系统逐步推进游戏进程。
- **量子奇点交互：**点击并管理用于资源生成的中心奇点。
- **飞升系统：**重置进度以获得永久奖励（碎片）并解锁新的技能等级。
- **声望升级：**将碎片投入技能树，以增强核心游戏机制，例如每秒点击次数和点击力。
- **成就系统：**随着你达成不同的里程碑，解锁各种成就。
- **存档位和备份：**管理多个存档文件并创建备份以确保安全。
- **离线进度：**游戏会计算并应用玩家离线期间取得的进度。
- **视觉效果丰富的界面：**采用充满宇宙感和霓虹色彩的美学设计，并配以流畅的动画效果。

## 技术栈🛠️

- **语言：** TypeScript
- **框架：** React、Next.js（TanStack Router）
- **样式：** Tailwind CSS
- **状态管理：** React Hooks、React Query
- **构建工具：** Vite
- **UI 组件：** Radix UI、Shadcn/ui、Vaul、Sonner、Lucide React
- **动画：** Framer Motion
- **代码检查和格式设置：** ESLint、Prettier
- **服务器端：** Node.js（通过 Nitro 实现服务端渲染）

## 安装💻

本项目是一个 Web 应用程序，可以使用 Node.js 和 npm/yarn/pnpm 运行。

1. **克隆仓库：**

    ```bash
    git clone https://github.com/Nathan-Pro-FR/cookie_clicker.git
    cd cookie_clicker
    ```

2. **安装依赖项：**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **运行开发服务器：**

    ```bash
    npm run dev
    ```

4. **打开浏览器**访问`http://localhost:5173` （或 Vite 指定的端口）。

## 使用方法🎮

《宇宙奇点》是一款放置类游戏，玩家需要通过点击和管理资源来实现宇宙统治。

1. **点击奇点：**你的主要交互方式是点击中心奇点来生成暗物质。
2. **购买模块：**使用您积累的暗物质购买模块，这些模块会随着时间的推移被动地产生更多的暗物质（CPS - 每秒宇宙产量）。
3. **声望（飞升）：**当你的总暗物质达到一定阈值时，你可以触发“大爆炸”（飞升）来重置你当前的进度，但获得宇宙碎片。
4. **花费碎片：**使用宇宙碎片购买声望升级，永久提升您的每秒点击次数、点击威力和碎片获取速度。
5. **解锁成就：**努力完成各种成就，这些成就将跟踪您的进度和里程碑。
6. **保存和读取：**利用存档槽和备份功能来管理您的游戏进度。

### 游戏循环示例🔄

- 首先点击奇点来积累初始暗物质。
- 购买前几个“轨道探空仪”模块即可开始被动发电。
- 随着 CPS 的增加，购买更高级的模块，例如“Moissonneur de Naines Blanches”和“Manipulateur de Cordes Cosmiques”。
- 目标是达成“奇点稳定”成就（100万暗物质），以解锁飞升。
- 升华以获得碎片，然后将它们投资于诸如“光速”（+25% CPS）和“暗影之王”（点击力 x2）之类的升级。
- 继续游玩、提升和升级，以达到新的宇宙里程碑。

## 项目结构📂

```
cookie_clicker/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── accordion.tsx
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── command.tsx
│   │   │   ├── context-menu.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── hover-card.tsx
│   │   │   ├── input-otp.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── menubar.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── radio-group.tsx
│   │   │   ├── resizable.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── toggle-group.tsx
│   │   │   ├── toggle.tsx
│   │   │   └── tooltip.tsx
│   │   ├── Modals.tsx
│   │   ├── Prestige.tsx
│   │   ├── Shop.tsx
│   │   └── Singularity.tsx
│   ├── hooks/
│   │   └── use-mobile.tsx
│   ├── lib/
│   │   ├── error-capture.ts
│   │   ├── error-page.ts
│   │   ├── game.ts
│   │   ├── lovable-error-reporting.ts
│   │   └── utils.ts
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── index.tsx
│   │   └── README.md
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
├── .eslint.config.js
├── .prettierignore
├── .prettierrc
├── components.json
├── tsconfig.json
├── package.json
├── README.md
└── vite.config.ts
```

## 贡献🤝

欢迎贡献代码！请随时提交 Pull Request 或提出 Issue。

## 许可证📄

该项目未指定许可证。

## 重要链接🔗

- [在线演示](https://cosmic-singularity.lovable.dev/)

## 页脚🌐

© 2024 [Nathan-Pro-FR](https://github.com/Nathan-Pro-FR)

存储库： [Nathan-Pro-FR/cookie_clicker](https://github.com/Nathan-Pro-FR/cookie_clicker)

像[星星](https://github.com/Nathan-Pro-FR/cookie_clicker)[一样的](https://github.com/Nathan-Pro-FR/cookie_clicker)[叉状](https://github.com/Nathan-Pro-FR/cookie_clicker/fork)[问题](https://github.com/Nathan-Pro-FR/cookie_clicker/issues)

---

**<p align="center">由<a href="https://www.readmecodegen.com/">ReadmeCodeGen</a>生成</p>**

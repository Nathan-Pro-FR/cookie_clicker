# 宇宙特異点✨

> 量子特異点からダークマターを抽出し、上昇し、ビッグバンを超越する、段階的に進行する放置型ゲーム。

このプロジェクトは、宇宙をテーマにした複雑なゲームメカニクスに焦点を当てた、放置ゲームジャンルにおける独自の試みです。最新のウェブ技術を用いて構築されており、視覚的に魅力的で奥深い戦略性を備えたゲームプレイ体験を提供します。

## 目次📜

- [について](#about)
- [特徴](#features)
- [技術スタック](#tech-stack)
- [インストール](#installation)
- [使用法](#usage)
- [プロジェクト構成](#project-structure)
- [貢献する](#contributing)
- [ライセンス](#license)
- [重要なリンク](#important-links)

## 🌌について

Cosmic Singularityは、プレイヤーが量子特異点からダークマターを抽出するインクリメンタル型の放置ゲームです。戦略的なアップグレード、名声システム、そして宇宙のサイクルを横断する独自の進行システムが特徴で、複雑なシミュレーションゲームや資源管理ゲームを好むプレイヤーに、奥深く魅力的な体験を提供することを目指しています。

## 特徴 🚀

- **奥深い漸進的なゲームシステム：**段階的なアップグレードと名声システムを通してゲームを進めていく。
- **量子特異点との相互作用：**中心となる特異点をクリックして管理し、リソースを生成します。
- **昇格システム：**進行状況をリセットして、永続的なボーナス（シャード）を獲得し、新しいレベルのアビリティをアンロックします。
- **プレステージアップグレード：**シャードをスキルツリーに投資して、CPSやクリックパワーなどのコアゲームメカニクスを強化しましょう。
- **実績システム：**様々なマイルストーンを達成するにつれて、様々な実績が解除されます。
- **セーブスロットとバックアップ：**複数のセーブファイルを管理し、セキュリティのためにバックアップを作成します。
- **オフライン時の進行状況：**プレイヤーがゲームから離れていた間に行われた進行状況をゲームが計算し、適用します。
- **視覚的に豊かなインターフェース：**宇宙的な雰囲気とネオンカラーを駆使した美的デザインと、滑らかなアニメーションを採用しています。

## 技術スタック🛠️

- **言語:** TypeScript
- **フレームワーク：** React、Next.js（TanStack Router）
- **スタイリング:** Tailwind CSS
- **状態管理：** React Hooks、React Query
- **ビルドツール：** Vite
- **UI コンポーネント:** Radix UI、Shadcn/ui、Vaul、Sonner、Lucide React
- **アニメーション：** Framer Motion
- **リンティングとフォーマット：** ESLint、Prettier
- **サーバー：** Node.js（SSRにはNitroを使用）

## インストール💻

このプロジェクトはWebアプリケーションであり、Node.jsとnpm/yarn/pnpmを使用して実行できます。

1. **リポジトリをクローンする：**

    ```bash
    git clone https://github.com/Nathan-Pro-FR/cookie_clicker.git
    cd cookie_clicker
    ```

2. **依存関係をインストールします:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **開発サーバーを実行します。**

    ```bash
    npm run dev
    ```

4. **ブラウザ**で`http://localhost:5173` (または Vite で指定されたポート) にアクセスしてください。

## 使用方法 🎮

Cosmic Singularityは、クリック操作と資源管理を通して宇宙支配を目指す放置型ゲームです。

1. **特異点をクリック：**主な操作は、中心にある特異点をクリックしてダークマターを生成することです。
2. **モジュールを購入する：**蓄積したダークマターを使用して、時間とともに受動的にダークマターを生成するモジュール（CPS - 1秒あたりの宇宙生成量）を購入します。
3. **名声（昇格）：**ダークマターの総量が一定の閾値に達すると、「ビッグバン」（昇格）を発動して現在の進行状況をリセットし、コズミックシャードを獲得できます。
4. **シャードを使う：**コズミックシャードを使ってプレステージアップグレードを購入すると、CPS、クリックパワー、シャード獲得率に永続的なバフ効果が得られます。
5. **実績を解除しよう：**あなたの進捗状況やマイルストーンを記録する様々な実績の達成を目指しましょう。
6. **セーブ＆ロード：**セーブスロットとバックアップ機能を利用して、ゲームの進行状況を管理しましょう。

### ゲームプレイループの例 🔄

- まず、特異点をクリックして初期ダークマターを蓄積します。
- 受動発電を開始するには、最初の数個の「ゾンデ・オービターレ」モジュールを購入してください。
- CPS が増加するにつれて、「Moissonneur de Naines Blanches」や「Manipulateur de Cordes Cosmiques」などのより高度なモジュールを購入してください。
- 「特異点安定」アチーブメント（ダークマター100万個）を達成することを目指し、アセンションを解放しましょう。
- 昇格してシャードを獲得し、「Vitesse de la Lumière」（+25% CPS）や「Noyau Obscur」（クリックパワー×2）などのアップグレードに投資しましょう。
- プレイを続け、レベルアップし、アップグレードを重ねて、新たな宇宙の偉業を成し遂げよう。

## プロジェクト構造📂

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

## 貢献する🤝

貢献を歓迎します！プルリクエストの送信、またはイシューの開設をお気軽にお願いします。

## ライセンス📄

このプロジェクトにはライセンスが指定されていません。

## 重要なリンク 🔗

- [ライブデモ](https://cosmic-singularity.lovable.dev/)

## フッター🌐

© 2024 [Nathan-Pro-FR](https://github.com/Nathan-Pro-FR)

リポジトリ: [Nathan-Pro-FR/cookie_clicker](https://github.com/Nathan-Pro-FR/cookie_clicker)

[フォーク](https://github.com/Nathan-Pro-FR/cookie_clicker/fork)[のような](https://github.com/Nathan-Pro-FR/cookie_clicker)[星の](https://github.com/Nathan-Pro-FR/cookie_clicker)[問題](https://github.com/Nathan-Pro-FR/cookie_clicker/issues)

---

**<p align="center"><a href="https://www.readmecodegen.com/">ReadmeCodeGen</a>によって生成されました</p>**

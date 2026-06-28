# Cosmic Singularity ✨

> An incremental idle game where you extract dark matter from a quantum singularity, ascend, and transcend the Big Bang.

This project is a unique take on the idle game genre, focusing on cosmic themes and complex game mechanics. It's built with modern web technologies, offering a visually engaging and deeply strategic gameplay experience.

## Table of Contents 📜

* [About](#about)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)
* [Important Links](#important-links)

## About 🌌

Cosmic Singularity is an incremental idle game where players manage the extraction of dark matter from a quantum singularity. The game involves strategic upgrades, prestige mechanics, and a unique progression system that spans across universal cycles. It aims to provide a deep and engaging experience for players who enjoy complex simulation and resource management games.

## Features 🚀

*   **Deep Incremental Mechanics:** Progress through layers of upgrades and prestige systems.
*   **Quantum Singularity Interaction:** Click and manage a central singularity for resource generation.
*   **Ascension System:** Reset progress to gain permanent bonuses (Shards) and unlock new tiers of abilities.
*   **Prestige Upgrades:** Invest Shards into a skill tree to enhance core game mechanics like CPS and click power.
*   **Achievement System:** Unlock a variety of achievements as you progress through different milestones.
*   **Save Slots & Backup:** Manage multiple save files and create backups for security.
*   **Offline Progress:** The game calculates and applies progress made while the player was away.
*   **Visually Rich Interface:** Utilizes a cosmic, neon-infused aesthetic with smooth animations.

## Tech Stack 🛠️

*   **Language:** TypeScript
*   **Framework:** React, Next.js (TanStack Router)
*   **Styling:** Tailwind CSS
*   **State Management:** React Hooks, React Query
*   **Build Tool:** Vite
*   **UI Components:** Radix UI, Shadcn/ui, Vaul, Sonner, Lucide React
*   **Animation:** Framer Motion
*   **Linting & Formatting:** ESLint, Prettier
*   **Server:** Node.js (via Nitro for SSR)

## Installation 💻

This project is a web application and can be run using Node.js and npm/yarn/pnpm.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Nathan-Pro-FR/cookie_clicker.git
    cd cookie_clicker
    ```

2.  **Install dependencies:**
    ```bash
    npm install 
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser** to `http://localhost:5173` (or the port specified by Vite).

## Usage 🎮

Cosmic Singularity is an idle game focused on clicking and managing resources to achieve cosmic domination.

1.  **Click the Singularity:** Your primary interaction is clicking the central singularity to generate Dark Matter.
2.  **Buy Modules:** Use your accumulated Dark Matter to purchase modules that passively generate more Dark Matter over time (CPS - Cosmic Production per Second).
3.  **Prestige (Ascend):** When you reach a certain threshold of total Dark Matter, you can trigger a "Big Bang" (ascend) to reset your current progress but gain Cosmic Shards.
4.  **Spend Shards:** Use Cosmic Shards to buy Prestige Upgrades that provide permanent buffs to your CPS, click power, and shard acquisition rate.
5.  **Unlock Achievements:** Strive to complete various achievements that track your progress and milestones.
6.  **Save & Load:** Utilize the save slots and backup features to manage your game progress.

### Example Gameplay Loop 🔄

*   Start by clicking the singularity to accumulate initial Dark Matter.
*   Purchase the first few "Sonde Orbitale" modules to start passive generation.
*   As your CPS increases, buy more advanced modules like "Moissonneur de Naines Blanches" and "Manipulateur de Cordes Cosmiques."
*   Aim to reach the "Singularity Stable" achievement (1M Dark Matter) to unlock ascension.
*   Ascend to gain Shards, then invest them in upgrades like "Vitesse de la Lumière" (+25% CPS) and "Noyau Obscur" (Click Power x2).
*   Continue playing, ascending, and upgrading to reach new cosmic milestones.

## Project Structure 📂

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

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

## License 📄

This project does not specify a license.

## Important Links 🔗

*   [Live Demo](https://cosmic-singularity.lovable.dev/)

## Footer 🌐

© 2024 [Nathan-Pro-FR](https://github.com/Nathan-Pro-FR)

Repositório: [Nathan-Pro-FR/cookie_clicker](https://github.com/Nathan-Pro-FR/cookie_clicker)

[Fork](https://github.com/Nathan-Pro-FR/cookie_clicker/fork)
[Like](https://github.com/Nathan-Pro-FR/cookie_clicker)
[Star](https://github.com/Nathan-Pro-FR/cookie_clicker)
[Issues](https://github.com/Nathan-Pro-FR/cookie_clicker/issues)

---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**

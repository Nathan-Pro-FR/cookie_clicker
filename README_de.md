# Kosmische Singularität ✨

> Ein inkrementelles Idle-Game, in dem man dunkle Materie aus einer Quantensingularität extrahiert, aufsteigt und den Urknall transzendiert.

Dieses Projekt ist eine einzigartige Interpretation des Idle-Game-Genres mit Fokus auf kosmische Themen und komplexe Spielmechaniken. Es wurde mit modernen Webtechnologien entwickelt und bietet ein visuell ansprechendes und strategisch anspruchsvolles Spielerlebnis.

## Inhaltsverzeichnis 📜

- [Um](#about)
- [Merkmale](#features)
- [Technologie-Stack](#tech-stack)
- [Installation](#installation)
- [Verwendung](#usage)
- [Projektstruktur](#project-structure)
- [Mitwirken](#contributing)
- [Lizenz](#license)
- [Wichtige Links](#important-links)

## Über uns 🌌

Cosmic Singularity ist ein inkrementelles Idle-Game, in dem Spieler die Gewinnung dunkler Materie aus einer Quantensingularität steuern. Das Spiel bietet strategische Upgrades, Prestige-Mechaniken und ein einzigartiges Fortschrittssystem, das sich über verschiedene Universumszyklen erstreckt. Es zielt darauf ab, Spielern, die komplexe Simulations- und Ressourcenmanagement-Spiele mögen, ein tiefgründiges und fesselndes Erlebnis zu bieten.

## Funktionen 🚀

- **Tiefgreifende, inkrementelle Spielmechaniken:** Fortschritte durch gestaffelte Upgrades und Prestigesysteme.
- **Interaktion mit Quantensingularitäten:** Durch Klicken und Verwalten einer zentralen Singularität werden Ressourcen generiert.
- **Aufstiegssystem:** Setze deinen Fortschritt zurück, um dauerhafte Boni (Splitter) zu erhalten und neue Fähigkeitsstufen freizuschalten.
- **Prestige-Upgrades:** Investiere Splitter in einen Fertigkeitenbaum, um Kernspielmechaniken wie Klicks pro Sekunde und Klickkraft zu verbessern.
- **Erfolgs-System:** Schalte im Laufe des Erreichens verschiedener Meilensteine ​​eine Vielzahl von Erfolgen frei.
- **Speicherstände &amp; Datensicherung:** Verwalten Sie mehrere Speicherstände und erstellen Sie Datensicherungen zur Sicherheit.
- **Offline-Fortschritt:** Das Spiel berechnet und wendet den Fortschritt an, der während der Abwesenheit des Spielers erzielt wurde.
- **Visuell ansprechende Benutzeroberfläche:** Nutzt eine kosmische, neonfarbene Ästhetik mit flüssigen Animationen.

## Tech-Stack 🛠️

- **Sprache:** TypeScript
- **Framework:** React, Next.js (TanStack Router)
- **Styling:** Tailwind CSS
- **Zustandsverwaltung:** React Hooks, React Query
- **Build-Tool:** Vite
- **UI-Komponenten:** Radix UI, Shadcn/ui, Vaul, Sonner, Lucide React
- **Animation:** Framer Motion
- **Linting &amp; Formatierung:** ESLint, Prettier
- **Server:** Node.js (über Nitro für SSR)

## Installation 💻

Dieses Projekt ist eine Webanwendung und kann mit Node.js und npm/yarn/pnpm ausgeführt werden.

1. **Repository klonen:**

    ```bash
    git clone https://github.com/Nathan-Pro-FR/cookie_clicker.git
    cd cookie_clicker
    ```

2. **Abhängigkeiten installieren:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Starten Sie den Entwicklungsserver:**

    ```bash
    npm run dev
    ```

4. **Öffnen Sie Ihren Browser** und geben Sie `http://localhost:5173` (oder den von Vite angegebenen Port) ein.

## Verwendung 🎮

Cosmic Singularity ist ein Idle-Game, bei dem es darum geht, durch Klicken und Ressourcenmanagement die kosmische Herrschaft zu erlangen.

1. **Klicken Sie auf die Singularität:** Ihre primäre Interaktion besteht darin, auf die zentrale Singularität zu klicken, um Dunkle Materie zu erzeugen.
2. **Kaufe Module:** Verwende deine angesammelte Dunkle Materie, um Module zu kaufen, die im Laufe der Zeit passiv mehr Dunkle Materie erzeugen (CPS – Kosmische Produktion pro Sekunde).
3. **Prestige (Aufstieg):** Wenn du eine bestimmte Schwelle an Dunkler Materie erreichst, kannst du einen "Urknall" (Aufstieg) auslösen, um deinen aktuellen Fortschritt zurückzusetzen, aber Kosmische Splitter zu erhalten.
4. **Splitter ausgeben:** Verwende Kosmische Splitter, um Prestige-Upgrades zu kaufen, die dauerhafte Boni auf deine Klicks pro Sekunde (CPS), deine Klickkraft und deine Splitter-Erwerbsrate gewähren.
5. **Schalte Erfolge frei:** Strebe danach, verschiedene Erfolge zu erzielen, die deinen Fortschritt und deine Meilensteine ​​festhalten.
6. **Speichern &amp; Laden:** Nutzen Sie die Speicherplätze und Sicherungsfunktionen, um Ihren Spielfortschritt zu verwalten.

### Beispielhafter Spielablauf 🔄

- Klicken Sie zunächst auf die Singularität, um anfängliche Dunkle Materie anzusammeln.
- Kaufen Sie die ersten paar „Sonde Orbitale“-Module, um mit der passiven Stromerzeugung zu beginnen.
- Wenn Ihr CPS steigt, kaufen Sie fortgeschrittenere Module wie „Moissonneur de Naines Blanches“ und „Manipulateur de Cordes Cosmiques“.
- Ziel ist es, die Errungenschaft „Singularität stabil“ (1 Mio. Dunkle Materie) zu erreichen, um den Aufstieg freizuschalten.
- Steige auf, um Splitter zu erhalten, und investiere diese dann in Verbesserungen wie „Vitesse de la Lumière“ (+25 % CPS) und „Noyau Obscur“ (Klickkraft x2).
- Spiele weiter, steige auf und verbessere dich, um neue kosmische Meilensteine ​​zu erreichen.

## Projektstruktur 📂

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

## Mitmachen 🤝

Beiträge sind willkommen! Gerne können Sie einen Pull Request einreichen oder ein Issue öffnen.

## Lizenz 📄

Für dieses Projekt ist keine Lizenz festgelegt.

## Wichtige Links 🔗

- [Live-Demo](https://cosmic-singularity.lovable.dev/)

## Fußzeile 🌐

© 2024 [Nathan-Pro-FR](https://github.com/Nathan-Pro-FR)

Repositorium: [Nathan-Pro-FR/cookie_clicker](https://github.com/Nathan-Pro-FR/cookie_clicker)

[Probleme](https://github.com/Nathan-Pro-FR/cookie_clicker/issues) [mit Gabeln](https://github.com/Nathan-Pro-FR/cookie_clicker/fork) [wie](https://github.com/Nathan-Pro-FR/cookie_clicker) [Sternen](https://github.com/Nathan-Pro-FR/cookie_clicker)

---

**<p align="center">Generiert von <a href="https://www.readmecodegen.com/">ReadmeCodeGen</a></p>**

# Singularité cosmique ✨

> Un jeu de plateforme incrémental où vous extrayez de la matière noire d'une singularité quantique, vous élèvez et transcendez le Big Bang.

Ce projet propose une approche originale du jeu inactif, axée sur des thèmes cosmiques et des mécaniques de jeu complexes. Développé avec des technologies web modernes, il offre une expérience de jeu visuellement captivante et profondément stratégique.

## Table des matières 📜

- [À propos](#about)
- [Caractéristiques](#features)
- [Pile technologique](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Structure du projet](#project-structure)
- [Contribuer](#contributing)
- [Licence](#license)
- [Liens importants](#important-links)

## À propos 🌌

Cosmic Singularity est un jeu de gestion incrémentale où les joueurs gèrent l'extraction de matière noire à partir d'une singularité quantique. Le jeu propose des améliorations stratégiques, un système de prestige et une progression unique s'étendant sur plusieurs cycles universels. Il vise à offrir une expérience immersive et riche aux joueurs appréciant les jeux de simulation complexes et de gestion de ressources.

## Caractéristiques 🚀

- **Mécanismes de progression complexes :** Progressez à travers différents niveaux d’améliorations et de systèmes de prestige.
- **Interaction avec une singularité quantique :** cliquez et gérez une singularité centrale pour la génération de ressources.
- **Système d'Ascension :** Réinitialisez votre progression pour obtenir des bonus permanents (Éclats) et débloquer de nouveaux niveaux de compétences.
- **Améliorations de prestige :** Investissez des éclats dans un arbre de compétences pour améliorer les mécanismes de jeu de base comme les CPS et la puissance de clic.
- **Système de succès :** Débloquez divers succès en progressant à travers différentes étapes.
- **Emplacements de sauvegarde et sauvegarde :** Gérez plusieurs fichiers de sauvegarde et créez des sauvegardes pour plus de sécurité.
- **Progression hors ligne :** Le jeu calcule et applique la progression réalisée pendant l’absence du joueur.
- **Interface visuellement riche :** utilise une esthétique cosmique imprégnée de néons avec des animations fluides.

## Pile technologique 🛠️

- **Langage :** TypeScript
- **Framework :** React, Next.js (TanStack Router)
- **Style :** Tailwind CSS
- **Gestion d'état :** React Hooks, React Query
- **Outil de construction :** Vite
- **Composants de l'interface utilisateur :** Radix UI, Shadcn/ui, Vaul, Sonner, Lucide React
- **Animation :** Framer Motion
- **Analyse et formatage :** ESLint, Prettier
- **Serveur :** Node.js (via Nitro pour le rendu côté serveur)

## Installation 💻

Ce projet est une application web et peut être exécuté à l'aide de Node.js et npm/yarn/pnpm.

1. **Cloner le dépôt :**

    ```bash
    git clone https://github.com/Nathan-Pro-FR/cookie_clicker.git
    cd cookie_clicker
    ```

2. **Installer les dépendances :**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Lancer le serveur de développement :**

    ```bash
    npm run dev
    ```

4. **Ouvrez votre navigateur** à l' `http://localhost:5173` (ou le port spécifié par Vite).

## Utilisation 🎮

Cosmic Singularity est un jeu inactif axé sur la gestion de ressources par le clic pour parvenir à la domination cosmique.

1. **Cliquez sur la singularité :** votre interaction principale consiste à cliquer sur la singularité centrale pour générer de la matière noire.
2. **Achat de modules :** Utilisez votre matière noire accumulée pour acheter des modules qui génèrent passivement plus de matière noire au fil du temps (CPS - Production cosmique par seconde).
3. **Prestige (Ascension) :** Lorsque vous atteignez un certain seuil de matière noire totale, vous pouvez déclencher un « Big Bang » (ascension) pour réinitialiser votre progression actuelle mais gagner des éclats cosmiques.
4. **Dépenser des éclats :** Utilisez des éclats cosmiques pour acheter des améliorations de prestige qui offrent des bonus permanents à votre CPS, à votre puissance de clic et à votre taux d'acquisition d'éclats.
5. **Débloquez des succès :** Efforcez-vous de réaliser divers succès qui suivent votre progression et vos étapes clés.
6. **Sauvegarde et chargement :** Utilisez les emplacements de sauvegarde et les fonctions de sauvegarde pour gérer votre progression dans le jeu.

### Exemple de boucle de jeu 🔄

- Commencez par cliquer sur la singularité pour accumuler la matière noire initiale.
- Achetez les premiers modules « Sonde Orbitale » pour démarrer la production passive.
- Au fur et à mesure que votre CPS augmente, achetez des modules plus avancés comme « Moissonneur de Naines Blanches » et « Manipulateur de Cordes Cosmiques ».
- Visez à atteindre le succès « Singularité stable » (1 million de matière noire) pour débloquer l'ascension.
- Montez en grade pour gagner des éclats, puis investissez-les dans des améliorations comme « Vitesse de la Lumière » (+25 % CPS) et « Noyau Obscur » (Puissance de clic x2).
- Continuez à jouer, à progresser et à vous améliorer pour atteindre de nouveaux sommets cosmiques.

## Structure du projet 📂

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

## Contribuer 🤝

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une demande de fusion ou à ouvrir un problème.

## Permis 📄

Ce projet ne spécifie pas de licence.

## Liens importants 🔗

- [Démo en direct](https://cosmic-singularity.lovable.dev/)

## Pied de page 🌐

© 2024 [Nathan-Pro-FR](https://github.com/Nathan-Pro-FR)

Dépôt : [Nathan-Pro-FR/cookie_clicker](https://github.com/Nathan-Pro-FR/cookie_clicker)

[Problèmes](https://github.com/Nathan-Pro-FR/cookie_clicker/issues) [de Fork](https://github.com/Nathan-Pro-FR/cookie_clicker/fork) [Like](https://github.com/Nathan-Pro-FR/cookie_clicker) [Star](https://github.com/Nathan-Pro-FR/cookie_clicker)

---

**<p align="center">Généré par <a href="https://www.readmecodegen.com/">ReadmeCodeGen</a></p>**

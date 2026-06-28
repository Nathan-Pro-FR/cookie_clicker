# Singularidade Cósmica ✨

> Um jogo incremental ocioso onde você extrai matéria escura de uma singularidade quântica, ascende e transcende o Big Bang.

Este projeto apresenta uma abordagem singular ao gênero de jogos ociosos, com foco em temas cósmicos e mecânicas de jogo complexas. Desenvolvido com tecnologias web modernas, oferece uma experiência de jogo visualmente envolvente e profundamente estratégica.

## Índice 📜

- [Sobre](#about)
- [Características](#features)
- [Conjunto de tecnologias](#tech-stack)
- [Instalação](#installation)
- [Uso](#usage)
- [Estrutura do Projeto](#project-structure)
- [Contribuindo](#contributing)
- [Licença](#license)
- [Links importantes](#important-links)

## Sobre 🌌

Cosmic Singularity é um jogo incremental ocioso onde os jogadores gerenciam a extração de matéria escura de uma singularidade quântica. O jogo envolve melhorias estratégicas, mecânicas de prestígio e um sistema de progressão único que abrange ciclos universais. Seu objetivo é proporcionar uma experiência profunda e envolvente para jogadores que apreciam jogos complexos de simulação e gerenciamento de recursos.

## Funcionalidades 🚀

- **Mecânicas Incrementais Profundas:** Progrida através de camadas de melhorias e sistemas de prestígio.
- **Interação de Singularidade Quântica:** Clique e gerencie uma singularidade central para geração de recursos.
- **Sistema de Ascensão:** Reinicie o progresso para obter bônus permanentes (Fragmentos) e desbloquear novos níveis de habilidades.
- **Aprimoramentos de Prestígio:** Invista Fragmentos em uma árvore de habilidades para aprimorar mecânicas essenciais do jogo, como CPS (cliques por segundo) e poder de clique.
- **Sistema de Conquistas:** Desbloqueie uma variedade de conquistas à medida que avança por diferentes marcos.
- **Salvar espaços e fazer backup:** gerencie vários arquivos de salvamento e crie backups para segurança.
- **Progresso offline:** O jogo calcula e aplica o progresso feito enquanto o jogador estava ausente.
- **Interface visualmente rica:** Utiliza uma estética cósmica, repleta de cores neon, com animações suaves.

## Conjunto de tecnologias 🛠️

- **Linguagem:** TypeScript
- **Framework:** React, Next.js (TanStack Router)
- **Estilização:** Tailwind CSS
- **Gerenciamento de estado:** React Hooks, React Query
- **Ferramenta de construção:** Vite
- **Componentes de UI:** Radix UI, Shadcn/ui, Vaul, Sonner, Lucide React
- **Animação:** Framer Motion
- **Análise e formatação:** ESLint, Prettier
- **Servidor:** Node.js (via Nitro para SSR)

## Instalação 💻

Este projeto é uma aplicação web e pode ser executado usando Node.js e npm/yarn/pnpm.

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/Nathan-Pro-FR/cookie_clicker.git
    cd cookie_clicker
    ```

2. **Instalar dependências:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

4. **Abra seu navegador** em `http://localhost:5173` (ou na porta especificada pelo Vite).

## Uso 🎮

Cosmic Singularity é um jogo ocioso focado em clicar e gerenciar recursos para alcançar a dominação cósmica.

1. **Clique na Singularidade:** Sua principal interação é clicar na singularidade central para gerar Matéria Escura.
2. **Comprar Módulos:** Use sua Matéria Escura acumulada para comprar módulos que geram passivamente mais Matéria Escura ao longo do tempo (CPS - Produção Cósmica por Segundo).
3. **Prestígio (Ascensão):** Ao atingir um certo limite de Matéria Escura total, você pode desencadear um "Big Bang" (ascensão) para reiniciar seu progresso atual, mas ganhar Fragmentos Cósmicos.
4. **Gastar Fragmentos:** Use Fragmentos Cósmicos para comprar Melhorias de Prestígio que fornecem melhorias permanentes ao seu CPS (Cliques por Segundo), poder de clique e taxa de aquisição de fragmentos.
5. **Desbloqueie conquistas:** esforce-se para completar diversas conquistas que acompanham seu progresso e seus marcos.
6. **Salvar e carregar:** Utilize os espaços para salvar e os recursos de backup para gerenciar seu progresso no jogo.

### Exemplo de ciclo de jogo 🔄

- Comece clicando na singularidade para acumular matéria escura inicial.
- Adquira os primeiros módulos "Sonde Orbitale" para iniciar a geração passiva.
- À medida que seu CPS aumenta, compre módulos mais avançados como "Moissonneur de Naines Blanches" e "Manipulateur de Cordes Cosmiques".
- Busque alcançar a conquista "Singularidade Estável" (1 milhão de Matéria Escura) para desbloquear a ascensão.
- Suba para ganhar Fragmentos e, em seguida, invista-os em melhorias como "Vitesse de la Lumière" (+25% de CPS) e "Noyau Obscur" (Poder de Clique x2).
- Continue jogando, subindo de nível e aprimorando-se para alcançar novos marcos cósmicos.

## Estrutura do Projeto 📂

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

## Contribuindo 🤝

Contribuições são bem-vindas! Sinta-se à vontade para enviar uma solicitação de pull request ou abrir uma issue.

## Licença 📄

Este projeto não especifica uma licença.

## Links importantes 🔗

- [Demonstração ao vivo](https://cosmic-singularity.lovable.dev/)

## Rodapé 🌐

© 2024 [Nathan-Pro-FR](https://github.com/Nathan-Pro-FR)

Repositório: [Nathan-Pro-FR/cookie_clicker](https://github.com/Nathan-Pro-FR/cookie_clicker)

[Problemas](https://github.com/Nathan-Pro-FR/cookie_clicker/issues) [semelhantes](https://github.com/Nathan-Pro-FR/cookie_clicker) [a estrelas de](https://github.com/Nathan-Pro-FR/cookie_clicker) [garfo](https://github.com/Nathan-Pro-FR/cookie_clicker/fork)

---

**<p align="center">Gerado por <a href="https://www.readmecodegen.com/">ReadmeCodeGen</a></p>**

# Singularidad Cósmica ✨

> Un juego incremental inactivo en el que extraes materia oscura de una singularidad cuántica, asciendes y trasciendes el Big Bang.

Este proyecto ofrece una perspectiva única del género de juegos inactivos, centrándose en temas cósmicos y mecánicas de juego complejas. Desarrollado con tecnologías web modernas, proporciona una experiencia de juego visualmente atractiva y profundamente estratégica.

## Tabla de contenido 📜

- [Acerca de](#about)
- [Características](#features)
- [Pila tecnológica](#tech-stack)
- [Instalación](#installation)
- [Uso](#usage)
- [Estructura del proyecto](#project-structure)
- [Contribuyendo](#contributing)
- [Licencia](#license)
- [Enlaces importantes](#important-links)

## Acerca de 🌌

Cosmic Singularity es un juego incremental inactivo donde los jugadores gestionan la extracción de materia oscura de una singularidad cuántica. El juego incluye mejoras estratégicas, mecánicas de prestigio y un sistema de progresión único que abarca ciclos universales. Su objetivo es brindar una experiencia profunda y atractiva para los jugadores que disfrutan de juegos complejos de simulación y gestión de recursos.

## Características 🚀

- **Mecánicas incrementales profundas:** Progresa a través de capas de mejoras y sistemas de prestigio.
- **Interacción con la singularidad cuántica:** haga clic y gestione una singularidad central para la generación de recursos.
- **Sistema de Ascensión:** Reinicia el progreso para obtener bonificaciones permanentes (Fragmentos) y desbloquear nuevos niveles de habilidades.
- **Mejoras de prestigio:** Invierte fragmentos en un árbol de habilidades para mejorar las mecánicas básicas del juego, como los clics por segundo y la potencia de clic.
- **Sistema de logros:** Desbloquea una variedad de logros a medida que avanzas por diferentes hitos.
- **Ranuras de guardado y copias de seguridad:** Administre múltiples archivos de guardado y cree copias de seguridad por motivos de seguridad.
- **Progreso sin conexión:** El juego calcula y aplica el progreso realizado mientras el jugador estaba ausente.
- **Interfaz visualmente atractiva:** utiliza una estética cósmica con toques de neón y animaciones fluidas.

## Pila tecnológica 🛠️

- **Lenguaje:** TypeScript
- **Framework:** React, Next.js (TanStack Router)
- **Estilo:** Tailwind CSS
- **Gestión de estado:** React Hooks, React Query
- **Herramienta de compilación:** Vite
- **Componentes de la interfaz de usuario:** Radix UI, Shadcn/ui, Vaul, Sonner, Lucide React
- **Animación:** Framer Motion
- **Análisis y formato:** ESLint, Prettier
- **Servidor:** Node.js (a través de Nitro para SSR)

## Instalación 💻

Este proyecto es una aplicación web y se puede ejecutar utilizando Node.js y npm/yarn/pnpm.

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/Nathan-Pro-FR/cookie_clicker.git
    cd cookie_clicker
    ```

2. **Instalar dependencias:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Ejecuta el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

4. **Abra su navegador y acceda** a `http://localhost:5173` (o al puerto especificado por Vite).

## Uso 🎮

Cosmic Singularity es un juego inactivo centrado en hacer clic y gestionar recursos para lograr la dominación cósmica.

1. **Haz clic en la singularidad:** Tu interacción principal consiste en hacer clic en la singularidad central para generar materia oscura.
2. **Compra módulos:** Usa la materia oscura acumulada para comprar módulos que generan pasivamente más materia oscura con el tiempo (CPS - Producción Cósmica por Segundo).
3. **Prestigio (Ascenso):** Cuando alcanzas un cierto umbral de Materia Oscura total, puedes activar un "Big Bang" (ascenso) para reiniciar tu progreso actual pero obtener Fragmentos Cósmicos.
4. **Gasta Fragmentos:** Usa Fragmentos Cósmicos para comprar Mejoras de Prestigio que proporcionan mejoras permanentes a tu CPS, poder de clic y tasa de adquisición de fragmentos.
5. **Desbloquea logros:** Esfuérzate por completar diversos logros que registran tu progreso e hitos.
6. **Guardar y cargar:** Utiliza las ranuras de guardado y las funciones de copia de seguridad para gestionar el progreso de tu juego.

### Ejemplo de bucle de juego 🔄

- Comienza haciendo clic en la singularidad para acumular materia oscura inicial.
- Adquiera los primeros módulos "Sonde Orbitale" para comenzar con la generación pasiva de energía.
- A medida que aumente su CPS, compre módulos más avanzados como "Moissonneur de Naines Blanches" y "Manipulateur de Cordes Cosmiques".
- Intenta alcanzar el logro "Singularidad Estable" (1 millón de Materia Oscura) para desbloquear la ascensión.
- Asciende para obtener Fragmentos, luego inviértelos en mejoras como "Vitese de la Lumière" (+25% CPS) y "Noyau Obscur" (Poder de clic x2).
- Sigue jugando, ascendiendo y mejorando para alcanzar nuevos hitos cósmicos.

## Estructura del proyecto 📂

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

## Contribuyendo 🤝

¡Se aceptan contribuciones! No dudes en enviar una solicitud de extracción o abrir una incidencia.

## Licencia 📄

Este proyecto no especifica una licencia.

## Enlaces importantes 🔗

- [Demostración en vivo](https://cosmic-singularity.lovable.dev/)

## Pie de página 🌐

© 2024 [Nathan-Pro-FR](https://github.com/Nathan-Pro-FR)

Repositorio: [Nathan-Pro-FR/cookie_clicker](https://github.com/Nathan-Pro-FR/cookie_clicker)

[Problemas](https://github.com/Nathan-Pro-FR/cookie_clicker/issues) [de estrella](https://github.com/Nathan-Pro-FR/cookie_clicker) [como](https://github.com/Nathan-Pro-FR/cookie_clicker) [un tenedor](https://github.com/Nathan-Pro-FR/cookie_clicker/fork)

---

**<p align="center">Generado por <a href="https://www.readmecodegen.com/">ReadmeCodeGen</a></p>**

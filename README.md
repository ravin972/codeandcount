ear# CodeAndCount.com - Next.js App

This is a Next.js project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), enhanced with ShadCN UI components, Tailwind CSS, and Genkit for AI functionalities, developed within Firebase Studio.

## Overview

CodeAndCount.com is a modern web application designed to showcase services, portfolio, and insights related to web development, AI solutions, and account management.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration**: [Genkit (by Google)](https://firebase.google.com/docs/genkit)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

First, ensure you have Node.js and npm (or yarn/pnpm) installed.

1.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    # or
    # pnpm install
    ```

2.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    # or
    # pnpm dev
    ```
    This will typically start the development server on `http://localhost:3000`. The current `package.json` specifies port `9002` for the `dev` script (`next dev --turbopack -p 9002`).

3.  **Run Genkit development server (for AI flows):**
    In a separate terminal, run:
    ```bash
    npm run genkit:dev
    # or
    npm run genkit:watch # for auto-reloading on changes
    ```

Open [http://localhost:9002](http://localhost:9002) (or your configured port) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Available Scripts

In the project directory, you can run:

-   `npm run dev`: Runs the app in development mode with Turbopack.
-   `npm run genkit:dev`: Starts the Genkit development server.
-   `npm run genkit:watch`: Starts the Genkit development server with watch mode.
-   `npm run build`: Builds the app for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the project files using Next.js's built-in ESLint configuration.
-   `npm run typecheck`: Runs TypeScript to check for type errors.

## Learn More

To learn more about the technologies used, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
-   [React Documentation](https://react.dev/) - learn about React.
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
-   [ShadCN UI Documentation](https://ui.shadcn.com/docs) - learn about ShadCN UI components.
-   [Genkit Documentation](https://firebase.google.com/docs/genkit) - learn about Genkit.

## Deployment

This project is ready to be deployed on any platform that supports Next.js, such as [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) (from the creators of Next.js) or Firebase Hosting.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

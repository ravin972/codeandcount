
<div align="center">
  <h1 align="center">
    <span style="font-size: 2.5rem; font-weight: bold;">Code&Count</span>
    <br />
    <span style="font-size: 1.25rem; color: hsl(var(--primary));">Web Development, AI Solutions & Accounting</span>
  </h1>
  <p align="center">
    A modern web application showcasing services, portfolio, and AI-powered tools.
    <br />
    <a href="https://codeandcount.com" target="_blank"><strong>Explore the Live Site »</strong></a>
  </p>
</div>

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15.x-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Genkit](https://img.shields.io/badge/Genkit-AI-orange?style=for-the-badge&logo=google-cloud&logoColor=white)

</div>

---

## 🚀 Overview

**CodeAndCount.com** is a digital agency's official website, built as a comprehensive showcase of services spanning web development, AI integration, and professional accounting. The platform is designed not just as a portfolio but as an interactive experience, featuring AI-powered tools and classic browser-based games.

## ✨ Key Features

-   **Modern Tech Stack**: Built with the Next.js 15 App Router for optimal performance and developer experience.
-   **AI-Powered Tools**:
    -   **SEO Optimizer**: Rewrites content with target keywords to boost search engine rankings.
    -   **Image Generator**: Creates stunning visuals from text prompts using AI.
-   **Retro Game Zone**: A collection of classic browser games for a fun, interactive break.
-   **Dynamic Content**: Features a full-fledged blog, a filterable portfolio of work, and detailed service pages.
-   **Responsive & Themed**: Fully responsive design with a sleek, modern UI and support for both light and dark modes.

---

## 🛠️ Tech Stack

| Category          | Technology                                                                                                                                                             |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**     | [Next.js](https://nextjs.org/) (App Router)                                                                                                                            |
| **UI Library**    | [React](https://reactjs.org/)                                                                                                                                          |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                                                                                                                          |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/)                                                                                                                               |
| **UI Components** | [ShadCN UI](https://ui.shadcn.com/)                                                                                                                                      |
| **AI / GenAI**    | [Google AI & Genkit](https://firebase.google.com/docs/genkit)                                                                                                            |
| **Animations**    | [GSAP](https://gsap.com/) & [Framer Motion](https://www.framer.com/motion/)                                                                                              |
| **Deployment**    | [Vercel](https://vercel.com/)                                                                                                                                            |

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
-   npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add any necessary API keys (e.g., for Google AI).
    ```
    GEMINI_API_KEY=your_api_key_here
    ```

### Running the Application

1.  **Run the development server:**
    This command starts the Next.js application.
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) in your browser.

2.  **Run the Genkit development server (for AI flows):**
    In a separate terminal, run this command to start the Genkit server, which powers the AI tools.
    ```bash
    npm run genkit:watch
    ```

---

## 📂 Project Structure

A brief overview of the key directories in this project:

```
/
├── src/
│   ├── app/                # Next.js App Router: pages and layouts
│   ├── ai/                 # Genkit flows and AI-related logic
│   ├── components/         # Shared React components (UI, layout, etc.)
│   ├── lib/                # Shared libraries, data, and utility functions
│   ├── hooks/              # Custom React hooks
│   └── styles/             # Global styles
├── public/                 # Static assets (images, fonts)
├── next.config.ts          # Next.js configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` file for more information.

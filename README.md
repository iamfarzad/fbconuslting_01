# FB Consulting - Unified Portfolio & AI Education Platform

This repository contains the unified codebase for the FB Consulting website, merging the original consulting portfolio with AI chat capabilities, an AI builder workshop, and a research literature explorer.

## Features

- 🚀 Modern consulting portfolio showcasing services and expertise.
- 💬 AI-powered chat with Google Gemini integration (backend).
- 🛠️ Hands-on AI Builder Workshop with step-by-step guides.
- 📖 Curated AI Research Literature Explorer.
- ⚡ Optimized performance using Next.js 14 App Router.
- 🎨 Modern UI built with Tailwind CSS and shadcn/ui.
- ✨ Animations powered by Framer Motion.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** Tailwind CSS + shadcn/ui
- **AI Backend:** Google Gemini API (@google/generative-ai)
- **Type Safety:** TypeScript
- **Animation:** Framer Motion
- **State Management (Chat):** @copilotkit/react-core (potentially)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/fbconsulting.git
    cd fbconsulting
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Copy the example environment file and populate it with your API keys and configurations (e.g., Google Gemini API Key).
    ```bash
    cp .env.example .env.local
    # Edit .env.local with your keys
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages & API routes
│   ├── (main pages)/    # e.g., about/, contact/, services/, etc.
│   ├── workshop/        # AI Builder Workshop pages ([level]/[stepId])
│   └── resources/       # Resource pages (literature/)
│   └── api/             # Backend API routes (e.g., chat/)
├── components/          # React components (UI, layout, features)
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Header, Footer, etc.
│   ├── courses/         # Workshop specific components
│   └── resources/       # Literature explorer components
├── data/                # Static data (e.g., literature-data.ts)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions (utils.ts, etc.)
├── providers/           # Context providers (ThemeProvider, etc.)
├── styles/              # Global styles (globals.css)
└── types/               # TypeScript type definitions
```

## Quality Assurance

This project includes a verification system to help ensure code quality and proper integration during development. See [VERIFICATION.md](VERIFICATION.md) for details on the available checks.

### Running Verifications

Example checks (refer to `VERIFICATION.md` and `scripts/` for all available scripts):
```bash
./scripts/verify_all.sh          # Run all checks (if configured)
./scripts/fix_typescript.sh      # Attempt to fix TS issues
# Add other relevant verification script examples here if needed
```

## Contributing

1.  Create a feature branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
2.  Make your changes.
3.  Run relevant verification checks (e.g., `npm run lint`, `npx tsc --noEmit`).
4.  Create a pull request.

## Contributors

- FB Consulting team
- Open source contributors

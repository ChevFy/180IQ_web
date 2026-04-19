# 180 IQ Web

A fast math puzzle web app where you combine given digits to reach a target number.

This project was vibe-coded with Claude Sonnet.

## Overview

In each round, you get:

- A target number (2-digit or 3-digit)
- A set of random digits (4, 5, or 6 numbers)
- A countdown timer

Your goal is to build an expression that hits the target exactly.

Supported operations in the game and solver:

- Basic arithmetic: `+ - * /`
- Power: `^`
- Square root: `sqrt`
- Factorial: `n!`
- Sigma: `Σn = 1 + 2 + ... + n`

## Features

- Bilingual UI: Thai and English
- Configurable timer with presets and custom value
- Adjustable difficulty by target digit length and number count
- One-click reroll for a new puzzle
- Built-in solver with top simplest exact solutions
- Closest-match fallback when no exact answer is found
- Optional sound alarm on time-up
- Mobile-first layout with desktop support

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Getting Started

### 1) Install dependencies

```bash
pnpm install
```

### 2) Run the development server

```bash
pnpm dev
```

Then open `http://localhost:3000` in your browser.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## How to Play

1. Choose timer, target digits, and number count.
2. Press **Start**.
3. Use all provided numbers once to hit the target.
4. If you get stuck, press **Show solution**.
5. Use **New puzzle** to generate another round.

## Solver Notes

The solver searches in operation tiers to prefer simpler answers first:

1. `+ - * /`
2. Add `^`
3. Add `sqrt`
4. Add `n!`
5. Add `Σ`

It returns up to 5 exact solutions, sorted by simplicity.
If no exact solution is found within the time budget, it returns the closest result.

## Project Structure

- `app/page.tsx` - Main game flow and state
- `app/_components/` - UI components
- `app/_lib/puzzle.ts` - Puzzle generator
- `app/_lib/solver.ts` - Solver engine
- `app/_lib/strings.ts` - Thai/English UI strings

## License

Private project.

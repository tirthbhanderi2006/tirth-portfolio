# 🤠 Tirth Bhanderi — Portfolio

A **Red Dead Redemption 2** inspired personal portfolio website built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**. The entire UI is themed around the Wild West — complete with wanted posters, collector's cards, case files, and a telegram office.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## 🎨 Theme & Design

The portfolio draws heavy inspiration from **Red Dead Redemption 2's** old-west aesthetic:

- **Wanted Poster Hero** — The landing section is styled as a classic "WANTED" bounty poster with a sepia-toned profile photo, ornamental corners, and an "OPEN TO WORK" bounty stamp
- **Collector's Cards (Skills)** — Technologies are presented as collectible cigarette cards with corner accents and paper textures
- **Case Files (Projects)** — Each project is a case file with a "SOLVED" stamp overlay, opening into a detailed evidence modal
- **Academic Records** — Education displayed on timeline-style pinned documents with paper clips
- **Work History** — Experience entries styled as official western records with badge seals
- **Telegram Office (Contact)** — Contact section designed as a frontier telegraph station
- **Western Typography** — Uses the **Rye** font for headings and a typewriter font for body text
- **Aged Paper Textures** — Warm `#e3dac9` background with subtle paper grain overlays
- **RDR2 Color Palette** — Deep red (`#8a0303`), dark ink black, and gold accents
- **Typewriter Effect** — Animated typewriter text on the hero section
- **Loading Screen** — A deer/stag icon loading animation reminiscent of RDR2's wildlife encounters

---

## ✨ Features

- **Scroll-Spy Navigation** — Navbar highlights the active section as you scroll through the page
- **Responsive Design** — Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations** — Hover effects, card lifts, subtle rotations, and micro-interactions
- **Interactive Project Modal** — Click any case file to inspect full project details, highlights, and tech stack
- **Downloadable Resume** — Quick-access resume download button on the hero section
- **Social Links** — LinkedIn, GitHub, Instagram, and email all integrated

---

## 🛠️ Tech Stack

| Category       | Technologies                                       |
| -------------- | -------------------------------------------------- |
| **Framework**  | Next.js 16 (App Router)                            |
| **UI Library** | React 19                                           |
| **Language**   | TypeScript 5                                       |
| **Styling**    | Tailwind CSS 4, PostCSS, CSS Variables             |
| **Icons**      | React Icons (Simple Icons, Hero Icons, Game Icons) |
| **Fonts**      | Rye (Western headings), Typewriter (body text)     |
| **Linting**    | ESLint 9 with eslint-config-next                   |

---

## 📁 Project Structure

```
tirth-portfolio/
├── app/
│   ├── globals.css       # Global styles, RDR2 theme variables & western utilities
│   ├── icon.png          # Favicon
│   ├── layout.tsx        # Root layout with metadata & fonts
│   └── page.tsx          # Main portfolio page (all sections)
├── data/
│   └── portfolio.ts      # Centralized portfolio data (info, skills, projects, etc.)
├── public/
│   ├── projects/         # Project screenshots
│   ├── resume/           # Downloadable resume
│   └── tirth.jpeg        # Profile photo
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── next.config.ts        # Next.js configuration
└── package.json
```

---

## 🏠 Sections

| Section             | RDR2 Theme                  | Description                                     |
| ------------------- | --------------------------- | ----------------------------------------------- |
| **Home**            | Wanted Poster               | Hero with profile photo, bio, and CTA buttons   |
| **Skills**          | Collector's Cards           | Languages, frameworks, and satchel items (tools) |
| **Academic**        | Academic Records            | Education timeline with pinned documents        |
| **Projects**        | Case Files                  | Project cards with "SOLVED" stamps and modals   |
| **Work**            | Work History                | Experience timeline with badge seals            |
| **Contact**         | Telegram Office             | Email, phone, and social links                  |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/tirthbhanderi2006/tirth-portfolio.git

# Navigate to the project directory
cd tirth-portfolio

# Install dependencies
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📬 Contact

- **Email:** [bhanderitirth940@gmail.com](mailto:bhanderitirth940@gmail.com)
- **LinkedIn:** [linkedin.com/in/tirth-bhanderi-345763289](https://www.linkedin.com/in/tirth-bhanderi-345763289/)
- **GitHub:** [github.com/tirthbhanderi2006](https://github.com/tirthbhanderi2006)
- **Instagram:** [instagram.com/tirth_bhanderi_7_](https://www.instagram.com/tirth_bhanderi_7_/)

---

## 📄 License

This project is open-source and available for personal use and reference.

---

> *"I have a plan... to write great code."* — Built with ❤️ by **Tirth Bhanderi**

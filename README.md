# Horizon Website

A professional, high-performance static website for GitHub Pages featuring a dark blue theme, smooth animations, and cursor glow effect.

![Horizon Website](https://img.shields.io/badge/Horizon-Website-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan?style=for-the-badge&logo=tailwindcss)

## Features

- **Modern Design**: Dark blue theme with glassmorphism cards and gradient accents
- **Smooth Animations**: Framer Motion powered transitions and hover effects
- **Cursor Glow Effect**: Subtle radial gradient that follows the mouse cursor
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Static Export**: Ready for GitHub Pages deployment
- **No Emojis**: Professional, clean aesthetic throughout

### Sections

1. **Hero Section** - High-impact headline with animated background
2. **Status Indicators** - Live-looking detection status and system status
3. **Shop** - Product pricing cards with hover effects
4. **Download** - Clean download cards for all platforms
5. **FAQ** - Accordion-style questions with smooth animations
6. **Testimonials** - User review carousel
7. **Changelog** - Timeline showing recent updates
8. **Discord Integration** - Community invitation section
9. **Contact/Support** - Support options with response times

## Technology Stack

- **Framework**: Next.js 15 (App Router) with Static Export
- **Styling**: Tailwind CSS 3
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Inter (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd horizon-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

To build the static site for GitHub Pages:

```bash
npm run build
```

The static files will be generated in the `dist` folder.

## Deployment to GitHub Pages

1. Update `next.config.ts` with your repository name:
```typescript
const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/your-repo-name', // Add this for GitHub Pages
  images: {
    unoptimized: true,
  },
};
```

2. Build the project:
```bash
npm run build
```

3. Push the `dist` folder contents to your repository's `gh-pages` branch, or configure GitHub Actions for automatic deployment.

## Project Structure

```
horizon-website/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles and Tailwind imports
│   │   ├── layout.tsx      # Root layout with Navbar and Footer
│   │   └── page.tsx        # Main page composing all sections
│   ├── components/
│   │   ├── Navbar.tsx      # Responsive navigation
│   │   ├── Footer.tsx      # Site footer with links
│   │   └── CursorGlow.tsx  # Cursor following glow effect
│   └── sections/
│       ├── Hero.tsx        # Hero section with CTA
│       ├── StatusIndicators.tsx  # Status cards and statistics
│       ├── Shop.tsx        # Pricing plans
│       ├── Download.tsx    # Download cards
│       ├── FAQ.tsx         # Accordion FAQ
│       ├── Testimonials.tsx # User reviews
│       ├── Changelog.tsx   # Update timeline
│       ├── Discord.tsx     # Discord CTA
│       └── Contact.tsx     # Support options
├── public/                 # Static assets
├── package.json
├── tailwind.config.ts      # Tailwind configuration
├── next.config.ts          # Next.js configuration
└── tsconfig.json
```

## Customization

### Colors
The color scheme is defined in `tailwind.config.ts`:
- Background: `#0f172a` (Slate 900)
- Primary: `#3b82f6` (Blue 500)
- Secondary: `#06b6d4` (Cyan 500)

### Content
Update the content in each section file under `src/sections/` to match your product details.

## License

This project is proprietary and confidential.

---

Built with Next.js and Tailwind CSS.

# Headline Widget Job Task

A Next.js application for creating customizable headline widgets with advanced text styling features, built as a job task. This project allows users to style headlines with options for font, color, gradient, text effects, and per-word or selected text styling, with real-time preview and export capabilities.

## Features

- **Typography Controls**: Adjust font family, size, weight, letter spacing, and line height.
- **Color & Gradient**: Apply solid colors or gradients with customizable directions and colors.
- **Advanced Effects**: Add text stroke, hover glow, per-letter animations, and background highlights.
- **Word Styling**: Style individual words by clicking on them (e.g., color, font-weight, underline).
- **Selected Text Styling**: Style specific text selections with color, font-weight, font-size, and underline.
- **Export Options**: Export styles as JSON or copy CSS and HTML to the clipboard.
- **Real-Time Preview**: See changes instantly in a live preview panel.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React framework for server-side rendering and static site generation)
- **Styling**: Tailwind CSS (via `className` attributes)
- **Components**: shadcn/ui (for UI components like Card, Input, Slider, Select, Switch, Button, etc.)
- **Animation**: Framer Motion (for text animations)
- **Fonts**: Geist font family (optimized using `next/font`)
- **TypeScript**: For type-safe development
- **Dependencies**: Managed via npm

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)
- **Git**: For cloning the repository

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/mohinranait/Headline-Widget-job-task.git
   cd Headline-Widget-job-task
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

   This will install all required dependencies listed in `package.json`, including Next.js, React, Framer Motion, shadcn/ui components, and more.

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   This starts the Next.js development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```
Headline-Widget-job-task/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   │── ui/
│   └── headline-widget.tsx
├── constans/
│   └── constance.ts
├── types/
│   └── style.type.ts
├── public/
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## Notes

- **Font Optimization**: The project uses `next/font` to optimize and load the Geist font family (Geist Sans, Geist Mono) from Vercel.
- **TypeScript**: The project is fully typed with TypeScript for better developer experience and error prevention.
- **Gradient Limitation**: When gradients are enabled, individual text color styles may not be visible due to `WebkitBackgroundClip: text`. Disable gradients to see color-based styles.
- **Per-Letter Animation**: Selected text styles take precedence over per-letter animations to ensure visual consistency.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Explore the source code and contribute.
- [Framer Motion Documentation](https://www.framer.com/motion/) - Understand animations used in the widget.
- [shadcn/ui Documentation](https://ui.shadcn.com/) - Details on the UI components used.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about the styling framework.

## Deployment

The easiest way to deploy this Next.js app is via the [Vercel Platform](https://vercel.com). Follow the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for detailed instructions.

1. Push your code to the GitHub repository:

   ```bash
   git push origin main
   ```

2. Connect the repository to Vercel via the Vercel dashboard.
3. Deploy the app with automatic scaling and domain setup.

## Contact

For questions or feedback, please open an issue on the [GitHub repository](https://github.com/mohinranait/Headline-Widget-job-task) or contact the maintainer.

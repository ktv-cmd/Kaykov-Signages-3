# Kaykov Media - Custom Signage Website

A modern, responsive website for Kaykov Media, a professional custom signage company. Built with React, TypeScript, Vite, and Tailwind CSS.

## 🌐 Live Website

**Production URL:** https://kaykovmedia.com

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Form Submissions](#form-submissions)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## ✨ Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI/UX**: Beautiful, modern interface with smooth animations
- **Multi-page Routing**: Main page, Outdoor Signages, and Indoor Signages pages
- **Contact Forms**: Multi-step quote request form with Google Sheets integration
- **Image Galleries**: Interactive service galleries with modal views
- **Social Integration**: WhatsApp integration, Instagram video grid, Google Reviews
- **SEO Optimized**: Meta tags, Open Graph, and Twitter Card support
- **Performance**: Optimized images, lazy loading, and efficient code splitting

## 🛠 Tech Stack

### Core
- **React 18.3** - UI library
- **TypeScript 5.8** - Type safety
- **Vite 5.4** - Build tool and dev server
- **React Router DOM 6.30** - Client-side routing

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Tailwind Animate** - Animation utilities
- **Shadcn/ui** - High-quality React components

### Forms & Validation
- **React Hook Form 7.62** - Form management
- **Zod 3.25** - Schema validation
- **@hookform/resolvers** - Form validation resolvers

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Data & State
- **TanStack Query 5.83** - Data fetching and caching

### Other
- **date-fns 3.6** - Date utilities
- **class-variance-authority** - Component variants

## 📁 Project Structure

```
├── public/                 # Static assets
│   ├── favicon.png        # Site favicon
│   ├── og-image.jpg       # Open Graph preview image
│   └── robots.txt         # SEO robots file
├── src/
│   ├── assets/           # Images and media files
│   │   ├── outdoor/      # Outdoor signage images
│   │   ├── interiar/     # Interior signage images
│   │   └── video signages/ # Video files
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn/ui components
│   │   ├── Hero.tsx     # Hero section
│   │   ├── Services.tsx # Services showcase
│   │   ├── Contact.tsx  # Contact section
│   │   └── ...          # Other components
│   ├── data/            # Data files
│   │   └── signagesVideos.ts
│   ├── lib/             # Utilities
│   │   ├── googleSheets.ts # Google Sheets API
│   │   └── utils.ts     # Helper functions
│   ├── pages/           # Page components
│   │   ├── Index.tsx    # Main page
│   │   ├── OutdoorSignages.tsx
│   │   └── IndoorSignages.tsx
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.ts       # Vite configuration
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
├── netlify.toml         # Netlify deployment config
└── vercel.json          # Vercel deployment config
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (or Bun)
- **npm** or **yarn** or **pnpm** or **bun**

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ktv-cmd/Kaykov-Signages-3.git
cd Kaykov-Signages-3
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server (port 8080)
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Development Server

The development server runs on `http://localhost:8080` by default. It includes:
- Hot Module Replacement (HMR)
- Fast refresh
- Source maps
- Component tagging (in development mode)

### Code Style

- Use TypeScript for all new files
- Follow React best practices
- Use functional components with hooks
- Follow Tailwind CSS utility-first approach
- Use ESLint for code quality

## 🏗 Building for Production

### Build Command

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Build Output

- **Location**: `dist/`
- **Format**: Static HTML, CSS, and JavaScript files
- **Optimization**: Minified, tree-shaken, and optimized assets

## 🚢 Deployment

### Netlify

The project is configured for Netlify deployment:

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The `netlify.toml` file handles redirects for SPA routing

### Vercel

The project is also configured for Vercel:

1. Connect your GitHub repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. The `vercel.json` file handles SPA routing

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist/` folder contents to your hosting provider
3. Configure your server to serve `index.html` for all routes (SPA routing)

## 📄 Pages & Routes

### Main Page (`/`)
- Hero section with CTA buttons
- Services showcase (Outdoor & Indoor)
- Google Reviews
- Instagram video grid
- Why Choose Us section
- Office Showroom
- Process overview
- Our Promise
- Contact section

### Outdoor Signages (`/outdoor-signages`)
- Hero section (without navigation buttons)
- Outdoor signage services only
- All other sections from main page

### Indoor Signages (`/indoor-signages`)
- Hero section (without navigation buttons)
- Indoor signage services only
- All other sections from main page

## 🧩 Components

### Core Components

- **Hero** - Main hero section with headline and CTAs
- **Services** - Service showcase with image galleries
- **Contact** - Contact information and form
- **Process** - Company process steps
- **WhyChooseUs** - Benefits and value propositions
- **GoogleReviews** - Client reviews display
- **InstagramVideoGrid** - Instagram video showcase
- **OfficeShowroom** - Office signage examples
- **OurPromise** - Company promises
- **UseCases** - Use case examples
- **ApplicationForm** - Multi-step quote request form
- **ServiceGallery** - Modal image gallery
- **FloatingContactButtons** - Floating WhatsApp/messenger buttons
- **ScrollToTop** - Scroll to top on route change

### UI Components (Shadcn/ui)

- Button, Card, Badge, Dialog, Input, Label, Textarea, Tooltip, Sonner

## 📝 Form Submissions

### ApplicationForm

The quote request form submits data to Google Sheets via Google Apps Script.

**Form Fields:**
- Step 1: Name, Email, Phone, Company
- Step 2: Service type, Budget range, Timeline
- Step 3: Project details, Images (Base64)

**Integration:**
- Uses `submitToGoogleSheets` utility from `src/lib/googleSheets.ts`
- Requires Google Apps Script deployment (see `GOOGLE_APPS_SCRIPT_FINAL.js`)
- Images are converted to Base64 before submission

## 🔐 Environment Variables

Create a `.env` file in the root directory for environment-specific variables:

```env
# Google Sheets API (if needed)
VITE_GOOGLE_SHEETS_API_URL=your_google_apps_script_url
```

**Note**: Currently, the Google Sheets URL is hardcoded in `src/lib/googleSheets.ts`. Consider moving it to environment variables for better security.

## 🎨 Styling

### Tailwind Configuration

- Custom colors defined in `tailwind.config.ts`
- Primary: Red (#DC2626)
- Accent: Pink/Red (#E11D48)
- Neon: Bright accent color
- Custom animations and utilities

### Responsive Breakpoints

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 📱 Mobile Optimization

- Responsive design for all screen sizes
- Mobile-specific button styles
- Touch-friendly interactions
- Optimized images for mobile
- WhatsApp integration for mobile users

## 🔍 SEO

### Meta Tags

- Title, description, keywords
- Open Graph tags for social sharing
- Twitter Card support
- Favicon and Apple touch icons

### Open Graph Image

- Location: `public/og-image.jpg`
- Recommended size: 1200x630px
- Used for social media previews

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `vite.config.ts`
2. **Build errors**: Clear `node_modules` and reinstall
3. **Routing issues**: Ensure server is configured for SPA routing
4. **Form submission fails**: Check Google Apps Script deployment

## 📚 Additional Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment instructions
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture and design decisions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Kaykov Media.

## 📞 Contact

**Kaykov Media**
- Website: https://kaykovmedia.com
- WhatsApp: +1 (917) 903-3458
- Email: (Check contact section on website)

---

Built with ❤️ for Kaykov Media


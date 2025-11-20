# Architecture Documentation

This document describes the architecture, design decisions, and technical details of the Kaykov Media website.

## 🏛 Architecture Overview

The website is built as a **Single Page Application (SPA)** using React with client-side routing. It follows a component-based architecture with a clear separation of concerns.

### Technology Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Build Tool**: Vite 5.4
- **Routing**: React Router DOM 6.30
- **Styling**: Tailwind CSS 3.4
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Form Management**: React Hook Form + Zod
- **State Management**: React Context + TanStack Query
- **Deployment**: Netlify/Vercel (static hosting)

## 📐 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── ui/             # Shadcn/ui base components
│   ├── Hero.tsx        # Hero section component
│   ├── Services.tsx    # Services showcase
│   └── ...
├── pages/              # Page-level components
│   ├── Index.tsx      # Main landing page
│   ├── OutdoorSignages.tsx
│   └── IndoorSignages.tsx
├── lib/                # Utility functions and helpers
│   ├── googleSheets.ts # Google Sheets API integration
│   └── utils.ts        # General utilities
├── data/               # Static data files
│   └── signagesVideos.ts
├── assets/             # Images, videos, media files
├── App.tsx             # Root component with routing
└── main.tsx            # Application entry point
```

## 🧩 Component Architecture

### Component Hierarchy

```
App
├── QueryClientProvider (TanStack Query)
├── TooltipProvider (Radix UI)
├── Sonner (Toast notifications)
└── BrowserRouter
    └── Routes
        ├── Index Page
        │   ├── Hero
        │   ├── Services
        │   ├── GoogleReviews
        │   ├── InstagramVideoGrid
        │   ├── WhyChooseUs
        │   ├── OfficeShowroom
        │   ├── Process
        │   ├── OurPromise
        │   ├── Contact
        │   └── FloatingContactButtons
        ├── OutdoorSignages Page
        └── IndoorSignages Page
```

### Component Types

1. **Page Components** (`pages/`)
   - Top-level route components
   - Compose multiple sections
   - Handle page-specific logic

2. **Section Components** (`components/`)
   - Reusable sections (Hero, Services, Contact, etc.)
   - Self-contained with their own state
   - Accept props for customization

3. **UI Components** (`components/ui/`)
   - Base UI primitives (Button, Card, Dialog, etc.)
   - Built on Radix UI
   - Highly reusable and customizable

## 🎨 Styling Architecture

### Tailwind CSS Approach

- **Utility-First**: Use Tailwind utility classes
- **Custom Configuration**: Extended in `tailwind.config.ts`
- **Responsive Design**: Mobile-first approach
- **Custom Colors**: Brand colors defined in config

### Design System

**Colors:**
- Primary: `#DC2626` (Red)
- Accent: `#E11D48` (Pink/Red)
- Neon: Bright accent color
- Gray scale for text and backgrounds

**Typography:**
- Headings: Bold, large sizes
- Body: Regular weight, readable sizes
- Responsive font scaling

**Spacing:**
- Consistent spacing scale
- Responsive padding/margins
- Container max-widths

## 🔄 State Management

### Local State
- **React Hooks**: `useState`, `useRef` for component state
- **Form State**: React Hook Form manages form state
- **Modal State**: Local state for dialog open/close

### Global State
- **TanStack Query**: Server state and caching (currently minimal usage)
- **React Context**: Not currently used, but available for global state

### Data Flow
- **Props Down**: Data flows from parent to child
- **Events Up**: Callbacks passed as props
- **No Prop Drilling**: Components receive only needed props

## 🛣 Routing Architecture

### Route Structure

```
/ → Index (Main page)
/outdoor-signages → OutdoorSignages page
/indoor-signages → IndoorSignages page
```

### Routing Implementation

- **Client-Side Routing**: React Router handles navigation
- **SPA Routing**: All routes serve `index.html`
- **Scroll to Top**: Automatic scroll on route change
- **No 404 Page**: All routes redirect to main page

### Route Configuration

Routes are defined in `App.tsx`:
```tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/outdoor-signages" element={<OutdoorSignages />} />
  <Route path="/indoor-signages" element={<IndoorSignages />} />
</Routes>
```

## 📝 Form Handling

### ApplicationForm Component

**Multi-Step Form:**
1. Step 1: Contact information
2. Step 2: Project details
3. Step 3: Additional details and images

**Form Management:**
- React Hook Form for form state
- Zod for schema validation
- Step-by-step navigation
- Image upload with Base64 conversion

**Submission:**
- Submits to Google Sheets via Google Apps Script
- Error handling with toast notifications
- Success feedback to user

## 🖼 Image Handling

### Image Organization

```
src/assets/
├── outdoor/          # Outdoor signage images
├── interiar/         # Interior signage images
└── video signages/   # Video files
```

### Image Optimization

- **Import Strategy**: Images imported as modules
- **Vite Processing**: Vite handles image optimization
- **Base64 Conversion**: Form images converted to Base64
- **Lazy Loading**: Images load on demand

### Image Gallery

- Modal-based gallery component
- Image navigation (next/previous)
- Keyboard support (arrow keys, ESC)
- Touch gestures for mobile

## 🔌 API Integration

### Google Sheets Integration

**Implementation:**
- Google Apps Script deployed as web app
- POST requests to Apps Script URL
- Data formatted and appended to Google Sheet
- Images sent as Base64 strings

**File:** `src/lib/googleSheets.ts`

**Script:** `GOOGLE_APPS_SCRIPT_FINAL.js`

## 🎭 Component Patterns

### Props Pattern

```tsx
interface ComponentProps {
  optional?: boolean;
  required: string;
  callback?: () => void;
}
```

### Conditional Rendering

- Props control component behavior (`hideButtons`, `hideInterior`, etc.)
- Flexible component reuse
- Clean prop interfaces

### Dialog Pattern

- Shadcn/ui Dialog component
- Consistent modal styling
- Accessible (keyboard, screen reader support)

## 🚀 Performance Optimizations

### Code Splitting
- Route-based code splitting (automatic with React Router)
- Lazy loading for heavy components (if needed)

### Asset Optimization
- Vite optimizes images and assets
- Tree shaking removes unused code
- Minification in production builds

### Rendering Optimizations
- React.memo for expensive components (if needed)
- Efficient re-renders
- Optimized image loading

## 🔒 Security Considerations

### Client-Side Security
- No sensitive data in client code
- API URLs can be exposed (consider environment variables)
- Form validation on client and server

### Google Apps Script Security
- CORS configuration
- Input validation
- Rate limiting (consider adding)

## 📱 Responsive Design

### Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile-First Approach

- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions
- Optimized images for mobile

## 🧪 Testing Strategy

### Current State
- No automated tests currently
- Manual testing for features
- Browser testing across devices

### Recommended Testing
- Unit tests for utilities
- Component tests for UI components
- E2E tests for critical flows
- Visual regression tests

## 🔮 Future Improvements

### Potential Enhancements

1. **Performance**
   - Implement lazy loading for images
   - Add service worker for offline support
   - Optimize bundle size further

2. **Features**
   - Blog section
   - Portfolio filtering
   - Advanced search
   - Multi-language support

3. **Developer Experience**
   - Add automated testing
   - Improve error handling
   - Add logging/monitoring
   - Better TypeScript types

4. **SEO**
   - Dynamic meta tags per page
   - Structured data (JSON-LD)
   - Sitemap generation
   - Better image alt texts

## 📚 Code Conventions

### Naming Conventions
- Components: PascalCase (`Hero.tsx`)
- Files: PascalCase for components, camelCase for utilities
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE

### File Organization
- One component per file
- Related components in same directory
- Utilities in `lib/` directory
- Types in component files or separate types file

### Code Style
- TypeScript strict mode
- Functional components with hooks
- ES6+ features
- Consistent formatting (Prettier recommended)

---

Last updated: 2025


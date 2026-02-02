
# Nature-Tech Harmony Portal - Implementation Plan

## Project Overview
A premium, scroll-driven website for a sustainable technology company that fuses cinematic elegance with kinetic typography energy. Features sophisticated animations, a Three.js 3D floating leaf element, and full backend functionality.

---

## Design System

### Color Palette
- **Soft Sage** (#ACC8A2) - Primary accent, interactive elements
- **Deep Olive** (#1A2517) - Primary dark, sophisticated grounding
- **Off-White** (#F8F9F6) - Light backgrounds
- **Warm Gray** (#8B9088) - Secondary text
- **Gold Accent** (#B8A675) - Premium highlights

### Typography
- **Display/Headers**: Instrument Serif (elegant, premium feel)
- **Body**: Inter (clean, highly readable)

---

## Page Sections

### 1. Navigation Bar
- Fixed position with transparency on hero, solid on scroll
- Logo with animated leaf icon
- Navigation links with underline hover animation
- "Start Project" CTA button
- Mobile hamburger menu with full-screen overlay

### 2. Hero Section
- Full viewport height with gradient/video background
- Large animated headline with letter-by-letter reveal
- Subheadline with fade-in effect
- CTA button with hover animations
- **Three.js 3D Floating Leaf** - Interactive element that:
  - Rotates slowly on Y-axis
  - Floats with gentle sine wave motion
  - Tilts toward cursor position
  - Scales and fades as user scrolls
- Scroll indicator at bottom

### 3. Services Section
- Section header with label and title
- 3-column grid of service cards
- Cards with icons, titles, descriptions
- Hover effects (lift, shadow)
- Staggered fade-in animations on scroll

### 4. Process/Approach Section
- Dark background (Deep Olive)
- 4-step numbered process
- Alternating image/text layouts
- Large decorative numbers behind content
- Parallax effect on images
- Staggered reveal animations

### 5. Portfolio/Work Section
- Horizontal scrolling gallery
- Project cards with image, overlay content
- Category, title, and description on each
- Custom scroll controls (arrows)
- Hover scale effects on images

### 6. Statistics Section
- Soft Sage background
- 4-column grid of animated counters
- Numbers count up on scroll into view
- Labels with premium typography

### 7. Testimonials Section
- Testimonial carousel with quotes
- Author info with avatar
- Decorative quotation marks
- Dot navigation
- Auto-rotate with pause on hover

### 8. Call-to-Action Section
- Dark background with subtle particle animation
- Large headline and subheadline
- Premium CTA button with glow effect

### 9. Footer
- 4-column layout
- Branding with logo and tagline
- Services links
- Company links
- Newsletter signup form (functional)
- Social media icons
- Copyright bar

---

## Animations & Interactions

- **Smooth scrolling** with Lenis-style implementation
- **Framer Motion** for all scroll-based animations
- **Fade-in-up** for text and cards
- **Stagger effects** for grid items
- **Parallax** on images
- **Hover effects** on buttons and cards
- **Three.js** for 3D hero element with cursor interaction
- **Reduced motion support** for accessibility

---

## Backend Features (Lovable Cloud)

### Database Tables
- **contacts** - Store contact form submissions
- **newsletter_subscribers** - Store newsletter signups
- **projects** - Portfolio projects (CMS-like)
- **services** - Services offered
- **testimonials** - Client testimonials

### Edge Functions
- **send-contact-email** - Send notification when contact form submitted
- **subscribe-newsletter** - Handle newsletter signups

### Authentication (Optional)
- Admin login for managing content (if CMS needed)

---

## Responsive Design

- **Desktop** (1280px+): Full layouts, 3-4 columns
- **Tablet** (768-1024px): 2 columns, hamburger menu
- **Mobile** (<768px): Single column, stacked layouts, smaller typography

---

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Focus states on all focusable elements
- Sufficient color contrast (WCAG AA)
- Keyboard navigation support
- Prefers-reduced-motion support

---

## Performance

- Lazy loading for images
- Optimized Three.js rendering
- GPU-accelerated animations (transform/opacity)
- Code splitting for heavy libraries

---

## Build Order

1. **Foundation**: Color system, typography, base layout
2. **Navigation**: Fixed header with scroll behavior
3. **Hero**: Background, typography, CTA (without 3D)
4. **Three.js Integration**: 3D floating leaf with interactions
5. **Content Sections**: Services, Process, Portfolio, Stats, Testimonials
6. **CTA & Footer**: Final sections with newsletter form
7. **Backend**: Database tables, edge functions, form integrations
8. **Animations**: Scroll animations, hover effects
9. **Polish**: Responsive tweaks, accessibility, performance optimization

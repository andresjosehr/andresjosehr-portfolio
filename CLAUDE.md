# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Angular 20, featuring a bilingual (Spanish/English) single-page application with PWA capabilities. The portfolio showcases projects, experience, and contact information with smooth animations and responsive design.

## Essential Development Commands

### Development Server
```bash
npm start
# Serves the application at http://localhost:4200
```

### Build Commands
```bash
npm run build                # Standard build
npm run build-portfolio      # Production build (alias)
npm run build:prod           # Production build with base-href for GitHub Pages
npm run deploy               # Build and deploy to GitHub Pages
npm run deploy:ci            # CI-specific deploy command
```

### Code Quality
```bash
npm run lint          # Run TSLint checks
npm test             # Run unit tests with Karma
npm run e2e          # Run end-to-end tests with Protractor
```

## Architecture Overview

### Module Structure
- **HomeModule**: Main landing page with sections (banner, about, jobs, projects, contact)
- **GeneralModule**: Shared components (header, footer, dynamic-button, splash-screen)
- **ArchiveModule**: Projects archive page
- **CoreModule**: Services and core functionality

### Key Services
- **LanguageService**: Handles i18n language switching (ES/EN default)
- **AnalyticsService**: Google Analytics integration
- **AnimationsService**: Custom animations with AOS library
- **ParticlesService**: Particle effects management
- **LoadingService**: Manages loading states
- **IpService**: IP-based services and geolocation

### Component Organization
```
/components/
├── home/               # Main page sections
│   ├── banner/         # Hero section
│   ├── about/          # About section
│   ├── jobs/           # Experience timeline
│   ├── proyects/       # Featured projects
│   ├── more-proyects/  # Additional projects grid
│   └── contact/        # Contact form
├── general/            # Shared components
│   ├── header/         # Navigation header
│   ├── footer/         # Site footer
│   ├── dynamic-button/ # Reusable button component
│   └── splash-screen/  # Loading splash screen
└── archive/            # Projects archive
```

## Internationalization (i18n)

### Language Configuration
- Default language: Spanish (es)
- Supported languages: Spanish (es), English (en)
- Translation files: `/src/assets/i18n/es.json` and `/src/assets/i18n/en.json`
- URL structure: Language code in route parameter (e.g., `/es`, `/en`)

### Adding New Translations
1. Add keys to both `es.json` and `en.json` files
2. Use the translate pipe in templates: `{{ 'key' | translate }}`
3. Use LanguageService.translateService.get() in components

## Styling and UI

### CSS Framework
- Bootstrap 4.5.0 with ng-bootstrap components
- Custom SCSS files for component-specific styling
- Font Awesome 5.14.0 for icons
- Custom fonts: Calibre and SF Mono

### Animation Libraries
- AOS (Animate On Scroll) for scroll-triggered animations
- Lenis for smooth scrolling
- Custom Angular animations for component transitions

## Assets and Static Files

### Directory Structure
```
/assets/
├── i18n/           # Translation files
├── images/         # Portfolio images and icons
├── fonts/          # Custom fonts (Calibre, SF Mono)
├── cv/             # Resume/CV files
└── scss/           # Global SCSS files
```

### Image Optimization
- Use WebP format when possible
- Lazy loading implemented for performance
- Multiple image sizes for responsive design

## PWA Configuration

### Service Worker
- Enabled in production builds
- Configured in `ngsw-config.json`
- Caches assets and API responses

### Manifest
- Configured in `src/manifest.webmanifest`
- Includes app icons and theme colors

## Testing Guidelines

### Unit Tests
- Each component has corresponding `.spec.ts` file
- Services include comprehensive unit tests
- Use Angular testing utilities (TestBed, ComponentFixture)

### E2E Tests
- Located in `/e2e/` directory
- Use Protractor for end-to-end testing
- Test critical user flows and navigation

## Deployment

### GitHub Pages
- Automated deployment with `npm run deploy`
- Custom domain: andresjosehr.com
- Base href configured for GitHub Pages routing

### Build Optimization
- Bundle budgets: 2MB warning, 5MB error for initial bundle
- Production builds include minification and tree-shaking
- Source maps available for debugging

## Development Notes

### Browser Compatibility
- Supports modern browsers with ES2015+ features
- Polyfills configured for broader compatibility
- Progressive enhancement approach

### Performance Considerations
- Lazy loading for images and non-critical assets
- Efficient change detection strategies
- Bundle splitting for optimal loading

### Code Style
- Follow Angular style guide conventions
- Use TypeScript strict mode
- Consistent naming patterns for components and services
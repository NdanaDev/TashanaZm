# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

TashanaZm is a professional portfolio website showcasing Tashana Zm as a multi-talented professional offering services as:
- Event Show Host
- TV Presenter  
- Recording Artist
- Commercial and Editorial Model

The website is built as a static HTML/CSS/JavaScript application with a modern, responsive design featuring scroll-snap navigation and interactive animations.

## Development Commands

### Local Development Server
```powershell
# Using VS Code Live Server extension (configured on port 5501)
# Open Home_page.html in VS Code and click "Go Live" button
# Or use any other static file server:
npx http-server . -p 8080
```

### File Structure Validation
```powershell
# Check for broken image links
Get-ChildItem -Path "Pictures\*" -Include "*.jpg", "*.png" | ForEach-Object { Write-Host $_.Name }

# Validate HTML files
# Use online validator or install html5validator
# pip install html5validator
# html5validator *.html
```

### Image Optimization
```powershell
# Check image sizes (for performance optimization)
Get-ChildItem -Path "Pictures\*" -Include "*.jpg", "*.png" | ForEach-Object { 
    $size = [math]::Round($_.Length / 1MB, 2)
    Write-Host "$($_.Name): $size MB"
}
```

## Architecture Overview

### Core Structure
- **Single Page Application (SPA)**: The main experience is in `Home_page.html` with scroll-snap sections
- **Detail Pages**: Individual HTML files for each service area with detailed portfolios
- **Modular CSS**: Service-specific stylesheets complement the main `styles.css`
- **Progressive Enhancement**: JavaScript adds interactivity while maintaining fallback functionality

### Key Components

#### 1. Main Landing Page (`Home_page.html`)
- **Hero Section**: Animated intro with gradient background
- **Service Sections**: Full-viewport scroll-snap sections for each service
- **Image Handling**: Responsive images with srcset and overlay effects
- **Navigation**: Smooth scroll between sections with touch gesture support

#### 2. Detail Pages Architecture
Each service has a dedicated detail page following this pattern:
- `[service]-details.html` - Main structure
- `[service]-details.css` - Service-specific styling  
- `[service]-details.js` - Interactive functionality

#### 3. JavaScript Functionality
- **Scroll Management**: `script.js` handles scroll-snap behavior and touch gestures
- **Animation System**: Intersection Observer for scroll-triggered animations
- **Touch Support**: Custom swipe gestures for mobile navigation
- **Progressive Enhancement**: Graceful fallbacks for older browsers

#### 4. CSS Architecture
- **Mobile-First Responsive Design**: Breakpoints at 480px, 768px, 1200px
- **Modern CSS Features**: CSS Grid, Flexbox, scroll-snap, backdrop-filter
- **Performance Optimizations**: Hardware-accelerated animations, reduced motion support
- **Accessibility**: High contrast ratios, focus states, screen reader support

### File Naming Conventions
- Service detail pages: `[service-name]-details.html/css/js`
- Images: Organized in `Pictures/` folder with descriptive names
- Main files: `Home_page.html` (entry point), `styles.css` (global styles), `script.js` (core functionality)

### Image Management
- All images stored in `Pictures/` directory
- Multiple formats supported (.jpg, .png, .mp4 for videos)
- Responsive image handling with srcset attributes
- Overlay effects for text readability

### Dependencies
- **External CDNs**: 
  - Google Fonts (Lato, Montserrat)
  - Font Awesome icons
  - Bootstrap (on detail pages)
  - Lightbox2 for image galleries
  - Swiper.js for carousels
- **No Build System**: Direct HTML/CSS/JS without bundling
- **VS Code Integration**: Live Server extension for development

### Browser Support Strategy
- Modern browsers with fallbacks for older versions
- Scroll-snap with JavaScript fallback
- CSS Grid with Flexbox fallback
- Modern CSS features with vendor prefixes

## Development Workflow

1. **Local Testing**: Use VS Code Live Server on port 5501 (configured in `.vscode/settings.json`)
2. **Cross-browser Testing**: Test scroll behavior and animations across different browsers
3. **Mobile Testing**: Verify touch gestures and responsive breakpoints
4. **Image Optimization**: Compress images before adding to `Pictures/` folder
5. **Accessibility Testing**: Verify keyboard navigation and screen reader compatibility

## Key Technical Considerations

- **Performance**: Large images may affect load times - consider compression
- **Scroll Behavior**: Custom scroll-snap implementation requires testing across devices  
- **Touch Gestures**: Mobile swipe functionality is custom-built and may need device-specific adjustments
- **Animation Performance**: Uses transform and opacity for hardware acceleration
- **SEO**: Meta tags and semantic HTML structure for search optimization

## Common Issues & Solutions

- **Scroll-snap not working**: Fallback JavaScript handles smooth scrolling
- **Images not loading**: Check file paths in `Pictures/` directory
- **Touch gestures unresponsive**: Adjust swipe threshold in `script.js`
- **Animation jank**: Check for hardware acceleration and reduce motion preferences
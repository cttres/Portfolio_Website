# Design Style Guide - Carlos Torres Portfolio

## Design Philosophy

### Visual Language
- **Modern Data Aesthetic**: Clean, professional, and technically sophisticated
- **Interactive Storytelling**: Every element should invite exploration and engagement
- **Performance-Driven**: Fast-loading, smooth animations, and responsive design
- **Accessibility First**: High contrast, readable typography, and keyboard navigation

### Color Palette
- **Primary**: Deep Navy (#1a1d29) - Professional, trustworthy, tech-focused
- **Secondary**: Electric Blue (#00d4ff) - Innovation, data, digital transformation
- **Accent**: Warm Coral (#ff6b6b) - Energy, passion, results-driven
- **Neutral**: Light Gray (#f8f9fa) - Clean background, content focus
- **Text**: Charcoal (#2c3e50) - High contrast, excellent readability

### Typography
- **Display Font**: "Inter" - Modern, technical, highly readable
- **Body Font**: "Source Sans Pro" - Professional, clean, web-optimized
- **Code Font**: "JetBrains Mono" - Technical documentation and code snippets
- **Hierarchy**: Large headings (48px+), medium subheadings (24px), readable body text (16px)

## Visual Effects & Styling

### Background Effects
- **Animated Particle System**: Subtle floating particles using p5.js representing data points
- **Gradient Flow**: Subtle animated gradient overlay creating depth and movement
- **Shader Effects**: Minimal shader-park implementation for sophisticated background textures

### Animation Strategy
- **Scroll Animations**: Subtle reveal animations using Anime.js (16-24px vertical translation)
- **Hover Effects**: 3D tilt, shadow expansion, and color transitions
- **Loading States**: Skeleton screens and progressive image loading
- **Micro-interactions**: Button press feedback, form validation, tooltip reveals

### Header Design
- **Navigation**: Fixed header with glass morphism effect
- **Logo**: Animated text treatment with color cycling
- **Menu**: Smooth slide-in navigation with backdrop blur

### Content Sections
- **Grid System**: 12-column responsive grid with consistent spacing
- **Cards**: Elevated design with subtle shadows and hover animations
- **Images**: Rounded corners, lazy loading, and progressive enhancement
- **Data Visualizations**: Consistent color scheme, smooth transitions, interactive legends

## Component Styling

### Project Cards
- **Layout**: Image top, content bottom with consistent aspect ratios
- **Hover State**: Lift effect with shadow expansion and slight rotation
- **Technology Tags**: Color-coded badges with icons
- **Metrics**: Animated counters and progress bars

### Skills Visualization
- **Radar Chart**: Interactive with hover details and smooth transitions
- **Progress Bars**: Animated fill with gradient effects
- **Badges**: Certification and achievement displays with hover animations

### Contact Section
- **Form Design**: Clean inputs with floating labels and validation states
- **Social Links**: Animated icons with hover effects
- **Availability Status**: Real-time indicator with color coding

## Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px (Single column, stacked navigation)
- **Tablet**: 768px - 1024px (Two column grid, condensed navigation)
- **Desktop**: 1024px+ (Full multi-column layout, expanded navigation)

### Mobile Optimizations
- **Touch Targets**: Minimum 44px for all interactive elements
- **Gestures**: Swipe navigation for project carousels
- **Performance**: Reduced animation complexity on mobile devices
- **Typography**: Optimized font sizes for smaller screens

## Technical Implementation

### CSS Framework
- **Tailwind CSS**: Utility-first approach for rapid development
- **Custom Components**: Reusable component classes for consistency
- **CSS Variables**: Dynamic theming and consistent color management

### Performance Considerations
- **Critical CSS**: Inline critical styles for above-the-fold content
- **Font Loading**: Optimized web font loading with fallbacks
- **Image Optimization**: WebP format with JPEG fallbacks
- **Animation Performance**: GPU-accelerated transforms and opacity changes

### Browser Support
- **Modern Browsers**: Full feature support (Chrome 90+, Firefox 88+, Safari 14+)
- **Fallbacks**: Graceful degradation for older browsers
- **Progressive Enhancement**: Core functionality without JavaScript
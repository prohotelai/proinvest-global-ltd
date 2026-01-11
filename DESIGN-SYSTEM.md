# PROINVEST GLOBAL LTD - Enterprise Design System
## Visual Identity & UI Guidelines

---

## 🎨 COLOR SYSTEM

### Primary Palette

#### Deep Navy Blue (Primary Brand Color)
**Purpose**: Trust, enterprise credibility, financial stability
```
navy-500: #002869 (Primary)
navy-600: #002054 (Darker)
navy-700: #00183f (Deepest)
```
**Usage**: Headers, primary CTAs, trust sections, footer

#### Graphite (Secondary Brand Color)
**Purpose**: Stability, seriousness, technical depth
```
graphite-500: #2d3748 (Primary)
graphite-600: #24303f (Darker)
graphite-700: #1b2430 (Deepest)
```
**Usage**: Body text, secondary elements, borders

#### Intelligent Teal (Accent Color)
**Purpose**: AI/Technology innovation, call-to-action
```
teal-500: #00afaf (Primary)
teal-600: #008c8c (Hover state)
```
**Usage**: Accent highlights, interactive elements, AI-related sections (use sparingly)

### Support Colors

#### Neutral Backgrounds
```
neutral-50: #fafafa (Primary background)
neutral-100: #f5f5f5 (Secondary background)
neutral-200: #e5e5e5 (Borders)
```

### Accessibility
- All text meets WCAG AA standards (4.5:1 minimum)
- Navy on white: 12.5:1
- Graphite on white: 11.8:1

---

## 📝 TYPOGRAPHY SYSTEM

### Font Stack
**Primary**: Inter (Google Fonts)
**Fallback**: SF Pro Display, IBM Plex Sans, system-ui

### Font Hierarchy

#### Hero Headlines (Homepage)
- **Size**: 64px (4rem) desktop, 40px (2.5rem) mobile
- **Weight**: Bold (700)
- **Line Height**: 1.1
- **Letter Spacing**: -0.02em
- **Color**: navy-700
- **Example**: "AI that runs real hospitality operations"

#### Section Titles
- **Size**: 40px (2.5rem) desktop, 30px (1.875rem) mobile
- **Weight**: SemiBold (600)
- **Line Height**: 1.2
- **Letter Spacing**: -0.01em
- **Color**: navy-600

#### Subsection Titles
- **Size**: 24px (1.5rem)
- **Weight**: SemiBold (600)
- **Line Height**: 1.3
- **Color**: graphite-700

#### Body Text
- **Size**: 18px (1.125rem)
- **Weight**: Regular (400)
- **Line Height**: 1.7
- **Color**: graphite-600
- **Max Width**: 800px (for optimal readability)

#### Small Text / Captions
- **Size**: 14px (0.875rem)
- **Weight**: Regular (400)
- **Color**: graphite-500

---

## 📐 LAYOUT SYSTEM

### Grid
- **12-column grid** system
- **Container Max Width**: 1200px
- **Gutter**: 24px (1.5rem)
- **Margins**: 80px desktop, 24px mobile

### Spacing Scale
```
section-spacing: 96px (6rem) desktop, 48px (3rem) mobile
element-spacing: 24px (1.5rem)
component-spacing: 16px (1rem)
tight-spacing: 8px (0.5rem)
```

### Responsive Breakpoints
```
mobile: < 768px
tablet: 768px - 1024px
desktop: > 1024px
wide: > 1440px
```

---

## 🧩 COMPONENT SPECIFICATIONS

### Primary Button (CTA)
```tsx
Background: navy-500
Text: white
Padding: 16px 32px
Font Size: 18px
Font Weight: 600
Border Radius: 8px
Hover: navy-600
Transition: all 0.2s ease
Shadow: enterprise shadow
```

### Secondary Button
```tsx
Background: transparent
Border: 2px solid navy-500
Text: navy-500
Padding: 14px 30px
Hover: Background navy-50
```

### Accent Button (AI-related)
```tsx
Background: teal-500
Text: white
Hover: teal-600
Use: Sparingly for AI-specific actions
```

### Card Component
```tsx
Background: white
Border: 1px solid neutral-200
Border Radius: 12px
Padding: 32px
Shadow: enterprise shadow
Hover: enterprise-lg shadow
Transition: all 0.3s ease
```

### Trust Badge
```tsx
Background: neutral-100
Border: 1px solid neutral-200
Border Radius: 8px
Padding: 16px 24px
Icon: teal-500
Text: graphite-700
```

---

## 📄 PAGE TEMPLATES

### Homepage Hero Section
```
Background: White
Content Max Width: 1200px
Padding Top: 120px (desktop), 80px (mobile)
Padding Bottom: 80px

Elements:
1. Headline (navy-700, hero font size)
2. Tagline below (graphite-600, 24px)
3. Short description (graphite-600, 18px, max 600px width)
4. Primary CTA button
5. Optional: Subtle data visualization or trust logos
```

### Section Pattern (Standard)
```
Background: Alternating white / neutral-50
Padding: 96px vertical (desktop), 48px (mobile)

Structure:
1. Section title (centered or left-aligned)
2. Optional subtitle (max 800px)
3. Content grid (2 or 3 columns)
4. Optional CTA at bottom
```

### Feature Section Pattern
```
Layout: 2-column grid (image/visual + content)
Image Side: Abstract AI visual or data flow
Content Side:
  - Feature title (subsection size)
  - Benefit-focused description
  - List of capabilities
  - Optional CTA link
```

---

## 🎭 VISUAL ELEMENTS

### Icons
- **Style**: Outlined, minimal
- **Stroke Width**: 2px
- **Size**: 24px standard, 32px for hero sections
- **Color**: teal-500 for accent, graphite-600 for neutral

### Data Visualizations
- **Style**: Abstract, geometric
- **Colors**: Navy gradient with teal accents
- **Purpose**: Represent AI processing, not actual data
- **Placement**: Hero background, section dividers

### Dividers
- **Standard**: 1px solid neutral-200
- **Accent**: 2px solid teal-500 (sparingly)

---

## 🌍 TRUST SIGNALS

### Company Registration Block
```tsx
Background: neutral-100
Border: 1px solid neutral-200
Border Radius: 8px
Padding: 24px
Layout: Grid with icon + info pairs

Content:
- UK Company Number: 16851428
- Registered Address
- Business Type: SaaS
- Industries: Hospitality & F&B
```

### Trust Badge Layout
```tsx
Display: Inline grid
Badges:
- "UK Registered" (with UK flag icon)
- "Applied AI" (with chip icon)
- "Enterprise SaaS" (with cloud icon)
```

---

## 📱 MOBILE OPTIMIZATION

### Mobile-Specific Rules
- Single column layouts
- Reduce font sizes by 30-40%
- Increase line height by 0.1
- Stack all grids vertically
- Reduce section padding by 50%
- Touch targets minimum 44x44px

---

## ♿ ACCESSIBILITY

### Contrast Requirements
- All text: Minimum 4.5:1 (WCAG AA)
- Large text: Minimum 3:1
- Interactive elements: Clear focus states

### Focus States
```tsx
Outline: 2px solid teal-500
Offset: 2px
Border Radius: Inherit from element
```

### Screen Reader Considerations
- Semantic HTML structure
- ARIA labels on interactive elements
- Alt text for all images
- Skip navigation link

---

## 🚫 DESIGN DON'TS

### Avoid:
❌ Playful gradients
❌ Cartoon illustrations
❌ Stock photos of people
❌ Decorative fonts
❌ Bright, saturated colors
❌ Busy backgrounds
❌ Marketing fluff language
❌ Startup clichés

### Do:
✅ Clean, confident layouts
✅ Abstract, geometric visuals
✅ Factual, declarative copy
✅ Generous white space
✅ Purposeful animations
✅ Enterprise credibility
✅ Data-driven aesthetics

---

## 🎯 DESIGN PRINCIPLES

1. **Simplicity = Authority**
   - Less is more
   - Every element must earn its place

2. **Trust Through Restraint**
   - Avoid visual noise
   - Use accent color sparingly

3. **Global Enterprise Tone**
   - Design for CTOs, investors, government
   - Not for startups or consumers

4. **Confidence Over Decoration**
   - Bold, clear hierarchy
   - No unnecessary embellishments

5. **Data-Driven Aesthetics**
   - Suggest intelligence through design
   - Abstract representations of AI

---

## 📦 COMPONENT LIBRARY

### Ready-to-Use Components
1. Primary/Secondary/Accent Buttons
2. Enterprise Cards
3. Trust Badges
4. Feature Blocks
5. Section Headers
6. Footer (corporate style)
7. Navigation (minimal, clear)
8. Form Elements (serious, accessible)

---

## 🔍 REVIEW CHECKLIST

Before deploying any page, verify:
- [ ] Navy is primary color
- [ ] Teal used sparingly (max once per section)
- [ ] No playful elements
- [ ] Typography hierarchy clear
- [ ] White space generous
- [ ] Mobile responsive
- [ ] Accessibility standards met
- [ ] Trust signals present
- [ ] CTA clear and actionable
- [ ] Feels enterprise-grade

---

**Design Authority**: Enterprise-First  
**Target Review**: CTOs, Investors, Government Operators  
**Credibility Level**: Bank/Finance Grade  
**Global Scale**: Ready for International Markets  

---

This design system ensures PROINVEST GLOBAL LTD is perceived as:
- **Credible** (within 5 seconds)
- **Stable** (enterprise-grade)
- **Intelligent** (AI authority)
- **Global** (internationally trustworthy)

---
name: SarvUday Design System
description: Frontend design specification for the Mindful mental health app, defining colors, typography, shapes, and layout based on a Neo-Memphis aesthetic.
---

## Brand & Style
The design system is built on a "Neo-Memphis" aesthetic—a sophisticated evolution of the Corporate Memphis movement. It prioritizes a sense of optimism, accessibility, and mental clarity. The interface balances professional reliability with a playful, "sticker-like" tactility that reduces the clinical friction often associated with healthcare.

The visual language utilizes clean, flat geometric shapes, subtle black outlines, and a vibrant accent palette to guide the user's emotional state toward calm and confidence. The target audience includes individuals seeking approachable mental health support who value modern, human-centric digital experiences. High-quality whitespace and intentional "ink traps" in typography ensure the brand feels both premium and friendly.

## Colors
The palette is anchored by a high-energy Primary Blue to signify trust and intelligence, set against a warm, calming Cream background that prevents visual fatigue.

Accent colors (Yellow, Pink, Sage, and Orange) are used as functional signifiers for different mood categories or service types. All interactive elements and "sticker" containers utilize a 1.5px solid black (#1A1A1A) outline to provide definition and a playful, illustrative quality. Dark mode is not the primary focus, as the off-white base is essential for the brand's warm, "paper-like" feel.

**Color Palette:**
- surface: '#fbf8ff'
- surface-dim: '#d9d9e6'
- surface-bright: '#fbf8ff'
- surface-container-lowest: '#ffffff'
- surface-container-low: '#f3f2ff'
- surface-container: '#ededfa'
- surface-container-high: '#e7e7f4'
- surface-container-highest: '#e2e1ef'
- on-surface: '#191b24'
- on-surface-variant: '#434656'
- inverse-surface: '#2e303a'
- inverse-on-surface: '#f0effd'
- outline: '#747688'
- outline-variant: '#c4c5d9'
- surface-tint: '#1049f1'
- primary: '#003fdd'
- on-primary: '#ffffff'
- primary-container: '#2b59ff'
- on-primary-container: '#ecedff'
- inverse-primary: '#b9c3ff'
- secondary: '#725c00'
- on-secondary: '#ffffff'
- secondary-container: '#fdd33f'
- on-secondary-container: '#715b00'
- tertiary: '#754650'
- on-tertiary: '#ffffff'
- tertiary-container: '#905e68'
- on-tertiary-container: '#ffe9eb'
- error: '#ba1a1a'
- on-error: '#ffffff'
- error-container: '#ffdad6'
- on-error-container: '#93000a'
- primary-fixed: '#dde1ff'
- primary-fixed-dim: '#b9c3ff'
- on-primary-fixed: '#001356'
- on-primary-fixed-variant: '#0035be'
- secondary-fixed: '#ffe082'
- secondary-fixed-dim: '#ebc32e'
- on-secondary-fixed: '#231b00'
- on-secondary-fixed-variant: '#564500'
- tertiary-fixed: '#ffd9df'
- tertiary-fixed-dim: '#f4b6c1'
- on-tertiary-fixed: '#330f19'
- on-tertiary-fixed-variant: '#663a43'
- background: '#fbf8ff'
- on-background: '#191b24'
- surface-variant: '#e2e1ef'

## Typography
This design system employs a dual-typeface strategy to bridge the gap between "playful" and "functional." **Lexend** is used for all headings; its expanded width and rounded terminals provide excellent readability and a friendly, open character.

**DM Sans** is the workhorse for body text and UI elements. It offers a clean, low-contrast geometric structure that remains legible in dense information environments. Display headings should use tight tracking (-0.02em) to emphasize the "bold sticker" aesthetic, while labels use slightly increased tracking for clarity at small sizes.

- display-lg: Lexend, 48px, 700, line-height 1.1, tracking -0.02em
- display-lg-mobile: Lexend, 36px, 700, line-height 1.2, tracking -0.02em
- headline-md: Lexend, 32px, 600, line-height 1.3
- headline-sm: Lexend, 24px, 600, line-height 1.4
- body-lg: DM Sans, 18px, 400, line-height 1.6
- body-md: DM Sans, 16px, 400, line-height 1.6
- label-bold: DM Sans, 14px, 700, line-height 1.2, tracking 0.05em
- label-md: DM Sans, 14px, 500, line-height 1.2

## Layout & Spacing
The layout follows a 12-column fluid grid for desktop and a 4-column grid for mobile. A strict 8px spacing scale ensures rhythmic consistency.

Information is organized into "Sticker Containers"—discrete modules with generous internal padding (usually 32px or 40px) to give content room to breathe. On mobile, margins are reduced to 20px, and large vertical stacks are used to maintain the modularity of the design. Elements should feel "placed" on the cream canvas, often using asymmetrical offsets to lean into the playful Memphis influence.

- unit: 8px
- container-padding-desktop: 40px
- container-padding-mobile: 20px
- gutter: 24px
- stack-sm: 12px
- stack-md: 24px
- stack-lg: 48px

## Elevation & Depth
Elevation is achieved through "Hard Shadows" rather than soft blurs. This design system avoids traditional Gaussian blurs to maintain its crisp, illustrative feel.

1.  **Level 0 (Surface):** The Cream background.
2.  **Level 1 (Stickers):** White or Accent-colored containers with a 1.5px black border.
3.  **Level 2 (Interactive/Floating):** Elements gain a "hard" drop shadow (4px offset, 0px blur, black at 100% or 20% opacity) to simulate being lifted off the page.
4.  **Active State:** When pressed, buttons or cards lose their shadow and shift 2px down and right to simulate physical depression.

## Shapes
The shape language is defined by exaggerated roundedness. Standard cards and containers must use a minimum of 24px border radius to soften the interface. Smaller components like buttons and input fields use a 12px radius. To reinforce the friendly tone, avoid sharp 90-degree angles entirely. Icons should follow a "Line-Art" style with rounded caps and a 2px stroke weight to match the component borders.
- sm: 0.25rem
- default: 0.5rem
- md: 0.75rem
- lg: 1rem
- xl: 1.5rem
- full: 9999px

## Components

### Buttons
Primary buttons use the Primary Blue background with white text and a 1.5px black outline. They feature a 4px black hard shadow that disappears on "hover" or "active" states. Secondary buttons use the accent colors (Yellow or Sage) to differentiate secondary actions like "Learn More."

### Cards
Cards are the primary container. They should always have a 1.5px black border. Backgrounds can be white or any of the soft accent colors. Use a 24px radius and 32px internal padding.

### Input Fields
Inputs use the background color #F9F8F3 but are encased in a 1.5px black border with a 12px radius. The focus state shifts the border color to Primary Blue and adds a subtle 2px hard shadow.

### Chips/Tags
Used for mood or category selection. These are pill-shaped (100px radius) with a 1px border. When selected, they fill with the Primary Blue or the relevant category accent color.

### Progress Indicators
Progress bars should be chunky (12px height) with a 1.5px border and a high-contrast fill (Orange or Sage) to make the user's journey through mental health exercises feel rewarding and visible.

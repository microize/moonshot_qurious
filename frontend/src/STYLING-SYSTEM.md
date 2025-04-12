# Quriousity Learning Platform - Styling System

This document outlines the styling architecture for the Quriousity Learning Platform, providing guidelines for consistent and maintainable styling across the application.

## Overview

Our styling system is built with the following principles:
- **Centralized Theme Configuration**: A single source of truth for colors, spacing, etc.
- **Component-Based Styling**: Styles are tied to components for better organization
- **CSS Modularity**: Using CSS Modules for component-specific styles
- **Utility Classes**: Leveraging Tailwind CSS for rapid development
- **Responsive Design**: Built-in mobile-first approach

## Directory Structure

```
src/
├── styles/
│   ├── theme.js          # Theme variables (colors, spacing, etc.)
│   ├── components.js     # Component-specific style definitions
│   ├── base.css          # Base styles, resets
│   ├── components.css    # Reusable component classes
│   ├── utilities.css     # Custom utility classes
│   ├── animations.css    # CSS animations
│   └── index.css         # Main CSS entry point
├── utils/
│   └── styleUtils.js     # Style utility functions
└── components/
    ├── ui/               # Reusable UI components
    │   ├── Button.js
    │   ├── Card.js
    │   └── ...
    └── [ComponentName]/  # Feature components with their own styling
        ├── ComponentName.js
        └── ComponentName.module.css
```

## Theme Configuration

The core of our styling system is the `theme.js` file, which defines all design tokens:

- **Colors**: Primary, accent, semantic, neutral palettes
- **Spacing**: Consistent spacing scales
- **Typography**: Font sizes, weights, line heights
- **Borders**: Border radius, width
- **Shadows**: Box shadows
- **Animation**: Durations, easings

**Example**: To change the primary color across the entire application, simply update the `cobalt` color palette in `theme.js`.

## Component Styles

Component styles are defined in two ways:

1. **Global Component Classes** (`components.css`):
   - Reusable classes like `.btn`, `.card`, `.badge`
   - Used for common UI patterns

2. **CSS Modules** (`.module.css` files):
   - Component-specific styles
   - Scoped to prevent style conflicts
   - Used for complex components with unique styling needs

## Usage Guidelines

### 1. For Basic UI Components

Use the predefined UI components from the `components/ui/` directory:

```jsx
import Button from '../components/ui/Button';

function MyComponent() {
  return (
    <Button 
      variant="primary" 
      size="md"
      onClick={handleClick}
    >
      Click Me
    </Button>
  );
}
```

### 2. For Custom Components

Create a dedicated folder with a component file and CSS module:

```jsx
// MyFeature/MyFeature.js
import styles from './MyFeature.module.css';
import { classNames } from '../../utils/styleUtils';

function MyFeature() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Feature</h2>
    </div>
  );
}
```

```css
/* MyFeature/MyFeature.module.css */
.container {
  @apply p-4 bg-white dark:bg-gray-800 rounded-lg;
}

.title {
  @apply text-xl font-semibold text-cobalt-600 dark:text-cobalt-400;
}
```

### 3. Using Style Utils

```jsx
import { classNames, getCourseBadgeStyle } from '../../utils/styleUtils';

function CourseLabel({ type }) {
  return (
    <span className={classNames('text-sm', getCourseBadgeStyle(type))}>
      {type}
    </span>
  );
}
```

## Dark Mode

The application supports dark mode through Tailwind's dark mode utilities. The `ThemeContext` provides a `darkMode` state and `toggleTheme` function to control the theme.

```jsx
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}
```

## Best Practices

1. **Always use the theme variables** rather than hardcoding colors or values
2. **Keep component styling modular** by using CSS modules for component-specific styles
3. **Use the classNames utility** to conditionally combine classes
4. **Organize complex components** in their own folders with dedicated CSS modules
5. **Use semantic class names** that describe the purpose, not the appearance
6. **Leverage Tailwind for simple styling** but create custom classes for complex or repeated patterns
7. **Document style variations** in component props

## Updating the Theme

To update colors or other theme variables across the entire application:

1. Modify the appropriate values in `src/styles/theme.js`
2. All components using these theme values will automatically reflect the changes

This centralized approach ensures consistency and makes it easy to maintain the design system as the application grows.
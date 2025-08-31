# Modular Bento Grid Implementation Guide

## Overview

This modular system transforms your hardcoded Bento Grid into a flexible, reusable component that can handle any number of items with configurable layouts.

## Key Features

1. **Separate Project Data**: Move all project data to `projectData.js` for better organization
2. **Configurable Layouts**: Define multiple layout patterns that adapt to different item counts  
3. **Random Layout Generation**: Use seed numbers for consistent but varied layouts
4. **Dynamic Grid Sizing**: Automatically calculate grid dimensions based on content
5. **Reusable Components**: Clean, modular components that can be used across projects

## File Structure

```
src/
├── components/
│   ├── ProjectPage.jsx          # Updated main component
│   ├── DynamicBentoGrid.jsx     # New modular bento grid
│   ├── bentoLayouts.js          # Layout configurations
│   ├── projectData.js           # Separated project data
│   ├── BentoCard.jsx            # Your existing card component
│   └── Projects.jsx             # Your existing projects component
```

## Usage Examples

### 1. Basic Usage with Predefined Layout

```javascript
// In your project data
{
  "my-project": {
    title: "My Amazing Project",
    bentoLayout: "layout1", // Use predefined layout
    bentoItems: [
      {
        src: "/videos/demo.mp4",
        title: "Demo Video",
        description: "See it in action",
        isVideo: true,
        size: "large"
      },
      // ... more items
    ]
  }
}

// In your component
<DynamicBentoGrid 
  items={project.bentoItems}
  layoutType={project.bentoLayout}
  title="Project Features"
/>
```

### 2. Random Layout Generation

```javascript
// In your project data
{
  "random-project": {
    title: "Random Layout Project",
    layoutSeed: 42, // Use seed for consistent randomization
    bentoItems: [
      // ... your items
    ]
  }
}

// The layout will be generated based on the seed
<DynamicBentoGrid 
  items={project.bentoItems}
  layoutSeed={project.layoutSeed}
  title="Dynamic Features"
/>
```

### 3. Adding New Layouts

```javascript
// In bentoLayouts.js - add your custom layout
export const bentoLayouts = {
  // ... existing layouts
  
  layout4: {
    name: "Custom Pattern",
    description: "Your custom layout description",
    minItems: 2,
    maxItems: 6,
    getLayout: (itemCount) => {
      const layouts = {
        2: [
          { span: "col-span-2 row-span-1", size: "wide" },
          { span: "col-span-2 row-span-1", size: "wide" }
        ],
        3: [
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-2 row-span-2", size: "hero" }
        ],
        // ... more configurations
      };
      return layouts[Math.min(itemCount, 6)] || layouts[6];
    }
  }
};
```

## Migration Steps

### Step 1: Move Project Data
1. Create `projectData.js` and move your project data there
2. Update imports in `ProjectPage.jsx`: `import { projectData } from "./projectData"`

### Step 2: Create Layout System
1. Add `bentoLayouts.js` with the provided layout configurations
2. Create `DynamicBentoGrid.jsx` component

### Step 3: Update Project Data Structure
Add layout configuration to your existing projects:

```javascript
// Before
const projectData = {
  "1700-spot": {
    title: "1700 Spot",
    // ... other properties
    bentoItems: [/* items */]
  }
}

// After  
const projectData = {
  "1700-spot": {
    title: "1700 Spot",
    // ... other properties
    bentoLayout: "layout1", // Add this
    // OR
    layoutSeed: 1, // Use this for random generation
    bentoItems: [/* items with size hints */]
  }
}
```

### Step 4: Replace Hardcoded Grid
Replace your hardcoded bento section with:

```javascript
<DynamicBentoGrid 
  items={project.bentoItems}
  layoutType={project.bentoLayout}
  layoutSeed={project.layoutSeed}
  title="Project Features"
  className="-mt-80"
/>
```

## Benefits

1. **Scalable**: Add any number of bento items per project
2. **Consistent**: Predefined layouts ensure visual consistency  
3. **Flexible**: Easy to create new layout patterns
4. **Maintainable**: Clean separation of data and presentation
5. **Reusable**: Use the same grid component across different projects

## Advanced Customization

### Custom Grid Classes
The system uses Tailwind's grid classes. You can extend the layout configurations to use custom grid templates if needed.

### Layout Constraints  
Each layout defines `minItems` and `maxItems` to ensure optimal visual presentation.

### Size Hints
Add size hints to your bento items (`small`, `medium`, `large`, `hero`) to guide layout decisions.

## Tips

- Use `layoutSeed` for projects that want unique but consistent layouts
- Use predefined `layoutType` for projects that need specific visual patterns
- The debug info shows which layout is being used - remove in production
- Grid height is calculated automatically but can be adjusted in the CSS classes

This modular approach makes your bento grids much more flexible and maintainable!
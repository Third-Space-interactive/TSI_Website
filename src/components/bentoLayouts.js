// bentoLayouts.js
// Define different bento grid layouts that can be applied based on number of items

export const bentoLayouts = {
  layout1: {
    name: "Hero Focus",
    description: "First item takes hero position, others in grid",
    minItems: 2,
    maxItems: 8,
    getLayout: (itemCount) => {
      const layouts = {
        2: [
          { span: "col-span-2 row-span-2", size: "hero" }, // First item - hero
          { span: "col-span-2 row-span-1", size: "wide" }   // Remaining items
        ],
        3: [
          { span: "col-span-2 row-span-2", size: "hero" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" }
        ],
        4: [
          { span: "col-span-2 row-span-2", size: "hero" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-2 row-span-1", size: "wide" }
        ],
        5: [
          { span: "col-span-2 row-span-2", size: "hero" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-2", size: "tall" },
          { span: "col-span-1 row-span-1", size: "square" }
        ],
        6: [
          { span: "col-span-2 row-span-2", size: "hero" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-2 row-span-1", size: "wide" }
        ]
      };
      return layouts[Math.min(itemCount, 6)] || layouts[6];
    }
  },

  layout2: {
    name: "Balanced Grid",
    description: "Evenly distributed items with varied sizes",
    minItems: 2,
    maxItems: 9,
    getLayout: (itemCount) => {
      const layouts = {
        2: [
          { span: "col-span-1 row-span-2", size: "tall" },
          { span: "col-span-1 row-span-2", size: "tall" }
        ],
        3: [
          { span: "col-span-2 row-span-1", size: "wide" },
          { span: "col-span-1 row-span-2", size: "tall" },
          { span: "col-span-1 row-span-1", size: "square" }
        ],
        4: [
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-2", size: "tall" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" }
        ],
        5: [
          { span: "col-span-2 row-span-1", size: "wide" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-2", size: "tall" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" }
        ],
        6: [
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-2", size: "tall" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-2 row-span-1", size: "wide" },
          { span: "col-span-1 row-span-1", size: "square" }
        ]
      };
      return layouts[Math.min(itemCount, 6)] || layouts[6];
    }
  },

  layout3: {
    name: "Mosaic",
    description: "Organic, varied sizing pattern",
    minItems: 3,
    maxItems: 8,
    getLayout: (itemCount) => {
      const layouts = {
        3: [
          { span: "col-span-1 row-span-2", size: "tall" },
          { span: "col-span-2 row-span-1", size: "wide" },
          { span: "col-span-1 row-span-1", size: "square" }
        ],
        4: [
          { span: "col-span-2 row-span-1", size: "wide" },
          { span: "col-span-1 row-span-2", size: "tall" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" }
        ],
        5: [
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-2 row-span-1", size: "wide" },
          { span: "col-span-1 row-span-2", size: "tall" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" }
        ],
        6: [
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-2", size: "tall" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-2 row-span-1", size: "wide" },
          { span: "col-span-1 row-span-1", size: "square" },
          { span: "col-span-1 row-span-1", size: "square" }
        ]
      };
      return layouts[Math.min(itemCount, 6)] || layouts[6];
    }
  }
};

// Generate random layout based on seed
export const generateLayoutFromSeed = (seed, itemCount) => {
  const layoutKeys = Object.keys(bentoLayouts);
  const layoutIndex = seed % layoutKeys.length;
  const selectedLayoutKey = layoutKeys[layoutIndex];
  return {
    layoutKey: selectedLayoutKey,
    layout: bentoLayouts[selectedLayoutKey].getLayout(itemCount)
  };
};

// Calculate grid dimensions based on layout
export const calculateGridDimensions = (layout) => {
  let maxCols = 0;
  let maxRows = 0;
  
  layout.forEach(item => {
    // Extract numbers from span strings like "col-span-2 row-span-1"
    const colMatch = item.span.match(/col-span-(\d+)/);
    const rowMatch = item.span.match(/row-span-(\d+)/);
    
    if (colMatch) maxCols = Math.max(maxCols, parseInt(colMatch[1]));
    if (rowMatch) maxRows = Math.max(maxRows, parseInt(rowMatch[1]));
  });
  
  return { cols: Math.max(maxCols, 2), rows: Math.max(maxRows, 2) };
};
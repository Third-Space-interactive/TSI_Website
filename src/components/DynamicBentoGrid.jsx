// DynamicBentoGrid.jsx
import React from 'react';
import BentoCard from './BentoCard';
import { BentoTilt } from './Projects';
import { bentoLayouts, generateLayoutFromSeed, calculateGridDimensions } from './bentoLayouts';

const DynamicBentoGrid = ({ 
  items = [], 
  layoutType = "layout1", 
  layoutSeed = null, 
  className = "",
  title = "Project Features"
}) => {
  // Determine which layout to use
  const getLayoutConfig = () => {
    if (layoutSeed !== null) {
      return generateLayoutFromSeed(layoutSeed, items.length);
    }
    
    if (bentoLayouts[layoutType]) {
      return {
        layoutKey: layoutType,
        layout: bentoLayouts[layoutType].getLayout(items.length)
      };
    }
    
    // Fallback to layout1
    return {
      layoutKey: "layout1",
      layout: bentoLayouts.layout1.getLayout(items.length)
    };
  };

  const { layoutKey, layout } = getLayoutConfig();
  const { cols, rows } = calculateGridDimensions(layout);

  // If no items, don't render anything
  if (!items || items.length === 0) {
    return null;
  }

  // Generate grid template classes
  const gridClasses = `grid grid-cols-${cols} gap-7`;
  const containerHeight = `h-[${rows * 40}vh]`; // Adjust height multiplier as needed

  return (
    <section className={`bg-black pb-20 ${className}`}>
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-16">
          <div className="mb-8">
            <h2 className="special-font text-4xl md:text-6xl text-white mb-4">
              {title}
            </h2>
            <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
              Explore the key features and innovations that make this project unique.
            </p>
            {/* Debug info - remove in production */}
            <p className="text-xs text-gray-500 mt-2">
              Layout: {layoutKey} | Items: {items.length} | Grid: {cols}x{rows}
            </p>
          </div>
          
          <div className={`${gridClasses} ${containerHeight} w-full`}>
            {items.map((item, index) => {
              const layoutConfig = layout[index] || layout[layout.length - 1]; // Fallback to last layout if more items than layouts
              
              return (
                <BentoTilt 
                  key={`${item.title}-${index}`}
                  className={`border-hsla relative overflow-hidden rounded-md ${layoutConfig.span}`}
                >
                  <BentoCard
                    src={item.src}
                    title={item.title}
                    description={item.description}
                    isVideo={item.isVideo}
                    isComingSoon={item.isComingSoon || false}
                    projectUrl={item.projectUrl}
                  />
                </BentoTilt>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicBentoGrid;
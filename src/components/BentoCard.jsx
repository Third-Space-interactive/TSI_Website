import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";

{/* Usage examples for bento card component
// Standard project card with navigation
<BentoCard 
  src="video.mp4" 
  title="My Project" 
  description="Cool project"
  projectUrl="/projects/my-project"
/>

// Coming soon card
<BentoCard 
  src="video.mp4" 
  title="Future Project" 
  isComingSoon={true}
/>

// Static card with no button
<BentoCard 
  src="image.jpg" 
  title="Static Content" 
  description="Just a display card"
  showButton={false}
  isVideo={false}
/>

// External link (opens in same tab)
<BentoCard 
  src="video.mp4" 
  title="External Link" 
  projectUrl="https://example.com"
/>
*/}


const BentoCard = ({ 
  src, 
  title, 
  description, 
  isComingSoon, 
  projectUrl, 
  isVideo = true,
  showButton = true // New prop to control button visibility
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  const handleNavigation = () => {
    if (projectUrl && !isComingSoon) {
      // Check if it's an external URL or internal route
      if (projectUrl.startsWith('http') || projectUrl.startsWith('//')) {
        // External URL - open in same tab
        window.location.href = projectUrl;
      } else {
        // Internal route - use React Router and scroll to top
        navigate(projectUrl);
        // Scroll to top after navigation
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const buttonLabel = isComingSoon ? "coming soon" : "see project";
  const buttonTextColor = isComingSoon ? "text-white/20" : "text-white";
  const buttonBg = isComingSoon ? "bg-black" : "bg-blue-600 hover:bg-blue-700";
  const buttonCursor = isComingSoon ? "cursor-default" : "cursor-pointer";

  const buttonContent = (
    <>
      {/* Radial gradient hover effect */}
      <div
        className={`pointer-events-none absolute -inset-px transition duration-300`}
        style={{
          opacity: hoverOpacity,
          background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
        }}
      />
      <TiLocationArrow className="relative z-20" />
      <p className={`relative z-20 uppercase ${buttonTextColor}`}>{buttonLabel}</p>
    </>
  );

  return (
    <div className="relative size-full">
      {/* Conditional rendering for video or image */}
      {isVideo ? (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <img
          src={src}
          alt={title}
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      )}
      
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        {/* Conditionally render button */}
        {showButton && (
          <div className="absolute top-5 right-5 z-20">
            <div
              ref={hoverButtonRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleNavigation}
              className={`border-hsla relative flex w-fit items-center gap-1 overflow-hidden rounded-full px-5 py-2 text-xs uppercase ${buttonBg} ${buttonCursor}`}
              style={{ pointerEvents: isComingSoon ? "none" : "auto" }}
            >
              {buttonContent}
            </div>
          </div>
        )}
        
        {/* Card content */}
        <div>
          <h1 className="bento-title special-font" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base drop-shadow-lg" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BentoCard;
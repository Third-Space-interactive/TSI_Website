import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";

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

// Static card with hover effect, logo, and animation
<BentoCard 
  src="video.mp4" 
  title="Interactive Content" 
  description="Hover to see animation"
  showButton={false}
  isVideo={true}
  logoSrc="/img/logo-small.png"
  useHoverEffect={true}
  idleAnimation={1} // 1=rotate, 2=float, 3=wiggle, 4=pulse, 5=bounce
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
  showButton = true,
  logoSrc, // Small logo/icon to show initially
  useHoverEffect = false, // Enable the new hover effect
  idleAnimation = 0 // Animation type: 0=none, 1=rotate, 2=float, 3=wiggle, 4=pulse, 5=bounce
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const hoverButtonRef = useRef(null);
  const cardRef = useRef(null);
  const logoRef = useRef(null);
  const animationRef = useRef(null); // Store the animation reference
  const navigate = useNavigate();

  // Intersection Observer for mobile scroll detection
  useEffect(() => {
    if (!useHoverEffect || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.5);
      },
      { threshold: [0, 0.5, 1] }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [useHoverEffect]);

  // Function to create and start the idle animation
  const startIdleAnimation = () => {
    if (!logoRef.current || !idleAnimation || idleAnimation === 0) return;

    // Kill existing animation if it exists
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }

    switch (idleAnimation) {
      case 1: // Rotate
        animationRef.current = gsap.to(logoRef.current, {
          rotation: 360,
          duration: 4,
          ease: "none",
          repeat: -1
        });
        break;
      
      case 2: // Float
        animationRef.current = gsap.to(logoRef.current, {
          y: -10,
          duration: 2,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        });
        break;
      
      case 3: // Wiggle (rotate left and right)
        animationRef.current = gsap.to(logoRef.current, {
          rotation: 15,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        });
        break;
      
      case 4: // Pulse
        animationRef.current = gsap.to(logoRef.current, {
          scale: 1.1,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        });
        break;
      
      case 5: // Bounce
        animationRef.current = gsap.to(logoRef.current, {
          y: -15,
          duration: 0.6,
          ease: "bounce.out",
          repeat: -1,
          repeatDelay: 2
        });
        break;
      
      default:
        break;
    }
  };

  // GSAP Idle Animations - start animation when component mounts
  useEffect(() => {
    startIdleAnimation();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [idleAnimation]);

  // Determine if we should show the full media (desktop hover or mobile in view)
  const showFullMedia = useHoverEffect && (isHovered || (window.innerWidth <= 768 && isInView));

  // Restart animation when logo becomes visible again
  useEffect(() => {
    if (useHoverEffect && logoSrc && !showFullMedia && logoRef.current) {
      // Small delay to ensure the element is fully rendered
      const timeoutId = setTimeout(() => {
        startIdleAnimation();
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [showFullMedia, idleAnimation, logoSrc, useHoverEffect]);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setHoverOpacity(1);
    if (useHoverEffect) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setHoverOpacity(0);
    if (useHoverEffect) setIsHovered(false);
  };

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
    <div 
      ref={cardRef}
      className="relative size-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Media - only show when not using hover effect or when hovered/in view */}
      {(!useHoverEffect || showFullMedia) && (
        <>
          {isVideo ? (
            <video
              src={src}
              loop
              muted
              playsInline
              autoPlay={useHoverEffect ? showFullMedia : true}
              className={`absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-500 ${
                useHoverEffect ? (showFullMedia ? 'opacity-100' : 'opacity-0') : 'opacity-100'
              }`}
            />
          ) : (
            <img
              src={src}
              alt={title}
              className={`absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-500 ${
                useHoverEffect ? (showFullMedia ? 'opacity-100' : 'opacity-0') : 'opacity-100'
              }`}
            />
          )}
        </>
      )}

      {/* Blurred Background with Grey-Black Gradient - only show when using hover effect and not hovered/in view */}
      {useHoverEffect && !showFullMedia && (
        <div className="absolute inset-0">
          {/* Blurred background media */}
          {isVideo ? (
            <video
              src={src}
              loop
              muted
              playsInline
              autoPlay={false}
              className="absolute left-0 top-0 size-full object-cover object-center filter blur-md scale-110"
            />
          ) : (
            <img
              src={src}
              alt={title}
              className="absolute left-0 top-0 size-full object-cover object-center filter blur-md scale-110"
            />
          )}
          
          {/* Grey-black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/70 to-gray-800/90" />
        </div>
      )}

      {/* Logo/Icon - only show when using hover effect and not hovered/in view */}
      {useHoverEffect && logoSrc && !showFullMedia && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            ref={logoRef}
            src={logoSrc}
            alt={`${title} logo`}
            className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-90 transition-opacity duration-300"
          />
        </div>
      )}

      {/* Default blurred background for hover effect when no logo provided */}
      {useHoverEffect && !logoSrc && !showFullMedia && (
        <div className="absolute inset-0">
          {/* Blurred background media */}
          {isVideo ? (
            <video
              src={src}
              loop
              muted
              playsInline
              autoPlay={false}
              className="absolute left-0 top-0 size-full object-cover object-center filter blur-md scale-110"
            />
          ) : (
            <img
              src={src}
              alt={title}
              className="absolute left-0 top-0 size-full object-cover object-center filter blur-md scale-110"
            />
          )}
          
          {/* Grey-black gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/70 to-gray-800/90" />
        </div>
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
        <div className="transition-all duration-500">
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

      {/* Overlay for better text readability when media is showing */}
      {(!useHoverEffect || showFullMedia) && (
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${
          useHoverEffect ? (showFullMedia ? 'opacity-100' : 'opacity-0') : 'opacity-100'
        }`} />
      )}
    </div>
  );
};

export default BentoCard;
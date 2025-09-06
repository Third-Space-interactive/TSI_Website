import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const BentoCard = ({ 
  src, 
  title, 
  description, 
  isComingSoon, 
  projectUrl, 
  isVideo = true,
  showButton = true,
  logoSrc,
  useHoverEffect = false,
  idleAnimation = 0,
  posterSrc, // Add poster prop for video thumbnail
  animationDelay = 0, // Add delay for staggered animations
  animationDuration = 0.8, // Customizable animation duration
  animationEase = "power2.out" // Customizable easing
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const hoverButtonRef = useRef(null);
  const cardRef = useRef(null);
  const logoRef = useRef(null);
  const animationRef = useRef(null);
  const videoRef = useRef(null);
  const scrollAnimationRef = useRef(null);
  const navigate = useNavigate();

  // Helper function to get mobile-optimized source
  const getOptimizedSrc = (originalSrc) => {
    if (!isMobile || !originalSrc) return originalSrc;
    
    // For mobile, use WebP images instead of videos
    if (isVideo && originalSrc.includes('.mp4')) {
      return originalSrc.replace('.mp4', '-mobile.webp').replace('videos/', 'img/');
    }
    
    // For images, keep as is or optimize if needed
    return originalSrc;
  };

  // Helper function to get fallback src if mobile version fails
  const getFallbackSrc = () => {
    return src; // Return original source as fallback
  };

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP Scroll Animation Setup
  useEffect(() => {
    if (!cardRef.current) return;

    // Set initial state - card starts below viewport with no outline
    gsap.set(cardRef.current, {
      y: 100,
      opacity: 0,
      scale: 0.95,
      rotationX: 15,
      visibility: "hidden" // Hide completely until animation starts
    });

    // Create scroll-triggered animation
    scrollAnimationRef.current = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 85%", // Start animation when card is 85% down the viewport
      end: "top 15%", // End animation when card is 15% down the viewport
      scrub: false, // Smooth animation instead of scrubbing
      toggleActions: "play none play reverse", // play on enter, no action on leave down, play on enter back, reverse on leave back
      
      onEnter: () => {
        // Entry animation - make visible and animate in
        gsap.set(cardRef.current, { visibility: "visible" });
        gsap.to(cardRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: animationDuration,
          ease: animationEase,
          delay: animationDelay,
          clearProps: "transform,opacity" // Clear inline styles after animation
        });
      },
      
      onLeave: () => {
        // No exit animation when scrolling down past the card
        // Card stays visible and in place
      },
      
      onEnterBack: () => {
        // Re-enter animation (scrolling back up to the card)
        gsap.set(cardRef.current, { visibility: "visible" });
        gsap.to(cardRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: animationDuration,
          ease: animationEase,
          clearProps: "transform,opacity"
        });
      },
      
      onLeaveBack: () => {
        // Exit animation (scrolling up past the card)
        gsap.to(cardRef.current, {
          y: 100,
          opacity: 0,
          scale: 0.95,
          rotationX: 15,
          duration: animationDuration * 0.7,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(cardRef.current, { visibility: "hidden" });
          }
        });
      }
    });

    // Cleanup function
    return () => {
      if (scrollAnimationRef.current) {
        scrollAnimationRef.current.kill();
      }
    };
  }, [animationDelay, animationDuration, animationEase]);

  // Enhanced Intersection Observer for mobile scroll detection and lazy loading
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.1;
        
        if (useHoverEffect) {
          setIsInView(isVisible && entry.intersectionRatio > 0.3);
        }
        
        // Enhanced lazy load logic for mobile
        if (isVisible && isMobile && isVideo && videoRef.current && !videoLoaded) {
          // On mobile, we're loading images instead of videos, so handle accordingly
          setTimeout(() => {
            setVideoLoaded(true);
          }, 200);
        }
      },
      { 
        threshold: [0, 0.1, 0.3, 0.5, 1],
        rootMargin: isMobile ? '50px' : '100px'
      }
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [useHoverEffect, isMobile, isVideo, videoLoaded]);

  // Function to create and start the idle animation
  const startIdleAnimation = () => {
    if (!logoRef.current || !idleAnimation || idleAnimation === 0) return;

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
      
      case 3: // Wiggle
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

  useEffect(() => {
    startIdleAnimation();
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, [idleAnimation]);

  const showFullMedia = useHoverEffect && (isHovered || (isMobile && isInView));

  useEffect(() => {
    if (useHoverEffect && logoSrc && !showFullMedia && logoRef.current) {
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
      if (projectUrl.startsWith('http') || projectUrl.startsWith('//')) {
        window.location.href = projectUrl;
      } else {
        navigate(projectUrl);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
    }
  };

  // Handle image loading error (fallback to desktop version)
  const handleImageError = () => {
    if (isMobile && !videoError) {
      setVideoError(true);
      // Could implement fallback logic here
    }
  };

  const buttonLabel = isComingSoon ? "coming soon" : "see project";
  const buttonTextColor = isComingSoon ? "text-white/20" : "text-white";
  const buttonBg = isComingSoon ? "bg-black" : "bg-blue-600 hover:bg-blue-700";
  const buttonCursor = isComingSoon ? "cursor-default" : "cursor-pointer";

  const buttonContent = (
    <>
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

  // Generate poster source if not provided
  const effectivePosterSrc = posterSrc || (isVideo ? src.replace('.mp4', '-poster.jpg') : null);

  // Get optimized source
  const optimizedSrc = getOptimizedSrc(src);

  return (
    <div 
      ref={cardRef}
      className="relative size-full overflow-hidden bg-black border-0 bento-card-container"
      style={{ 
        outline: 'none',
        border: 'none',
        boxShadow: 'none'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Media */}
      {(!useHoverEffect || showFullMedia) && (
        <>
          {/* On mobile, always show image; on desktop, show video if isVideo is true */}
          {(isMobile || !isVideo) ? (
            <img
              src={optimizedSrc}
              alt={title}
              loading="lazy"
              className={`absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-500 ${
                useHoverEffect ? (showFullMedia ? 'opacity-100' : 'opacity-0') : 'opacity-100'
              }`}
              onError={handleImageError}
            />
          ) : (
            <video
              ref={videoRef}
              src={src}
              poster={effectivePosterSrc}
              loop
              muted
              playsInline
              preload="metadata"
              autoPlay={useHoverEffect ? showFullMedia : true}
              className={`absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-500 ${
                useHoverEffect ? (showFullMedia ? 'opacity-100' : 'opacity-0') : 'opacity-100'
              }`}
              onCanPlay={() => {
                // Auto play when video can play
                if (showFullMedia && videoRef.current) {
                  videoRef.current.play().catch(() => {
                    // Handle autoplay restrictions silently
                  });
                }
              }}
            />
          )}
        </>
      )}

      {/* Blurred Background with Grey-Black Gradient */}
      {useHoverEffect && !showFullMedia && (
        <div className="absolute inset-0">
          {(isMobile || !isVideo) ? (
            <img
              src={optimizedSrc}
              alt={title}
              loading="lazy"
              className="absolute left-0 top-0 size-full object-cover object-center filter blur-md scale-110"
              onError={handleImageError}
            />
          ) : (
            <video
              src={src}
              poster={effectivePosterSrc}
              loop
              muted
              playsInline
              preload="none"
              autoPlay={false}
              className="absolute left-0 top-0 size-full object-cover object-center filter blur-md scale-110"
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/70 to-gray-800/90" />
        </div>
      )}

      {/* Logo/Icon */}
      {useHoverEffect && logoSrc && !showFullMedia && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img
            ref={logoRef}
            src={logoSrc}
            alt={`${title} logo`}
            loading="lazy"
            className="w-16 h-16 md:w-20 md:h-20 object-contain opacity-90 transition-opacity duration-300"
          />
        </div>
      )}
        
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        {showButton && (
          <div className="absolute bottom-10 right-5 z-20">
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
        
        <div className="transition-all duration-500">
          <h1 className="bento-title special-font" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base drop-shadow-lg hidden sm:block" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Overlay for better text readability */}
      {(!useHoverEffect || showFullMedia) && (
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-500 ${
          useHoverEffect ? (showFullMedia ? 'opacity-100' : 'opacity-0') : 'opacity-100'
        }`} />
      )}
    </div>
  );
};

export default BentoCard;
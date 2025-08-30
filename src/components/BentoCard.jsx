import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

const BentoCard = ({ src, title, description, isComingSoon, projectUrl, isVideo = true }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

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

  const buttonLabel = isComingSoon ? "coming soon" : "see project";
  const buttonTextColor = isComingSoon ? "text-white/20" : "text-white";
  const buttonBg = isComingSoon ? "bg-black" : "bg-blue-600 hover:bg-blue-700";
  const buttonCursor = isComingSoon ? "cursor-pointer" : "cursor-pointer";

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
        {/* Button moved to top right */}
        <div className="absolute top-5 right-5 z-20">
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`border-hsla relative flex w-fit items-center gap-1 overflow-hidden rounded-full px-5 py-2 text-xs uppercase ${buttonBg} ${buttonCursor}`}
            style={{ pointerEvents: isComingSoon ? "none" : "auto" }}
          >
            {isComingSoon ? (
              buttonContent
            ) : (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
                style={{ textDecoration: "none" }}
              >
                {buttonContent}
              </a>
            )}
          </div>
        </div>
        {/* Card content below */}
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
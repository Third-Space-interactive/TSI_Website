import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, projectUrl }) => {
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
  const buttonOpacity = isComingSoon ? "opacity-0" : "opacity-0"; // keep radial effect for both

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
        <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
        />
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
            <h1 className="bento-title special-font" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>{title}</h1>
            {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base drop-shadow-lg" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>{description}</p>
            )}
        </div>
        </div>
    </div>
    );
};

const Projects = () => (
  <section id="projects" className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Interactivity like you've never seen before
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Step inside your designs and explore every detail in real time - giving stakeholders a true sense of place before it’s built. Check out our completed projects below.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/hero-1.mp4"
          title={
            <>
              1700 Spot
            </>
          }
          description="1700 Spot is an interactive, real-time platform that gamifies community consultation be enabling residents to collaboratively visualize, and shape their neighbourhoods using immersive 3D experiences"
          isComingSoon={false}
          projectUrl="https://arkounmerchant.com/projects/Russell-Heights-Hub"
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/shoquba-1.mp4"
            title={
              <>
                Shoquba
              </>
            }
            description="Shoquba is a real-estate platform allowing users to choose and customize their retail spaces before its built - all within a fully interactive 3D environment."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                Project ReVamp
              </>
            }
            description="A case-study for a long-term care facility in Ottawa, Canada - allowing residents to explore and customize their living spaces + amenities before its built."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/hero-2.mp4"
            title={
              <>
                Heuqueville Bunker
              </>
            }
            description="A virtual storytelling experience that lets you rediscover the immaterial qualities of Normandy’s Heuqueville Observation Bunker."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/hero-2.mp4"
            title={
              <>
                Nature Museum
              </>
            }
            description="Storytelling experience of Canada's Nature Museum. Allowing users to explore the building's history through through a unique visual narrative."
            isComingSoon
          />
        </BentoTilt>       

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5 relative overflow-hidden">
            {/* Watermark image */}
            <img
              src="img/Icon-1.png"
              alt="Watermark"
              className="absolute inset-0 m-auto w-2/3 opacity-10 pointer-events-none select-none"
              style={{ zIndex: 1 }}
            />
            <h1 className="bento-title special-font max-w-200 text-black relative z-10">
              M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
            </h1>
            <TiLocationArrow className="m-5 scale-[5] self-end relative z-10" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="videos/hero-2.mp4"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Projects;
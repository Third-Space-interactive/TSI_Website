import { ReactLenis } from "lenis/dist/lenis-react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export const SmoothScrollHero = ({ 
  sectionId = "scroll-section", // Add default value
  featuresTitle = "IMMERSIVE", 
  featuresDescription = "Creating interactive 3D environments that bridge the gap between design and reality. Experience architecture before it's built.",
  centerImage = "/img/russell-deployment.webp",
  parallaxImages = [
    "/img/russell-deployment.webp",
    "/img/russell-deployment.webp", 
    "/img/russell-deployment.webp",
    "/img/russell-deployment.webp"
  ]
}) => {
  return (
    <div id={sectionId} className="bg-zinc-950"> {/* Add the id here */}
      <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 0.05,
          //   infinite: true,
          //   syncTouch: true,
        }}
      >
        <Hero 
          featuresTitle={featuresTitle}
          featuresDescription={featuresDescription}
          centerImage={centerImage}
          parallaxImages={parallaxImages}
        />
      </ReactLenis>
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = ({ featuresTitle, featuresDescription, centerImage, parallaxImages }) => {
  const containerRef = useRef(null);
  
  return (
    <div
      ref={containerRef}
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage 
        containerRef={containerRef} 
        centerImage={centerImage}
      />

      <ParallaxImages 
        containerRef={containerRef} 
        parallaxImages={parallaxImages}
      />

      <BackgroundText 
        containerRef={containerRef}
        featuresTitle={featuresTitle}
        featuresDescription={featuresDescription}
      />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
};

const CenterImage = ({ containerRef, centerImage }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const clip1 = useTransform(scrollYProgress, [0, 0.5], [25, 0]);
  const clip2 = useTransform(scrollYProgress, [0, 0.5], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollYProgress,
    [0, 0.8],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0.8, 1],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(${centerImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

const BackgroundText = ({ containerRef, featuresTitle, featuresDescription }) => {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Text appears after the first image starts to fade and disappears before parallax images end
  const opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.4, 0.5], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0.4, 0.8], [100, -100]);

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
      style={{ opacity, scale, y }}
    >
      <div className="text-center max-w-4xl px-4">
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl font-black text-white/90 mb-4 select-none"
          style={{ 
            fontFamily: "Zentry, sans-serif",
            textShadow: "0 0 100px rgba(255,255,255,0.1)"
          }}
        >
          {featuresTitle}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed select-none"
          style={{ 
            fontFamily: "General Sans, sans-serif",
            textShadow: "0 0 60px rgba(255,255,255,0.1)"
          }}
        >
          {featuresDescription}
        </motion.p>
      </div>
    </motion.div>
  );
};

const ParallaxImages = ({ containerRef, parallaxImages }) => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px] relative z-10">
      <ParallaxImg
        containerRef={containerRef}
        src={parallaxImages[0]}
        alt="Project image 1"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        containerRef={containerRef}
        src={parallaxImages[1]}
        alt="Project image 2"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        containerRef={containerRef}
        src={parallaxImages[2]}
        alt="Project image 3"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        containerRef={containerRef}
        src={parallaxImages[3]}
        alt="Project image 4"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ containerRef, className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

// Add default export
export default SmoothScrollHero;
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import BentoCard from "./BentoCard";
import { BentoTilt } from "./Projects";
import Button from "./Button.jsx";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

// Project data
const projectData = {
  "1700-spot": {
    title: "1700 Spot",
    heroImage: "/videos/hero-1.mp4",
    description: "1700 Spot is an interactive, real-time platform that gamifies community consultation by enabling residents to collaboratively visualize, and shape their neighbourhoods using immersive 3D experiences",
    aboutTitle: 'Community Designed <br/> Community Built.',
    aboutText: "1700 Spot is a multifunctional public space co-designed with the Russell Heights community to promote youth mental health and well-being. Developed through a collaboration between community organizations and Carleton Architecture students, the space features a gathering zone, an outdoor cinema, and a gym. From the early stages of consultation, 3D visualizations proved especially engaging for the community- particularly the youth - who were excited to see representations of the spaces they helped shape.",
    aboutImage: "/img/russell-deployment.webp",
    featureTitle: "Interactive Community Engagement",
    featureDescription: "By deploying 1700 Spot through our custom web streaming service, we eliminated barriers and invited the entire community into the design process. Powered by AWS infrastructure, residents could explore, interact, and shape their neighborhood's vision from any device-turning community consultation into a shared adventure that sparked real enthusiasm and collective ownership.",
    bentoItems: [
      {
        src: "/videos/Russell-Heights/rh_features-2.mp4",
        title: "Interactive Design Annotations",
        description: "Real-time feedback and collaboration tools",
        isVideo: true,
        showButton: false,
      },
      {
        src: "/videos/Russell-Heights/rh_features-3.mp4", 
        title: "Displace Building Elements",
        description: "Quickly break apart your models into its different components",
        isVideo: true,
        useHoverEffect: true,
        logoSrc: '/img/Russell-Heights/displace.png',
        idleAnimation: 2
      },
      {
        src: "/videos/Russell-Heights/rh_features-1.mp4",
        title: "Real-time Weather and Lighting",
        description: "Experience dynamic lighting and different seasons",
        isVideo: true,
        useHoverEffect: true,
        logoSrc: '/img/Russell-Heights/tod.png',
        idleAnimation: 1
      },
      {
        src: "/videos/Russell-Heights/rh_features-4.mp4",
        title: "First Person Mode",
        description: "Explore your site from the ground before its built!",
        isVideo: true,
        useHoverEffect: true,
        logoSrc: '/img/Russell-Heights/fpv.png',
        idleAnimation: 3
      },
      {
        src: "/videos/Russell-Heights/rh_features-6.mp4",
        title: "Mobile + Web Support",
        description: "Check out your project at any time and on any device through the web",
        isVideo: true
      },
      {
        src: "/videos/hero-2.mp4",
        title: "And More!",
        description: "Let's push what's possible together",
        isVideo: true
      }
    ]
  },
  "shoquba": {
    title: "Shoquba",
    heroImage: "/videos/shoquba-1.mp4",
    description: "Shoquba is a real-estate platform allowing users to choose and customize their retail spaces before its built - all within a fully interactive 3D environment.",
    aboutTitle: 'Customize Before <br/> You Build',
    aboutText: "Shoquba revolutionizes retail space planning by putting the power of customization directly into the hands of future tenants. Our platform combines advanced 3D visualization with intuitive design tools, allowing users to experiment with layouts, materials, lighting, and branding elements in real-time. This approach reduces uncertainty, accelerates decision-making, and ensures that retail spaces are perfectly tailored to each business's unique needs before construction begins.",
    aboutImage: "/img/project-about-2.jpg",
    featureTitle: "Real-time Customization",
    featureDescription: "Design and visualize your perfect retail space with real-time 3D customization tools that bring your vision to life before construction begins.",
    bentoItems: [
      {
        src: "/videos/shoquba-feature-1.mp4",
        title: "Space Customization",
        description: "Design your retail space with drag-and-drop simplicity",
        isVideo: true
      },
      {
        src: "/videos/shoquba-feature-2.mp4",
        title: "Material Selection",
        description: "Choose from hundreds of materials and finishes",
        isVideo: true
      },
      {
        src: "/img/shoquba-bento-1.jpg",
        title: "Lighting Simulation",
        description: "Preview your space under different lighting conditions",
        isVideo: false
      },
      {
        src: "/img/shoquba-bento-2.jpg",
        title: "Business Integration",
        description: "Visualize your brand within the space",
        isVideo: false
      },
      {
        src: "/videos/hero-2.mp4",
        title: "Real-time Rendering",
        description: "See changes instantly in photorealistic quality",
        isVideo: true
      },
      {
        src: "/videos/hero-3.mp4",
        title: "Coming Soon",
        description: "More features in development",
        isVideo: true
      }
    ]
  }
};

// Simple animated text component
const AnimatedText = ({ text, className }) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = text.split(' ');
    textRef.current.innerHTML = words.map((word, index) => 
      `<span class="word" style="opacity: 0;">${word}${index < words.length - 1 ? ' ' : ''}</span>`
    ).join('');

    const wordElements = textRef.current.querySelectorAll('.word');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.to(wordElements, {
      opacity: 1,
      duration: 0.1,
      stagger: 0.08,
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [text]);

  return (
    <div ref={containerRef}>
      <p ref={textRef} className={className}>
        {text}
      </p>
    </div>
  );
};

// Hero text animation component
const HeroText = ({ text, className, isTitle = false }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = text.split(' ');
    textRef.current.innerHTML = words.map((word, index) => 
      `<span style="opacity: 0; transform: translateY(30px); display: inline-block;">${word}${index < words.length - 1 ? '&nbsp;' : ''}</span>`
    ).join('');

    const wordElements = textRef.current.querySelectorAll('span');

    gsap.to(wordElements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: isTitle ? 0.1 : 0.05,
      ease: "power2.out",
      delay: 0.5
    });

  }, [text, isTitle]);

  if (isTitle) {
    return <h1 ref={textRef} className={className}>{text}</h1>;
  }
  return <p ref={textRef} className={className}>{text}</p>;
};

const ProjectPage = () => {
  const { projectId } = useParams();
  const project = projectData[projectId];

  // Redirect if project doesn't exist
  useEffect(() => {
    if (!project) {
      window.location.href = '/#projects';
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Project not found. Redirecting...</p>
      </div>
    );
  }

  // Navigation handlers using full page refresh
  const handleReturnToProjects = () => {
    window.location.href = '/#projects';
  };

  const handleGetInTouch = () => {
    window.location.href = '/#contact';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // About section clip animation
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh", 
      borderRadius: 0,
    });

    // Text overlay animation
    gsap.set(".feature-overlay", {
      opacity: 0,
      y: 50
    });

    gsap.to(".feature-overlay", {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#about-clip",
        start: "center center",
        end: "+=400 center",
        scrub: true,
      }
    });
  });

  // Check if hero image is video
  const isHeroVideo = project.heroImage && project.heroImage.endsWith('.mp4');

  return (
    <>
      <style jsx>{`
        .mask-clip-path {
          width: 50vw;
          height: 50vh;
          border-radius: 20px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          overflow: hidden;
        }
        
        .about-image {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .word {
          display: inline;
        }
      `}</style>

      <main className="relative min-h-screen w-screen overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative h-screen w-screen overflow-hidden">
          {/* Background Media */}
          <div className="absolute inset-0">
            {isHeroVideo ? (
              <video
                src={project.heroImage}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-end">
            <div className="px-5 sm:px-10 pb-16 max-w-4xl">
              <HeroText
                text={project.title}
                className="special-font text-5xl sm:text-7xl md:text-8xl font-black text-white mb-4"
                isTitle={true}
              />
              
              <HeroText
                text={project.description}
                className="text-lg sm:text-xl text-blue-100 max-w-2xl mb-8"
              />
              
              <Button 
                title="Explore Project" 
                leftIcon={<TiLocationArrow/>}
                containerClass="!bg-yellow-300 !text-black flex items-center gap-2"
                onClick={() => scrollToSection('about-project')}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about-project" className="py-20">
          <div className="container mx-auto px-5 md:px-10">
            <div className="text-center mb-16">
              <AnimatedTitle
                title={project.aboutTitle}
                containerClass="!text-black mb-8"
              />
              
              <div className="max-w-4xl mx-auto">
                <AnimatedText 
                  text={project.aboutText}
                  className="text-lg text-gray-700 leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Clip Animation Section */}
          <div className="h-screen w-screen" id="about-clip">
            <div className="mask-clip-path about-image">
              <img
                src={project.aboutImage}
                alt={`${project.title} details`}
                className="w-full h-full object-cover"
              />
              
              {/* Feature overlay */}
              <div className="feature-overlay absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 special-font">
                  {project.featureTitle}
                </h2>
                <p className="text-lg text-white max-w-2xl" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                  {project.featureDescription}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="bg-black py-20">
          <div className="container mx-auto px-5 md:px-10">
            <div className="mb-16">
              <h2 className="text-2xl text-blue-50 mb-4">Project Features</h2>
              <p className="text-lg text-blue-50/70 max-w-md">
                Explore the key features and innovations that make {project.title} unique.
              </p>
            </div>

            {/* Main feature card */}
            <BentoTilt className="mb-8 h-96 md:h-[65vh] overflow-hidden rounded-lg">
              <BentoCard
                src={project.bentoItems[0]?.src}
                title={project.bentoItems[0]?.title}
                description={project.bentoItems[0]?.description}
                isVideo={project.bentoItems[0]?.isVideo}
                showButton={project.bentoItems[0]?.showButton}
                useHoverEffect={project.bentoItems[0]?.useHoverEffect}
                logoSrc={project.bentoItems[0]?.logoSrc}
                idleAnimation={project.bentoItems[0]?.idleAnimation}
              />
            </BentoTilt>

            {/* Features grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-auto">
              {project.bentoItems.slice(1).map((item, index) => (
                <BentoTilt key={index} className="h-64 overflow-hidden rounded-lg">
                  <BentoCard
                    src={item.src}
                    title={item.title}
                    description={item.description}
                    isComingSoon={index > 0} // First additional item is not coming soon
                    isVideo={item.isVideo}
                    showButton={false}
                    useHoverEffect={item.useHoverEffect}
                    logoSrc={item.logoSrc}
                    idleAnimation={item.idleAnimation}
                  />
                </BentoTilt>
              ))}
            </div>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="bg-black py-20">
          <div className="container mx-auto px-5 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Return to Projects */}
              <div 
                className="group relative h-64 overflow-hidden rounded-lg cursor-pointer"
                onClick={handleReturnToProjects}
              >
                <img 
                  src="/img/hero-3-mobile.webp"
                  className="w-full h-full object-cover"
                  alt="Projects background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    title="View All Projects"
                    leftIcon={<TiLocationArrow className="rotate-180" />}
                    containerClass="!bg-white !text-black"
                  />
                </div>
                
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Return to Projects</h3>
                  <p className="text-white/80">Explore our full portfolio</p>
                </div>
              </div>

              {/* Get in Touch */}
              <div 
                className="group relative h-64 overflow-hidden rounded-lg cursor-pointer"
                onClick={handleGetInTouch}
              >
                <img 
                  src="/img/russell-deployment.webp"
                  className="w-full h-full object-cover"
                  alt="Contact background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    title="Get in Touch"
                    leftIcon={<TiLocationArrow />}
                    containerClass="!bg-white !text-black"
                  />
                </div>
                
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Start Your Project</h3>
                  <p className="text-white/80">Let's create something amazing</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProjectPage;
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import BentoCard from "./BentoCard";
import { BentoTilt } from "./Projects";
import Button from "./Button.jsx";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

// Project data - you can move this to a separate file or fetch from an API
const projectData = {
  "1700-spot": {
    title: "1700 Spot",
    heroImage: "/videos/hero-1.mp4",
    description: "1700 Spot is an interactive, real-time platform that gamifies community consultation by enabling residents to collaboratively visualize, and shape their neighbourhoods using immersive 3D experiences",
    aboutTitle: 'Russell Heights',
    aboutText: "This groundbreaking project transforms how communities engage with urban planning. By leveraging cutting-edge game engine technology, we've created an immersive platform where residents can walk through proposed developments, provide feedback in real-time, and collaborate on shaping their neighborhood's future. The platform features photorealistic rendering, real-time lighting simulation, and intuitive interaction systems that make complex architectural concepts accessible to everyone.",
    aboutImage: "/img/russell-deployment.png",
    featureTitle: "Interactive Community Engagement",
    featureDescription: '"1700 Spot was deployed through the web using our in-house streaming and hosting service powered by AWS. This scalable approach allowed all community members to explore the applicaton - allowing for more engagement, support and excitment for the design"',
    bentoItems: [
      {
        src: "/videos/Russell-Heights/rh_features-2.mp4",
        title: "Interactive Design Annotations",
        description: "",
        isVideo: true,
        showButton:false,
      },
      {
        src: "/videos/Russell-Heights/rh_features-3.mp4", 
        title: "Displace Building Elements",
        description: "Quickly break apart your models into its different components",
        isVideo: true,
        useHoverEffect: true,
        logoSrc: '/img/rh/displace.png',
        idleAnimation: 2
      },
      {
        src: "/videos/Russell-Heights/rh_features-1.mp4",
        title: "Real-time Weather and Lighting",
        description: "Experience dynamic lighting and different seasons",
        isVideo: false,
        useHoverEffect: true,
        logoSrc: '/img/rh/tod.png',
        idleAnimation: 1
      },
      {
        src: "/videos/Russell-Heights/rh_features-4.mp4",
        title: "First Person Mode",
        description: "Explore your site from the ground before its built!",
        isVideo: false,
        useHoverEffect: true,
        logoSrc: '/img/rh/fpv.png',
        idleAnimation: 3
      },
      {
        src: "/videos/Russell-Heights/rh_features-6.mp4",
        title: "mobile + Web support",
        description: "Check out your project at any time and on any device through the web",
        isVideo: false
      }
    ]
  },
  "shoquba": {
    title: "Shoquba",
    heroImage: "/videos/shoquba-1.mp4",
    description: "Shoquba is a real-estate platform allowing users to choose and customize their retail spaces before its built - all within a fully interactive 3D environment.",
    aboutTitle: 'Russell Heights',
    aboutText: "Shoquba revolutionizes retail space planning by putting the power of customization directly into the hands of future tenants. Our platform combines advanced 3D visualization with intuitive design tools, allowing users to experiment with layouts, materials, lighting, and branding elements in real-time. This approach reduces uncertainty, accelerates decision-making, and ensures that retail spaces are perfectly tailored to each business's unique needs before construction begins.",
    aboutImage: "/img/project-about-2.jpg",
    featureTitle: "Customize Before You Build",
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
      }
    ]
  }
  // Add more projects as needed
};

// Reusable BentoCardWrapper component
const BentoCardWrapper = ({ bentoItem, className = "", isComingSoon = false, showButton = false }) => (
  <BentoTilt className={className}>
    <BentoCard
      src={bentoItem.src}
      title={bentoItem.title}
      description={bentoItem.description}
      isComingSoon={isComingSoon}
      isVideo={bentoItem.isVideo}
      showButton={showButton}
    />
  </BentoTilt>
);

const ProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const project = projectData[projectId];
  
  // If project doesn't exist, redirect to projects section
  useEffect(() => {
    if (!project) {
      navigate('/#projects');
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

  const totalVideos = 2;
  const nextVideoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  
  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(() => {
    if (hasClicked) {
      gsap.set('#next-video', { visibility: 'visible' });
      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => nextVideoRef.current.play(),
      });

      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    }
  }, { dependencies: [currentIndex], revertOnUpdate: true });

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%'
    });

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      }
    });
  });

  // About section clip animation - Following About.jsx structure
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

    // Separate animation for text overlay
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

  const getVideoSource = (index) => `videos/hero-${index}.mp4`;

  const handleReturnToProjects = () => {
    navigate('/');
    // Wait for navigation to complete, then scroll to projects
    setTimeout(() => {
      const projectsElement = document.getElementById('projects');
      if (projectsElement) {
        projectsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleGetInTouch = () => {
    navigate('/');
    // Wait for navigation to complete, then scroll to contact
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

    const handleReturnToHome = () => {
    navigate('/');
    // Wait for navigation to complete, then scroll to contact
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Helper function to check if heroImage is a video
  const isHeroVideo = project.heroImage && (project.heroImage.endsWith('.mp4') || project.heroImage.endsWith('.webm') || project.heroImage.endsWith('.mov'));

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
      `}</style>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Project Hero Section */}
      <div className="relative h-dvh w-screen overflow-x-hidden">
        
        {/* Hero Media Background */}
        <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg">
          {isHeroVideo ? (
            <video
              src={project.heroImage}
              autoPlay
              muted
              loop
              className="absolute left-0 top-0 size-full object-cover object-center"
              playsInline
              disablePictureInPicture
            />
          ) : (
            <img
              src={project.heroImage}
              alt={project.title}
              className="absolute left-0 top-0 size-full object-cover object-center"
            />
          )}
          
          {/* Dark overlay for better text readability */}
          <div className="absolute left-0 bottom-0 z-20 size-full bg-black/20" />
        </div>

        {/* Hero Content */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="absolute left-0 bottom-0 px-5 sm:px-10 pb-8 flex flex-col items-start gap-4 w-full">
            {/* Project Header */}
            <h1 
              className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-50" 
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              {project.title}
            </h1>
            <p className="mb-2 max-w-md font-robert-regular text-blue-100 text-lg" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
              {project.description}
            </p>
            <Button 
              id="scroll-down" 
              title="Explore Project" 
              leftIcon={<TiLocationArrow/>}
              containerClass="!bg-yellow-300 flex-center gap-1"
              onClick={() => {
                document.getElementById('about-project').scrollIntoView({ behavior: 'smooth' });
              }}
            /> 
          </div>
        </div>
      </div>
      

      {/* About Project Section */}
      <section id="about-project" className="min-h-screen w-screen">
        <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
          <div className="text-center">
            <AnimatedTitle
              title={project.aboutTitle}
              containerClass="mt-5 !text-black text-center"
            />  
            <p className="font-robert-regular text-lg text-blue-75 opacity-80 leading-relaxed max-w-4xl mx-auto mt-4">
              {project.aboutText}
            </p>
          </div>
        </div>

        {/* Clip Animation Section - Following About.jsx structure */}
        <div className="h-dvh w-screen" id="about-clip">
          <div className="mask-clip-path about-image">
            <img
              src={project.aboutImage}
              alt={`${project.title} project details`}
              className="absolute left-0 top-0 size-full object-cover"
              onError={(e) => {
                console.error('Failed to load about image:', project.aboutImage);
                e.target.style.display = 'none';
              }}
            />
            
            {/* Feature Text Overlay */}
            <div className="feature-overlay absolute inset-0 flex items-end justify-end z-10">
              <div className="text-center px-8 max-w-5xl w-full flex flex-col items-end mx-32">
                 <h3 className="special-font hero-heading text-4xl md:text-6xl text-blue-50 mb-6 font-bold text-right" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.8)" }}>
                    {project.featureTitle}
                  </h3>
                <div className="w-full md:w-1/2 max-w-lg">
                  <p
                    className="font-robert-regular text-lg md:text-xl text-white opacity-90 leading-relaxed text-right mb-10"
                    style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                  >
                    {project.featureDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Project Features Bento Grid */}
      <section className="bg-black pb-20">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Project Features
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Explore the key features and innovations that make {project.title} unique.
        </p>
      </div>
          
          {/* Main feature card - using first bentoItem */}
          <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
            <BentoCard
              src={project.bentoItems?.[0]?.src || "videos/hero-1.mp4"}
              title={
                <>
                  {project.bentoItems?.[0]?.title || project.title}
                </>
              }
              description={project.bentoItems?.[0]?.description || ""}
              isComingSoon={false}
              projectUrl={`/project/${projectId}`}
              isVideo={project.bentoItems?.[0]?.isVideo || true}
              showButton={project.bentoItems?.[0]?.showButton || false}
              useHoverEffect={project.bentoItems?.[0]?.useHoverEffect || false}
              logoSrc={project.bentoItems?.[0]?.logoSrc || "img/logo-1.png"}
              idleAnimation={project.bentoItems?.[0]?.idleAnimation || "1"}
              playsInline
              disablePictureInPicture
            />
          </BentoTilt>

          <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
            {/* First grid item - using second bentoItem */}
            <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
              <BentoCard
                src={project.bentoItems?.[1]?.src || "videos/shoquba-1.mp4"}
                title={
                  <>
                    {project.bentoItems?.[1]?.title || "Feature"}
                  </>
                }
                description={project.bentoItems?.[1]?.description || "Project feature description"}
                isComingSoon
                isVideo={project.bentoItems?.[1]?.isVideo || true}
                showButton={project.bentoItems?.[1]?.showButton || false}
                useHoverEffect={project.bentoItems?.[1]?.useHoverEffect || false}
                logoSrc={project.bentoItems?.[1]?.logoSrc || "img/logo-1.png"}
                idleAnimation={project.bentoItems?.[1]?.idleAnimation || "2"}
                playsInline
                disablePictureInPicture
              />
            </BentoTilt>

            {/* Second grid item - using third bentoItem */}
            <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
              <BentoCard
                src={project.bentoItems?.[2]?.src || "videos/feature-3.mp4"}
                title={
                  <>
                    {project.bentoItems?.[2]?.title || "Innovation"}
                  </>
                }
                description={project.bentoItems?.[2]?.description || "Innovative project feature"}
                isComingSoon
                isVideo={project.bentoItems?.[2]?.isVideo || true}
                showButton={project.bentoItems?.[2]?.showButton || false}
                useHoverEffect={project.bentoItems?.[2]?.useHoverEffect || false}
                logoSrc={project.bentoItems?.[2]?.logoSrc || "img/logo-1.png"}
                idleAnimation={project.bentoItems?.[2]?.idleAnimation || "2"}
                playsInline
                disablePictureInPicture
              />
            </BentoTilt>

            {/* Third grid item - using fourth bentoItem */}
            <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
              <BentoCard
                src={project.bentoItems?.[3]?.src || "videos/hero-2.mp4"}
                title={
                  <>
                    {project.bentoItems?.[3]?.title || "Technology"}
                  </>
                }
                description={project.bentoItems?.[3]?.description || "Advanced technology implementation"}
                isComingSoon
                isVideo={project.bentoItems?.[3]?.isVideo || true}
                showButton={project.bentoItems?.[3]?.showButton || false}
                useHoverEffect={project.bentoItems?.[3]?.useHoverEffect || false}
                logoSrc={project.bentoItems?.[3]?.logoSrc || "img/logo-1.png"}
                idleAnimation={project.bentoItems?.[3]?.idleAnimation || "2"}
                playsInline
                disablePictureInPicture
              />
            </BentoTilt>

            {/* Keep your existing static cards */}
            <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
              <BentoCard
                src={project.bentoItems?.[4]?.src || "videos/hero-2.mp4"}
                title={
                  <>
                    {project.bentoItems?.[4]?.title || "Technology"}
                  </>
                }
                description={project.bentoItems?.[4]?.description || "Advanced technology implementation"}
                isComingSoon
                isVideo={project.bentoItems?.[4]?.isVideo || true}
                showButton={project.bentoItems?.[4]?.showButton || false}
                useHoverEffect={project.bentoItems?.[4]?.useHoverEffect || false}
                logoSrc={project.bentoItems?.[4]?.logoSrc || "img/logo-1.png"}
                idleAnimation={project.bentoItems?.[4]?.idleAnimation || "2"}
                playsInline
                disablePictureInPicture
              />
            </BentoTilt>       
            {/* Keep your existing static cards */}
            <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
              <BentoCard
                src={project.bentoItems?.[5]?.src || "videos/hero-2.mp4"}
                title={
                  <>
                    {project.bentoItems?.[5]?.title || "And more!"}
                  </>
                }
                description={project.bentoItems?.[5]?.description || "Let's push what's possible together"}
                isComingSoon
                isVideo={project.bentoItems?.[5]?.isVideo || true}
                showButton={project.bentoItems?.[5]?.showButton || false}
                useHoverEffect={project.bentoItems?.[5]?.useHoverEffect || false}
                logoSrc={project.bentoItems?.[5]?.logoSrc || "img/logo-1.png"}
                idleAnimation={project.bentoItems?.[5]?.idleAnimation || "2"}
                playsInline
                disablePictureInPicture
              />
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

      {/* Navigation Section */}
      <section className="bg-black py-20">
        <div className="container mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Return to Projects */}
            <div 
              className="group relative h-64 overflow-hidden rounded-lg cursor-pointer bg-gradient-to-br from-blue-600 to-purple-700"
              onClick={handleReturnToProjects}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  title="Return to Projects"
                  leftIcon={<TiLocationArrow className="rotate-180" />}
                  containerClass="!bg-white !text-black flex-center gap-2"
                />
              </div>
              <div className="absolute bottom-4 left-4 z-5">
                <h3 className="font-circular-web text-2xl text-white">View All Projects</h3>
                <p className="font-robert-regular text-white opacity-70">Explore our portfolio</p>
              </div>
            </div>

            {/* Get in Touch */}
            <div 
              className="group relative h-64 overflow-hidden rounded-lg cursor-pointer bg-gradient-to-br from-yellow-500 to-orange-600"
              onClick={handleGetInTouch}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  title="Get in Touch"
                  leftIcon={<TiLocationArrow />}
                  containerClass="!bg-white !text-black flex-center gap-2"
                />
              </div>
              <div className="absolute bottom-4 left-4 z-5">
                <h3 className="font-circular-web text-2xl text-white">Start Your Project</h3>
                <p className="font-robert-regular text-white opacity-70">Let's create something amazing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectPage;
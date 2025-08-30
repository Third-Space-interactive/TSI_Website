import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import BentoCard from "./BentoCard";
import { BentoTilt } from "./Projects";
import Button from "./button";

gsap.registerPlugin(ScrollTrigger);

// Project data - you can move this to a separate file or fetch from an API
const projectData = {
  "1700-spot": {
    title: "1700 Spot",
    heroVideo: "videos/hero-1.mp4",
    description: "1700 Spot is an interactive, real-time platform that gamifies community consultation by enabling residents to collaboratively visualize, and shape their neighbourhoods using immersive 3D experiences",
    aboutText: "This groundbreaking project transforms how communities engage with urban planning. By leveraging cutting-edge game engine technology, we've created an immersive platform where residents can walk through proposed developments, provide feedback in real-time, and collaborate on shaping their neighborhood's future. The platform features photorealistic rendering, real-time lighting simulation, and intuitive interaction systems that make complex architectural concepts accessible to everyone.",
    aboutImage: "img/project-about-1.jpg",
    bentoItems: [
      {
        src: "videos/feature-1.mp4",
        title: "Real-time Collaboration",
        description: "Multiple users can explore and modify spaces simultaneously",
        isVideo: true
      },
      {
        src: "videos/feature-2.mp4", 
        title: "Interactive Elements",
        description: "Click, move, and customize every aspect of the environment",
        isVideo: true
      },
      {
        src: "img/bento-1.jpg",
        title: "Photorealistic Rendering",
        description: "Experience spaces with stunning visual fidelity",
        isVideo: false
      },
      {
        src: "img/bento-2.jpg",
        title: "Community Feedback",
        description: "Integrated feedback systems for stakeholder input",
        isVideo: false
      }
    ]
  },
  "shoquba": {
    title: "Shoquba",
    heroVideo: "videos/shoquba-1.mp4",
    description: "Shoquba is a real-estate platform allowing users to choose and customize their retail spaces before its built - all within a fully interactive 3D environment.",
    aboutText: "Shoquba revolutionizes retail space planning by putting the power of customization directly into the hands of future tenants. Our platform combines advanced 3D visualization with intuitive design tools, allowing users to experiment with layouts, materials, lighting, and branding elements in real-time. This approach reduces uncertainty, accelerates decision-making, and ensures that retail spaces are perfectly tailored to each business's unique needs before construction begins.",
    aboutImage: "img/project-about-2.jpg",
    bentoItems: [
      {
        src: "videos/shoquba-feature-1.mp4",
        title: "Space Customization",
        description: "Design your retail space with drag-and-drop simplicity",
        isVideo: true
      },
      {
        src: "videos/shoquba-feature-2.mp4",
        title: "Material Selection",
        description: "Choose from hundreds of materials and finishes",
        isVideo: true
      },
      {
        src: "img/shoquba-bento-1.jpg",
        title: "Lighting Simulation",
        description: "Preview your space under different lighting conditions",
        isVideo: false
      },
      {
        src: "img/shoquba-bento-2.jpg",
        title: "Business Integration",
        description: "Visualize your brand within the space",
        isVideo: false
      }
    ]
  }
  // Add more projects as needed
};

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

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden bg-black">
      {/* Project Hero Section */}
      <div className="relative h-dvh w-screen overflow-x-hidden">
        {isLoading && (
          <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
            <div className="three-body">
              <div className="three-body__dot" />
              <div className="three-body__dot" />
              <div className="three-body__dot" />
            </div>
          </div>
        )}
        
        <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
          <div>
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
              <div 
                onClick={handleMiniVdClick} 
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={nextVideoRef}
                  src={getVideoSource(upcomingVideoIndex)}
                  loop
                  muted
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover object-center"
                  onLoadedData={handleVideoLoad}
                />
              </div>
            </div>
            
            <video
              ref={nextVideoRef}
              src={getVideoSource(currentIndex)}
              loop
              muted
              id="next-video"
              className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
              onLoadedData={handleVideoLoad}
            />

            <video
              src={project.heroVideo}
              autoPlay
              loop
              muted
              className="absolute left-0 top-0 size-full object-cover object-center"
              onLoadedData={handleVideoLoad}
            />
          </div>

          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10">
              <h1 className="special-font hero-heading text-blue-100" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                {project.title}
              </h1>
              <p className="mb-5 max-w-md font-robert-regular text-blue-100" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
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
      </div>

      {/* About Project Section */}
      <section id="about-project" className="min-h-screen bg-black py-20">
        <div className="container mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-circular-web text-4xl md:text-6xl text-blue-50 mb-8">
                About This Project
              </h2>
              <p className="font-robert-regular text-lg text-blue-50 opacity-80 leading-relaxed">
                {project.aboutText}
              </p>
            </div>
            <div className="relative">
              <img
                src={project.aboutImage}
                alt={`${project.title} project details`}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Features Bento Grid */}
      <section className="bg-black pb-20">
        <div className="container mx-auto px-3 md:px-10">
          <div className="px-5 py-16">
            <h2 className="font-circular-web text-4xl md:text-6xl text-blue-50 mb-8">
              Project Features
            </h2>
            <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
              Explore the key features and innovations that make this project unique.
            </p>
          </div>

          <div className="grid h-[100vh] w-full grid-cols-2 grid-rows-2 gap-7">
            {project.bentoItems.map((item, index) => (
              <BentoTilt key={index} className="bento-tilt_1">
                <BentoCard
                  src={item.src}
                  title={item.title}
                  description={item.description}
                  isComingSoon={false}
                  isVideo={item.isVideo}
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
    </main>
  );
};

export default ProjectPage;
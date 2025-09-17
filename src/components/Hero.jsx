import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"; // Add this import
import Button from "./Button.jsx";
import { TiLocation, TiLocationArrow } from "react-icons/ti";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const location = useLocation(); // Add this
    const [currentIndex, setCurrentIndex] = useState(1)
    const [hasClicked, setHasClicked] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [loadedVideos, setLoadedVideos] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    const totalVideos = 3;
    const nextVideoRef = useRef(null);

    // Reset component state when returning to home page
    useEffect(() => {
        if (location.pathname === '/') {
            setCurrentIndex(1);
            setHasClicked(false);
            setIsLoading(true);
            setLoadedVideos(0);
            
            // Kill all existing ScrollTriggers to prevent conflicts
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            
            // Reset GSAP transforms on mini preview
            const miniPreview = document.querySelector('.mask-clip-path');
            if (miniPreview) {
                gsap.set(miniPreview, {
                    clearProps: "all"
                });
                
                const previewContent = miniPreview.querySelector('div');
                if (previewContent) {
                    gsap.set(previewContent, {
                        clearProps: "all",
                        scale: 0.5,
                        opacity: 0
                    });
                }
            }
            
            // Reset next video
            const nextVideo = document.getElementById('next-video');
            if (nextVideo) {
                gsap.set(nextVideo, {
                    clearProps: "all",
                    visibility: 'hidden',
                    scale: 1,
                    width: '16rem',
                    height: '16rem'
                });
            }
        }
    }, [location.pathname]);

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

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const handleImageLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const upcomingVideoIndex= (currentIndex % totalVideos) + 1;
    const handleMiniVdClick = () => {
        if (!isMobile) {
            setHasClicked(true);
            setCurrentIndex(upcomingVideoIndex);
        } else {
            setCurrentIndex(upcomingVideoIndex);
        }
    };

    useEffect(() => {
        const requiredLoads = isMobile ? 2 : totalVideos - 1;
        
        if(loadedVideos >= requiredLoads) {
            setIsLoading(false);
        }
    }, [loadedVideos, isMobile])

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (isLoading) {
                console.log('Force removing loading screen after timeout');
                setIsLoading(false);
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, [isLoading])

    // Enhanced cleanup and reset for page navigation
    useEffect(() => {
        const heroElement = document.querySelector('.hero-text-content');
        if (heroElement && location.pathname === '/') {
            ScrollTrigger.refresh();
            
            const timeout = setTimeout(() => {
                const titleElement = document.querySelector('.hero-title');
                const isHidden = titleElement && (
                    window.getComputedStyle(titleElement).opacity === '0' ||
                    titleElement.style.opacity === '0'
                );

                if (isHidden) {
                    console.log('Failsafe: Manually triggering hero text animations');
                    
                    gsap.set(['.hero-title', '.hero-subtitle', '.hero-button', '.hero-corner-text'], {
                        y: 100,
                        opacity: 0
                    });
                    
                    gsap.to(['.hero-title', '.hero-subtitle', '.hero-button', '.hero-corner-text'], {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        stagger: 0.2,
                        ease: 'power2.out',
                        delay: 0.1
                    });
                }
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [location.pathname])

    useEffect(() => {
        const handleScrollToTop = () => {
            if (window.scrollY === 0 && location.pathname === '/') {
                const timeout = setTimeout(() => {
                    const titleElement = document.querySelector('.hero-title');
                    if (titleElement && window.getComputedStyle(titleElement).opacity === '0') {
                        console.log('Logo click failsafe: Forcing hero animations');
                        
                        ScrollTrigger.getAll().forEach(trigger => {
                            if (trigger.vars && trigger.vars.trigger === '.hero-text-content') {
                                trigger.kill();
                            }
                        });
                        
                        gsap.set(['.hero-title', '.hero-subtitle', '.hero-button', '.hero-corner-text'], {
                            y: 0,
                            opacity: 1
                        });
                    }
                }, 200);
                
                return () => clearTimeout(timeout);
            }
        };

        window.addEventListener('scroll', handleScrollToTop);
        handleScrollToTop();

        return () => window.removeEventListener('scroll', handleScrollToTop);
    }, [location.pathname])

    useGSAP(() => {
        if(hasClicked && !isMobile) {
            gsap.set('#next-video', { visibility: 'visible'});
            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextVideoRef.current?.play(),
            })

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut',
            })
        }
    },{dependencies:[currentIndex], revertOnUpdate: true})

    useGSAP(() => {
        // Clear any existing animations first
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars && (
                trigger.vars.trigger === '#video-frame' || 
                trigger.vars.trigger === '.hero-text-content'
            )) {
                trigger.kill();
            }
        });

        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%'
        })

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
        })

        const resetAndAnimate = () => {
            gsap.set(['.hero-title', '.hero-subtitle', '.hero-button', '.hero-corner-text'], {
                y: 100,
                opacity: 0
            });

            const textTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.hero-text-content',
                    start: 'top bottom',
                    end: 'bottom top',
                    toggleActions: 'play none none reverse',
                    onEnter: () => {
                        textTimeline.restart();
                    }
                }
            });

            textTimeline.to('.hero-title', {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out',
            })
            .to('.hero-subtitle', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
            }, '-=0.6')
            .to('.hero-button', {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
            }, '-=0.4')
            .to('.hero-corner-text', {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
            }, '-=0.4');

            const exitTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: '.hero-text-content',
                    start: 'bottom center',
                    end: 'bottom top',
                    scrub: 1,
                }
            });

            exitTimeline.to('.hero-title', {
                y: -50,
                opacity: 0,
                duration: 0.5,
            })
            .to('.hero-subtitle', {
                y: -30,
                opacity: 0,
                duration: 0.5,
            }, '-=0.3')
            .to('.hero-button', {
                y: -20,
                opacity: 0,
                duration: 0.5,
            }, '-=0.3')
            .to('.hero-corner-text', {
                y: -20,
                opacity: 0,
                duration: 0.5,
            }, '-=0.3');
        };

        resetAndAnimate();

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars && (
                    trigger.vars.trigger === '#video-frame' || 
                    trigger.vars.trigger === '.hero-text-content'
                )) {
                    trigger.kill();
                }
            });
        };
    }, [location.pathname]) // Add location.pathname as dependency

    const getVideoSource = (index) => `videos/hero-${index}.mp4`;
    const getMobileImageSource = (index) => `img/hero-${index}-mobile.webp`;
    const getPosterSource = (index) => `img/hero-${index}-poster.jpg`;

  return (
    <div className= "relative h-dvh w-screen overflow-x-hidden">

        {isLoading && (
            <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                <div className="three-body">
                    <div className="three-body__dot"/>
                    <div className="three-body__dot"/>
                    <div className="three-body__dot"/>
                </div>
            </div>
        )}
        
        <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
            <div>
                {/* Mini preview - video on desktop, image on mobile */}
                <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                    <div 
                        onClick={handleMiniVdClick} 
                        className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                    >
                        {isMobile ? (
                            <img
                                src={getMobileImageSource(upcomingVideoIndex)}
                                alt={`Hero ${upcomingVideoIndex}`}
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoad={handleImageLoad}
                                loading="eager"
                            />
                        ) : (
                            <video
                                ref={nextVideoRef}
                                src={getVideoSource(upcomingVideoIndex)}
                                poster={getPosterSource(upcomingVideoIndex)}
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoad}
                            />
                        )}
                    </div>
                </div>
                
                {/* Next video (for transitions) - desktop only */}
                {!isMobile && (
                    <video
                        ref={nextVideoRef}
                        src={getVideoSource(currentIndex)}
                        poster={getPosterSource(currentIndex)}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                )}

                {/* Main background - video on desktop, image on mobile */}
                {isMobile ? (
                    <img
                        src={getMobileImageSource(currentIndex)}
                        alt={`Hero background ${currentIndex}`}
                        className="absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-500"
                        onLoad={handleImageLoad}
                        loading="eager"
                    />
                ) : (
                    <video
                        src={getVideoSource(currentIndex)}
                        poster={getPosterSource(currentIndex)}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoad}
                    />
                )}
                
                {/* Gradient overlay from top */}
                <div className="absolute left-0 top-0 size-full bg-gradient-to-b from-black/30 via-black/10 to-transparent z-10 pointer-events-none"></div>
            </div> 
            
            {/* Hero text overlay */}
            <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-50 hero-corner-text">
                 archviz
            </h1>

            <div className="absolute left-0 top-0 z-40 size-full hero-text-content">
                <div className="mt-24 px-5 sm:px-10">
                    <h1 className="special-font hero-heading text-blue-50 hero-title">
                        third Space Interactive
                    </h1>
                    <p className="mb-5 max-w-64 font-robert-regular text-blue-50 hero-subtitle" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                        Where game-engine visualization meets architectural realization
                    </p>

                    <div className="hero-button">
                        <Button 
                            id="book-demo" 
                            title="Book a Demo" 
                            leftIcon={<TiLocationArrow/>}
                            containerClass="!bg-yellow-300 flex-center gap-1 absolute"
                            href='./#contact'
                        />
                    </div>
                </div>
            </div>
            
            {/* Mobile loading indicator */}
            {isMobile && isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-75/50 z-30">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p className="text-white text-sm">Loading images...</p>
                    </div>
                </div>
            )}
        </div>
        
        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
             archviz
        </h1>
    </div>
  )
}

export default Hero
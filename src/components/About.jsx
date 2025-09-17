import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const location = useLocation();

  // Aggressive reset when returning to home page
  useEffect(() => {
    if (location.pathname === '/') {
      // Kill ALL ScrollTriggers to prevent conflicts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Clear all GSAP properties and reset elements
      gsap.set("*", { clearProps: "all" });
      
      // Wait for DOM to be ready, then reset specific elements
      setTimeout(() => {
        const maskElement = document.querySelector('.mask-clip-path');
        const clipContainer = document.getElementById('clip');
        
        if (maskElement) {
          // Force reset inline styles
          maskElement.removeAttribute('style');
          
          // Set initial state using CSS classes instead of GSAP
          maskElement.style.width = '50vw';
          maskElement.style.height = '50vh';
          maskElement.style.borderRadius = '20px';
          maskElement.style.position = 'absolute';
          maskElement.style.left = '50%';
          maskElement.style.top = '50%';
          maskElement.style.transform = 'translate(-50%, -50%)';
          maskElement.style.overflow = 'hidden';
        }
        
        if (clipContainer) {
          // Reset the clip container
          clipContainer.removeAttribute('style');
          gsap.set(clipContainer, { clearProps: "all" });
        }
        
        // Refresh ScrollTrigger after reset
        ScrollTrigger.refresh();
      }, 200);
    }
  }, [location.pathname]);

  useGSAP(() => {
    // Only create animation if we're on the home page
    if (location.pathname !== '/') return;
    
    // Kill any existing ScrollTriggers for this element
    ScrollTrigger.getAll().forEach(trigger => {
      if (trigger.vars && trigger.vars.trigger === "#clip") {
        trigger.kill();
      }
    });

    // Ensure initial state is set
    const maskElement = document.querySelector('.mask-clip-path');
    if (maskElement) {
      gsap.set(maskElement, {
        width: "50vw",
        height: "50vh",
        borderRadius: "20px",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
      });
    }

    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        onRefresh: () => {
          // Reset on refresh
          if (maskElement) {
            gsap.set(maskElement, {
              width: "50vw",
              height: "50vh",
              borderRadius: "20px"
            });
          }
        },
        onLeave: () => {
          // Reset when leaving
          if (maskElement) {
            gsap.set(maskElement, {
              width: "50vw",
              height: "50vh",
              borderRadius: "20px"
            });
          }
        },
        onLeaveBack: () => {
          // Reset when scrolling back up
          if (maskElement) {
            gsap.set(maskElement, {
              width: "50vw",
              height: "50vh",
              borderRadius: "20px"
            });
          }
        }
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
      left: "0%",
      top: "0%",
      transform: "translate(0%, 0%)"
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === "#clip") {
          trigger.kill();
        }
      });
      
      // Force reset on cleanup
      const maskElement = document.querySelector('.mask-clip-path');
      if (maskElement) {
        maskElement.removeAttribute('style');
      }
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-screen">
      <div className="relative mb-8 flex flex-col items-center gap-5">

        <AnimatedTitle
          title="Show c<b>o</b>mmunities the future - <br/> and <b>b</b>ring them on board"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext -my-10 sm:my-10">
          <p>Spark excitement, build trust, and gain support for your projects.</p>
          <p className="text-gray-500">
            Our real-time visual experiences make it easy for communities and stakeholders to explore, connect with, and believe in your vision.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/hero-3-mobile.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
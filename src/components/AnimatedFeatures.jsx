import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const AnimatedIcon = () => {
  const containerRef = useRef(null)
  const iconRefs = useRef([])
  const animationRefs = useRef([])

  const features = [
    {
      // icon: "🚶🏻", // Walking person (lighter skin tone for more neutral look)
      imgSrc: "/img/rh/fpv.png", // Optional: use this instead of emoji
      caption: "Walk through designs in real time",
      animation: 2 // Float animation
    },
    {
      icon: "🎨", // Palette (naturally has black/white elements)
      // imgSrc: "/path/to/palette-icon.svg", // Optional: use this instead of emoji
      caption: "Explore options for finishes, materials, and layouts",
      animation: 4 // Pulse animation
    },
    {
      icon: "☁️", // Cloud (naturally white/gray)
      // imgSrc: "/path/to/weather-icon.svg", // Optional: use this instead of emoji
      caption: "Toggle seasons, weather, and lighting to see spaces in context",
      animation: 1 // Rotate animation
    },
    {
      icon: "📋", // Clipboard (naturally has black/white elements)
      // imgSrc: "/path/to/clipboard-icon.svg", // Optional: use this instead of emoji
      caption: "Review design phases and project updates interactively",
      animation: 3 // Wiggle animation
    },
    {
      icon: "💬", // Speech bubble
      // imgSrc: "/path/to/chat-icon.svg", // Optional: use this instead of emoji
      caption: "Share feedback that shapes the final outcome",
      animation: 5 // Bounce animation
    },
    {
      icon: "🌐", // Globe with meridians (naturally black/white)
      // imgSrc: "/path/to/web-icon.svg", // Optional: use this instead of emoji
      caption: "Stream to any device instantly - no downloads required",
      animation: 1 // Rotate animation (globe spinning)
    }
  ]

  // Function to start icon animations
  const startIconAnimations = () => {
    features.forEach((feature, index) => {
      const iconElement = iconRefs.current[index]
      if (!iconElement || !feature.animation) return

      // Kill existing animation if any
      if (animationRefs.current[index]) {
        animationRefs.current[index].kill()
      }

      // Add staggered delay for each icon
      const delay = index * 0.1 // 100ms delay between each icon

      switch (feature.animation) {
        case 1: // Rotate
          animationRefs.current[index] = gsap.to(iconElement, {
            rotation: 360,
            duration: 4,
            ease: "none",
            repeat: -1,
            delay: delay
          })
          break
        
        case 2: // Float
          animationRefs.current[index] = gsap.to(iconElement, {
            y: -10,
            duration: 2,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: delay
          })
          break
        
        case 3: // Wiggle
          animationRefs.current[index] = gsap.to(iconElement, {
            rotation: 15,
            duration: 1.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: delay
          })
          break
        
        case 4: // Pulse
          animationRefs.current[index] = gsap.to(iconElement, {
            scale: 1.1,
            duration: 1.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: delay
          })
          break
        
        case 5: // Bounce
          animationRefs.current[index] = gsap.to(iconElement, {
            y: -15,
            duration: 0.6,
            ease: "bounce.out",
            repeat: -1,
            repeatDelay: 2,
            delay: delay
          })
          break
        
        default:
          break
      }
    })
  }

  useEffect(() => {
    if (!containerRef.current) return

    // Create ScrollTrigger to start animations when component comes into view
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        startIconAnimations()
      },
      once: true // Only trigger once
    })

    // Cleanup function
    return () => {
      trigger.kill()
      animationRefs.current.forEach(animation => {
        if (animation) animation.kill()
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="animated-icons-container">
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <div 
              ref={el => iconRefs.current[index] = el}
              className="feature-icon"
            >
              {feature.imgSrc ? (
                <img 
                  src={feature.imgSrc} 
                  alt={feature.caption} 
                  className="icon-image"
                />
              ) : (
                feature.icon
              )}
            </div>
            <p className="feature-caption">{feature.caption}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        .animated-icons-container {
          padding: 2rem 0;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }
        
        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .feature-item:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
        }
        
        .icon-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        
        .feature-caption {
          font-size: 0.9rem;
          line-height: 1.4;
          color: #666;
          margin: 0;
          max-width: 180px;
        }
        
        @media (max-width: 768px) {
          .animated-icons-container {
            padding: 1rem;
          }
          
          .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }
          
          .feature-item {
            padding: 1rem;
          }
          
          .feature-icon {
            font-size: 2rem;
            width: 50px;
            height: 50px;
          }
          
          .feature-caption {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  )
}

export default AnimatedIcon
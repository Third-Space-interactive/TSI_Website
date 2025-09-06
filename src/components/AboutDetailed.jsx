import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const AboutDetailed = () => {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  const text = "Third Space Interactive is an architectural visualization studio specializing in extended reality (XR) applications built in Unreal Engine. We create interactive experiences for real estate, community consultation, and storytelling that transform static proposals into playable, explorable spaces. By bridging the gap between design and reality, our work helps people better connect with their built environment, engage in meaningful dialogue, and shape shared futures together."

  useEffect(() => {
    if (!textRef.current) return

    // Split text into words and wrap each in a span
    const words = text.split(' ')
    textRef.current.innerHTML = words.map((word, index) => 
      `<span class="word" style="opacity: 0;">${word}${index < words.length - 1 ? ' ' : ''}</span>`
    ).join('')

    const wordElements = textRef.current.querySelectorAll('.word')

    // Create the typing animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Animation starts when top of element hits 80% of viewport
        toggleActions: "play none none none"
      }
    })

    // Animate each word with a stagger effect
    tl.to(wordElements, {
      opacity: 1,
      duration: 0.1,
      stagger: 0.08, // Delay between each word
      ease: "none"
    })

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div id="about" ref={containerRef} className="about-detailed-container">

      <div className="about-content relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
           Welcome to Third Space Interactive
        </p>
        <p ref={textRef} className="animated-text">
          {/* Text will be replaced by JavaScript */}
        </p>
      </div>
      
      <style jsx>{`
        .about-detailed-container {
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
          font-family: 'Arial', sans-serif;
        }
        
        .about-content {
          line-height: 1.6;
        }
        
        .animated-text {
          font-size: 1.1rem;
          color: #333;
          margin: 0;
        }
        
        .word {
          display: inline;
        }
        
        /* Highlight the company name */
        .font-general .word:first-child,
        .font-general .word:nth-child(2),
        .afont-general .word:nth-child(3) {
          font-weight: bold;
          color: #2c5aa0;
        }
        
        /* Add a subtle cursor effect on the last visible word */
        .font-general .word.typing::after {
          content: '|';
          animation: blink 1s infinite;
          margin-left: 2px;
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default AboutDetailed
import React, { useRef } from 'react'
import AnimatedTitle from './AnimatedTitle'

import gsap from 'gsap';
import Button from "./Button.jsx";

const Services = () => {
    const frameRef = useRef('null');

const handleMouseLeave = () => {
    const element = frameRef.current;

    gsap.to(element, {
    duration: 0.3,
    rotateX: 0,
    rotateY: 0,
    ease: 'power1.inOut'
    })
}

const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if(!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY ) / centerY ) * -10;
    const rotateY = ((x - centerX) / centerX ) * 10;

    gsap.to(element, {
        duration: 0.3,
        rotateX, rotateY,
        transformPerspective: 500,
        ease: 'power1.inOut'
    })
}

  return (
    <section id="services" className="min-h-dvh w-screen bg-black text-blue-50">
        <div className='flex size-full flex-col items-center py-10 '>
            <p className='font-general text-sm uppercase md:text-[10px]'>
                Discover What We Can Build Together
            </p>

            <div className='relative w-full'>
                <AnimatedTitle
                    title="Your Gateway to Immersion"
                    sectionId="#services"
                    containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
                />

                <div className='story-img-container'>
                    <div className='story-img-mask'>
                        <div className="story-img-content">
                            <img
                                ref={frameRef}
                                onMouseLeave={handleMouseLeave}
                                onMouseUp={handleMouseLeave}
                                onMouseEnter={handleMouseLeave}
                                onMouseMove={handleMouseMove}
                                src='/img/entrance.png'
                                alt="entrance"
                                className='object-contain'
                            />
                        </div>
                    </div>

                <svg
                className="invisible absolute size-0"
                xmlns="http://www.w3.org/2000/svg"
                >
                <defs>
                    <filter id="flt_tag">
                    <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation="8"
                        result="blur"
                    />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                        result="flt_tag"
                    />
                    <feComposite
                        in="SourceGraphic"
                        in2="flt_tag"
                        operator="atop"
                    />
                    </filter>
                </defs>
                </svg>
                </div>
                
                {/*flex-row of three services offered by company*/}
                <div className="flex w-full flex-col items-center pb-30 -mt-80">
                    <div className="flex flex-col lg:flex-row md:flex-col sm:flex-col items-center justify-center gap-6 sm:gap-6 mb-6 lg:mt-0 md:-mt-80 sm:-mt-80">
                        <AnimatedTitle
                            title="XR"
                            sectionId="#xr"
                            containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
                        />
                        <div className="w-6 h-0.5 sm:w-0.5 h-20 border-t-2 sm:border-t-0 sm:border-l-2 border-blue-300 sm:mx-2" />
                        <AnimatedTitle
                            title="VR"
                            sectionId="#vr"
                            containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
                        />                        
                        <div className="w-6 h-0.5 sm:w-0.5 h-20 border-t-2 sm:border-t-0 sm:border-l-2 border-blue-300 sm:mx-2" />
                        <AnimatedTitle
                            title="Deployment"
                            sectionId="#deployment"
                            containerClass='mt-5 pointer-events-none mix-blend-difference relative z-10'
                        />                        
                    </div>
                    
                    {/* Paragraph and button section */}
                    <div className="flex w-full justify-center md:me-44 md:justify-end">
                        <div className="flex h-full w-fit flex-col items-center md:items-start">
                            <p className="mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start">
                                It has never been easier to bring your vision to life. Get in touch and let's bring your idea into reality!
                            </p>
                            <Button 
                                id='get-in-touch'
                                title='Get In Touch!'
                                containerClass='mt-5 bg-blue-50'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Services
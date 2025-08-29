import React, { useState, useRef } from 'react'
import { TiLocationArrow } from 'react-icons/ti'

const BentoTilt = ({ children, className = ''}) => {
    const [transformStyle, setTransformStyle] = useState ('');
    const itemRef = useRef();
    
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
    )
}

const BentoCard = ({src, title, description, isComingSoon}) => {
    return (
        <div className="relative size-full">
            <video
            src={src}
            loop
            muted
            autoPlay
            className='absolute left-0 top-0 size-full object-cover'
            />
            <div className='relative z-10 flex size-full flex-col justify-between p-5 text-blue-50'>
                <h1 className="bento-title">{title}</h1>
                {description && (
                    <p className='mt-3 max-w-64 text-xs md:text-base'>{description}</p>
                )}
            </div>
            
        </div>
    )
}

const Projects = () => {
  return (
    <section id="projects" className="bg-black pb-52">
        <div className="container mx-auto px-3 md:px-10">
            <div className='px-5 py-32'>
                <p className="font-circular-web text-lg text-blue-50">
                    Interactivity like you've never seen before.
                </p>
            <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">

                Step inside your designs and explore every detail in real time - giving stakeholders a true sense of place before it’s built. Check out our completed projects below.
            </p>
            </div>
            
        
        <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
            <BentoCard 
                src='videos/hero-1.mp4'
                title={<>1700 Spot</>}
                description = '1700 Spot is an interactive, real-time platform that gamifies community consultation be enabling residents to collaboratively visualize, and shape their neighbourhoods using immersive 3D experiences.'
                isComingSoon={false}
                />
        </BentoTilt>
        <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
            <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
                <BentoCard
                src='videos/shoquba-1.mp4'
                title={<>Shoquba</>}
                description={'Shoquba is a real-estate platform allowing users to choose and customize their retail spaces before its built - all within a fully interactive 3D environment.'}
                />

            </BentoTilt>
            <BentoTilt className='bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
                    <BentoCard
                    src="videos/feature-3.mp4"
                    title={<>Project ReVamp</>}
                    description={'A case-study for a long-term care facility in Ottawa, Canada - allowing residents to explore and customize their living spaces + amenities before its built.'}
                />
            </BentoTilt>
            <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
                    <BentoCard
                    src="videos/feature-4.mp4"
                    title={<>Heuqueville Bunker</>}
                    description={'“A virtual storytelling experience that lets you rediscover the immaterial qualities of Normandy’s Heuqueville Observation Bunker.”'}
                />
            
            </BentoTilt>
                <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
                    <BentoCard 
                        src='videos/hero-2.mp4'
                        title={<>Nature Museum</>}
                        description = "Storytelling experience of Canada's Nature Museum. Allowing users to explore the building's history through through a unique visual narrative."
                        isComingSoon={false}
                        />
                </BentoTilt>
                <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7'>
                        <div className="bento-tilt_2">
                            <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                                <h1 className="bento-title special-font max-w-64 text-black">
                                M<b>o</b>re co<b>m</b>ing s<b>o</b>on!
                                </h1>

                                <TiLocationArrow className="m-5 scale-[5] self-end" />
                            </div>
                        </div>
                    <div className='bento-tilt_2'>
                        <video
                            src="videos/feature-5.mp4"
                            loop
                            muted
                            autoPlay
                            className='size-full object-cover object-cover'
                        />
                    </div>
                </div>
        </div>
        </div>

    </section>
  )
}

export default Projects
import React, { useState } from "react";
import { motion } from "framer-motion";

// Sample testimonials data - replace with your actual testimonials
const testimonials = [
  {
    testimonial: "Working with Third Space Interactive was an incredible experience. They delivered exactly what we needed and exceeded our expectations.",
    name: "Sarah Johnson",
    company: "Tech Innovations Inc",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    testimonial: "Their attention to detail and creative approach made our project stand out. Highly recommend their services!",
    name: "Michael Chen",
    company: "Creative Solutions LLC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    testimonial: "Professional, reliable, and innovative. Third Space Interactive transformed our vision into reality.",
    name: "Emily Davis",
    company: "Digital Dynamics",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];

// Animation variants
const textVariant = (delay = 0) => ({
  hidden: {
    y: -50,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 1.25,
      delay: delay,
    },
  },
});

const fadeIn = (direction = "", type = "spring", delay = 0, duration = 0.75) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type: type,
      delay: delay,
      duration: duration,
      ease: "easeOut",
    },
  },
});

const FeedbackCard = ({
  index,
  testimonial,
  name,
  company,
  image,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      variants={fadeIn("", "spring", index * 0.5, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className='relative bg-black p-10 rounded-3xl xs:w-[320px] w-full shadow-lg overflow-hidden cursor-pointer'
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cursor glow effect */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1), transparent 40%)`,
        }}
      />
      
      {/* Card border glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.2), transparent 50%)`,
          maskImage: 'linear-gradient(black, black)',
          WebkitMaskImage: 'linear-gradient(black, black)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <p className='text-white font-black text-[48px] leading-none'>"</p>

        <div className='mt-1'>
          <p className='text-white tracking-wider text-[18px] leading-relaxed'>{testimonial}</p>

          <div className='mt-7 flex justify-between items-center gap-1'>
            <div className='flex-1 flex flex-col'>
              <p className='text-white font-medium text-[16px]'>
                <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>@</span> {name}
              </p>
              <p className='mt-1 text-gray-400 text-[12px]'>
                {company}
              </p>
            </div>

            <img
              src={image}
              alt={`feedback_by-${name}`}
              className='w-10 h-10 rounded-full object-cover'
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <div id="testimonials" className="relative rounded-lg py-24 text-blue-50 sm:overflow-hidden">
      <div className="relative rounded-lg py-24 text-blue-50 sm:overflow-hidden">
        <motion.div 
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
        </motion.div>
      </div>
      
      <div className="-mt-20 pb-14 px-6 sm:px-16 flex flex-wrap gap-7 justify-center">
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
import { useRef, useState, useEffect } from 'react'
import { TiLocationArrow } from 'react-icons/ti';
import { gsap } from 'gsap';

import Button from "./Button.jsx";
import { useWindowScroll } from 'react-use';

const navItems = ['About', 'Services', 'Projects', 'Testimonials'];

const Navbar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navContainerRef = useRef(null);
    const audioElementRef = useRef(null);

    const { y: currentScrollY }= useWindowScroll();

    useEffect(() => {
        if(currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove('floating-nav');
        } else if(currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add('flaoting-nav');
        } else if(currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current.classList.add('floating-nav');
        }

        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
    })
    }, [isNavVisible])
    

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };
  // Manage audio playback
  useEffect(() => {
    if (!audioElementRef.current) return; // <-- Prevents error
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking on a nav item
  const handleNavItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'>
        <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>
            <div className='flex items-center gap-7'>
                <button 
                    onClick={scrollToTop}
                    className='cursor-pointer transition-transform duration-200 hover:scale-110'
                    aria-label='Go to top of page'
                >
                    <img src="/img/logo.png" alt='logo' className='w-10'/>
                </button>
            </div>

            <div className='flex h-full items-center'>
                <div className='hidden md:block mx-10' style={{textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
                    {navItems.map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                            {item}
                        </a>
                    ))}
                </div>

                <Button
                    id='contact-button'
                    title='Contact'
                    rightIcon={<TiLocationArrow/>}
                    containerClass='bg-blue-50 md:flex hidden items-center justofy-center gap-1'
                    href='./#contact'
                />

                {/* Hamburger Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className='md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 ml-4'
                    aria-label='Toggle menu'
                >
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </div>
        </nav>

        </header>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <div className='flex flex-col p-6 space-y-6'>
                {navItems.map((item) => (
                    <a 
                        key={item} 
                        href={`#${item.toLowerCase()}`} 
                        className='text-white text-lg font-medium hover:text-blue-400 transition-colors duration-200'
                        onClick={handleNavItemClick}
                    >
                        {item}
                    </a>
                ))}
                <Button
                    id='mobile-contact-button'
                    title='Contact'
                    rightIcon={<TiLocationArrow/>}
                    containerClass='bg-blue-50 flex items-center justify-center gap-1 w-full'
                    href='./#contact'
                />
            </div>
        </div>
        </div>

  )
}

export default Navbar
import React from 'react'

const Button = ({title, id, rightIcon, leftIcon, containerClass, href, target, onClick}) => {
  const baseClasses = `group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black transform transition-transform duration-200 ease-in-out hover:scale-105 after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100 dark:after:bg-white ${containerClass}`
  
  const content = (
    <>
      {leftIcon}
      <span className="relative incline-flex overflow-hidden font-general text-xs uppercase">
        <div>
          {title}
        </div>
      </span>
      {rightIcon}
    </>
  )

  // If href is provided, render as a link
  if (href) {
    return (
      <a 
        id={id} 
        href={href}
        target={target}
        className={baseClasses}
      >
        {content}
      </a>
    )
  }

  // Otherwise, render as a button
  return (
    <button 
      id={id} 
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </button>
  )
}

export default Button
import React from 'react'

const Button = ({title, id, rightIcon, leftIcon, containerClass, href, target, onClick}) => {
  const baseClasses = `group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full px-7 py-3 text-black ${containerClass}`
  
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
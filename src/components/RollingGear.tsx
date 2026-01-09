import React, { useEffect, useRef, useState } from 'react';

interface RollingGearProps {
  icon: React.ReactNode;
  color?: string;
  scrollY: number;
}

export const RollingGear: React.FC<RollingGearProps> = ({ 
  icon, 
  color = 'red',
  scrollY
}) => {
  const [offsetTop, setOffsetTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance observer (just to get offset, simplified)
    if (ref.current) {
       let currentElement = ref.current;
       let top = 0;
       while (currentElement) {
           top += currentElement.offsetTop;
           currentElement = currentElement.offsetParent as HTMLDivElement;
       }
       setOffsetTop(top);
    }
  }, []);

  // Update offsetTop on resize to be safe
  useEffect(() => {
      const handleResize = () => {
          if (ref.current) {
              let currentElement = ref.current;
              let top = 0;
              while (currentElement) {
                  top += currentElement.offsetTop;
                  currentElement = currentElement.offsetParent as HTMLDivElement;
              }
              setOffsetTop(top);
          }
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gearColorClass = {
    red: 'text-red-600',
    orange: 'text-orange-500',
    amber: 'text-amber-500'
  }[color] || 'text-red-600';

  // Calculate Scroll-Driven Animation Logic
  
  // We want the gear to:
  // 1. Roll in from LEFT
  // 2. LOCK in CENTER for a while
  // 3. Roll out to RIGHT

  const viewportHeight = window.innerHeight;
  
  // The scroll position where the element *starts* being centered
  const centerStartScrollY = offsetTop - viewportHeight * 0.6;
  
  // Define a "Lock Zone" range (e.g., 300px of scrolling)
  const lockRange = 150;
  
  // The scroll position where the element *stops* being locked and starts exiting
  const centerEndScrollY = centerStartScrollY + lockRange;

  let translateX = 0;
  let distanceFromLock = 0;

  // Sensitivity for rolling speed
  const sensitivity = 0.6; 

  if (scrollY < centerStartScrollY) {
      // Phase 1: Entering (Rolling In)
      // We are "before" the lock zone. 
      // Distance is negative relative to start.
      const dist = scrollY - centerStartScrollY;
      translateX = dist * sensitivity;
      distanceFromLock = dist; // For opacity calculation
  } else if (scrollY >= centerStartScrollY && scrollY <= centerEndScrollY) {
      // Phase 2: Locked (Center)
      // We are inside the lock zone.
      // Gear stays at 0.
      translateX = 0;
      distanceFromLock = 0; // Fully visible
  } else {
      // Phase 3: Exiting (Rolling Out)
      // We are "after" the lock zone.
      // Distance is positive relative to end.
      const dist = scrollY - centerEndScrollY;
      translateX = dist * sensitivity;
      distanceFromLock = dist;
  }
  
  // Rotation is linked to translation for "rolling" effect
  // Circumference = PI * diameter. Diameter ~ 256px (w-64). C ~ 800px.
  // 360deg rotation per ~800px movement.
  // If Locked (translateX=0), we might want it to keep spinning slowly or stop?
  // Let's keep it linked to movement so it "stops rolling" when locked.
  const rotateDeg = (translateX / 800) * 360;

  // Opacity: 
  // Entrance (negative distance): Fade in as it approaches lock zone.
  // Locked: Fully opaque.
  // Exit (positive distance): Keep visible then fade out.
  let opacity = 1;
  if (scrollY < centerStartScrollY) {
      // Entering: Fade in
      opacity = Math.max(0, 1 - Math.abs(distanceFromLock) / 400);
  } else if (scrollY > centerEndScrollY) {
       // Exiting: Fade out late (after rolling away a bit)
      opacity = Math.max(0, 1 - (distanceFromLock - 200) / 400);
  } else {
      // Locked
      opacity = 1;
  }

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-4 relative h-[300px] w-full max-w-[300px]">
      {/* 
          The Rolling Gear (Solo)
          Moves horizontally across the container
      */}
      <div 
        className="absolute top-0 left-0"
        style={{ 
          willChange: 'transform, opacity',
          transform: `translateX(${translateX}px)`, // Moves left <-> right
          opacity: opacity
        }}
      >
          {/* Rotating Gear */}
          <div 
            className="w-64 h-64 flex items-center justify-center relative" // Increased size
          >
             {/* Spinning Part */}
             <div 
                className="w-full h-full absolute inset-0"
                style={{ 
                    willChange: 'transform',
                    transform: `rotate(${rotateDeg}deg)`
                }}
             >
                <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className={`w-full h-full ${gearColorClass}`}
                >
                    <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
                </svg>
             </div>

             {/* Static Icon in Center */}
             <div className="relative z-10 p-4 bg-black/80 rounded-full border border-white/10 backdrop-blur-md">
                <div className={`text-${color}-500`}>
                    {/* Render icon wrapper div to control size/color via CSS cascading instead of cloning */}
                    <div className={`w-12 h-12 text-${color}-500 [&>svg]:w-full [&>svg]:h-full`}>
                        {icon}
                    </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

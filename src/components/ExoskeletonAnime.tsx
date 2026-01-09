import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

export function ExoskeletonAnime() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Helper to set dash offset for line drawing effect
    const setDashoffset = (el: SVGPathElement | SVGLineElement | SVGCircleElement) => {
      const pathLength = el.getTotalLength();
      el.setAttribute('stroke-dasharray', String(pathLength));
      return pathLength;
    };

    // 1. Hand Reveal (Natural)
    animate('.hand-base', {
      opacity: [0, 1],
      easing: 'easeInOutQuad',
      duration: 2500,
    });

    // 2. Invisible Force Lines (Energy Flows)
    const forceLines = document.querySelectorAll('.force-line');
    forceLines.forEach(line => {
      setDashoffset(line as SVGPathElement);
      line.setAttribute('stroke-dashoffset', String((line as SVGPathElement).getTotalLength()));
    });

    // @ts-ignore
    animate('.force-line', {
      strokeDashoffset: [
        // @ts-ignore
        (el: any) => setDashoffset(el),
        0
      ],
      opacity: [0, 0.6],
      easing: 'easeInOutSine',
      duration: 3000,
      delay: (_el: any, i: number) => 1000 + (i * 200),
      direction: 'alternate',
      loop: true
    });

    // 3. Tension Points (Knuckles/Joints)
    // @ts-ignore
    animate('.tension-point', {
      r: [2, 4],
      opacity: [0.3, 0.8],
      easing: 'easeInOutQuad',
      duration: 1500,
      delay: (_el: any, i: number) => 1500 + (i * 150),
      direction: 'alternate',
      loop: true
    });

    // 4. Minimal HUD Calibration
    const hudLines = document.querySelectorAll<SVGPathElement | SVGLineElement | SVGCircleElement>('.hud-line');
    hudLines.forEach(line => {
      setDashoffset(line);
      line.setAttribute('stroke-dashoffset', String(line.getTotalLength()));
    });

    // @ts-ignore
    animate('.hud-line', {
      strokeDashoffset: [
        // @ts-ignore
        (el: any) => setDashoffset(el),
        0
      ],
      easing: 'easeOutExpo',
      duration: 2000,
      delay: 500,
    });

    // 5. Data Ticks Reveal
    // @ts-ignore
    animate('.hud-tick', {
      opacity: [0, 1],
      translateY: [5, 0],
      easing: 'easeOutQuad',
      delay: (_el: any, i: number) => 2000 + (i * 50),
      duration: 600
    });
    
    // 6. Subtle Hand Float
    // @ts-ignore
    animate('.hand-group', {
      translateY: [-5, 5],
      easing: 'easeInOutSine',
      duration: 6000,
      direction: 'alternate',
      loop: true
    });

    // 7. Yellow Energy Lines (Charging)
    const energyLines = document.querySelectorAll('.energy-line');
    energyLines.forEach(line => {
      setDashoffset(line as SVGPathElement);
      line.setAttribute('stroke-dashoffset', String((line as SVGPathElement).getTotalLength()));
    });

    // @ts-ignore
    animate('.energy-line', {
      strokeDashoffset: [
        // @ts-ignore
        (el: any) => setDashoffset(el),
        0
      ],
      opacity: [0, 1],
      easing: 'easeOutQuad',
      duration: 1000,
      delay: (_el: any, i: number) => 3000 + (i * 100),
      loop: true,
      direction: 'normal',
    });

  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Subtle Background Radial */}

      <svg 
        viewBox="0 0 500 600" 
        className="w-full h-full scale-125 origin-center"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="force-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0" />
            <stop offset="50%" stopColor="#b91c1c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="energy-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
        </defs>

        <g className="hand-group" transform="scale(-1, 1) translate(-500, 0)">
            {/* 1. Realistic Hand Outline (Red) */}
            <g className="hand-base opacity-0">
                <path 
                    d="M180 600 L 180 450 
                       C 170 420, 160 380, 140 360 
                       L 110 320
                       C 105 315, 110 300, 120 300 
                       L 150 310
                       L 195 365
                       L 200 350 
                       L 208 160 
                       C 225 125, 233 150, 235 160 
                       C 225 300, 225 300, 245 300
                       L 255 170
                       C 257 130, 278 120, 280 150 
                       C 270 300, 270 300, 287 300
                       L 300 190 
                       C 305 145, 323 160, 325 170 
                       C 320 300, 305 300, 327 300
                       L 340 230 
                       C 355 200, 363 220, 365 230 
                       L 350 340 
                       C 350 380, 320 450, 320 450 
                       L 320 600" 
                    fill="#050505" 
                    stroke="#ef4444" 
                    strokeWidth="3" 
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </g>

            {/* 3. Invisible Force Lines (Overlay) */}
            <g className="force-overlay">
                {/* Tendon Lines (Red Energy) */}
                <path className="force-line" d="M250 580 L 250 450 L 265 300 L 265 150" stroke="url(#force-grad)" strokeWidth="4" fill="none" />
                <path className="force-line" d="M220 580 L 220 450 L 220 300 L 222 170" stroke="url(#force-grad)" strokeWidth="4" fill="none" opacity="0.8" />
                <path className="force-line" d="M280 580 L 280 450 L 300 310 L 302 180" stroke="url(#force-grad)" strokeWidth="4" fill="none" opacity="0.8" />
                <path className="force-line" d="M300 580 L 310 450 L 330 340 L 340 230" stroke="url(#force-grad)" strokeWidth="4" fill="none" opacity="0.6" />
                <path className="force-line" d="M200 580 L 190 450 L 180 380 L 125 325" stroke="url(#force-grad)" strokeWidth="4" fill="none" />

                {/* Knuckle Tension Points */}
                <circle className="tension-point" cx="265" cy="300" r="3" fill="#ef4444" />
                <circle className="tension-point" cx="220" cy="300" r="3" fill="#ef4444" />
                <circle className="tension-point" cx="300" cy="310" r="3" fill="#ef4444" />
                <circle className="tension-point" cx="330" cy="340" r="3" fill="#ef4444" />
                <circle className="tension-point" cx="180" cy="380" r="3" fill="#ef4444" />
            </g>
        </g>

        {/* 3. Minimal HUD (Calibration) */}
        <g className="hud-layer">
            {/* Center Focus Ring */}
            <circle cx="250" cy="350" r="220" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 10" opacity="0.2" className="hud-line" />
            
            {/* Vertical Axis Line */}
            <line x1="250" y1="100" x2="250" y2="600" stroke="#ef4444" strokeWidth="0.5" opacity="0.1" className="hud-line" />

        </g>
      </svg>
    </div>
  );
}

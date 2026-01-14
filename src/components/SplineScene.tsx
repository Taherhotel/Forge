import React, { useEffect, useRef, useState } from 'react';
import { Application } from '@splinetool/runtime';

interface SplineSceneProps {
  url: string;
  className?: string;
}

export const SplineScene: React.FC<SplineSceneProps> = ({ url, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<Application | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && canvasRef.current && !appRef.current) {
      const app = new Application(canvasRef.current);
      appRef.current = app;
      app.load(url);
    }
    
    return () => {
      if (appRef.current) {
        appRef.current.dispose();
        appRef.current = null;
      }
    };
  }, [isVisible, url]);

  return (
    <div ref={containerRef} className={`w-full h-full flex items-center justify-center ${className}`}>
      {isVisible ? (
        <canvas ref={canvasRef} className="w-full h-full" />
      ) : (
        <div className="w-full h-full animate-pulse bg-zinc-900/50 rounded-xl" />
      )}
    </div>
  );
};

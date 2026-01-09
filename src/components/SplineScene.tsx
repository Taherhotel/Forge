import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';

interface SplineSceneProps {
  url: string;
  className?: string;
}

export const SplineScene: React.FC<SplineSceneProps> = ({ url, className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<Application | null>(null);

  useEffect(() => {
    if (canvasRef.current && !appRef.current) {
      const app = new Application(canvasRef.current);
      appRef.current = app;
      app.load(url);
    }
  }, [url]);

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

import React, { useEffect, useRef } from 'react';

export const FlameBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = canvas!.height + Math.random() * 100; // Start below screen
        this.vx = (Math.random() - 0.5) * 2; // Increased horizontal spread
        this.vy = -(Math.random() * 2 + 1); // Faster upward movement
        this.life = 0;
        this.maxLife = Math.random() * 100 + 50; // Ensure life is long enough to reach top
        this.size = Math.random() * 1 + 1; // Larger particles
        
        // Brighter Flame Colors
        const colors = [
          'rgba(255, 68, 68, 0.8)', // Bright Red
          'rgba(255, 140, 0, 0.8)', // Bright Orange
          'rgba(255, 215, 0, 0.6)'  // Bright Gold
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        this.size *= 1; // Shrink over time
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const initParticles = () => {
      // Create initial batch
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles periodically to maintain density
      if (particles.length < 300) { // Increased density
        particles.push(new Particle());
        particles.push(new Particle()); // Spawn faster
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw(ctx);

        // Remove dead particles
        if (p.life > p.maxLife || p.size < 0.1) {
          particles.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none mix-blend-screen"
      style={{ zIndex: 15 }} 
    />
  );
};

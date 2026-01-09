import React from 'react';
import { Zap, Activity, Shield, Menu, X } from 'lucide-react';
// @ts-ignore
import { Timeline, stagger } from 'animejs';
import logo from './assets/logo.png';
import roboHand from './assets/Robo hand.jpg';
import robo2 from './assets/robo 2.jpg';
import { FlameBackground } from './components/FlameBackground';
import { SplineScene } from './components/SplineScene';

const TextWrapper = ({ text, className = "" }: { text: string; className?: string }) => (
  <span className={`inline-block ${className}`}>
    {text.split('').map((char, index) => (
      <span 
        key={index} 
        className="letter inline-block bg-linear-to-r from-red-700 to-orange-500 bg-clip-text text-transparent" 
        style={{ opacity: 0, transform: 'translateY(100px)' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))}
  </span>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [scrollY, setScrollY] = React.useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  React.useEffect(() => {
    // Initial setup
    const tl = new Timeline({
      duration: 1000,
      defaults: {
        ease: 'outExpo'
      }
    });

    // @ts-ignore
    tl.add('.welcome-text .letter', {
      translateY: [100, 0],
      opacity: [0, 1],
      delay: stagger(50, { start: 500 }),
    })
    // @ts-ignore
    .add('.welcome-text .letter', {
      translateY: [0, -100],
      opacity: [1, 0],
      delay: stagger(50),
      ease: 'inExpo',
    }, '+=1500')
    // @ts-ignore
    .add('.headline-text .letter', {
      translateY: [100, 0],
      opacity: [0, 1],
      delay: stagger(30),
    }, '-=500')
    // @ts-ignore
    .add('.subtitle', {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 1000,
      ease: 'outQuad'
    }, '-=800');

  }, []);

  return (
    <div 
      className="h-screen w-full overflow-y-auto bg-black text-white font-sans selection:bg-red-600 selection:text-black scroll-smooth"
      onScroll={handleScroll}
    >
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src={logo} alt="FORGE" className="h-14 w-auto" />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#features" className="hover:text-red-500 transition-colors px-3 py-2 rounded-md text-sm font-medium">Technology</a>
                <a href="#applications" className="hover:text-red-500 transition-colors px-3 py-2 rounded-md text-sm font-medium">Applications</a>
                <a href="#about" className="hover:text-red-500 transition-colors px-3 py-2 rounded-md text-sm font-medium">About</a>
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
                  Pre-order
                </button>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-b border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#features" className="block hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium">Technology</a>
              <a href="#applications" className="block hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium">Applications</a>
              <a href="#about" className="block hover:bg-white/5 px-3 py-2 rounded-md text-base font-medium">About</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-zinc-950">
        
        {/* Flame Background Effect */}
        <FlameBackground />

        {/* Corner Images */}
        {/* Top Right Hand */}
        <div 
          className="absolute top-0 right-0 w-3/4 md:w-1/2  z-10 pointer-events-none"
          style={{ 
            willChange: 'transform',
            transform: `translate(${scrollY * 1.2}px, -${scrollY * 0.8}px)` 
          }}
        >
          <div className="w-full h-full animate-slide-in-right opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <img 
              src={robo2} 
              alt="Exoskeleton Detail" 
              className="w-full h-full object-cover mask-[linear-gradient(to_bottom_left,black_50%,transparent_100%)]" 
            />
          </div>
        </div>

        {/* Bottom Left Hand */}
        <div 
          className="absolute bottom-0 left-0 w-3/4 md:w-1/2 z-10 pointer-events-none"
          style={{ 
            willChange: 'transform',
            transform: `translate(-${scrollY * 1.2}px, ${scrollY * 0.8}px)`
          }}
        >
           <div className="w-full h-full animate-slide-in-left opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <img 
              src={roboHand} 
              alt="Robotic Hand" 
              className="w-full h-full object-cover mask-[linear-gradient(to_top_right,black_50%,transparent_100%)]" 
            />
           </div>
        </div>

        {/* Content Overlay */}
        <div 
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center h-[200px] justify-center transition-opacity duration-300 ease-out"
          style={{ opacity: Math.max(0, 1 - scrollY / 300) }} // Fades out as you scroll
        >
            <div className="relative w-full">
                {/* Welcome Text */}
                <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight pb-4 leading-normal">
                    <TextWrapper text="Welcome to Forge" className="welcome-text" />
                </h1>

                {/* Main Headline */}
                <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-2xl sm:text-5xl md:text-7xl font-extrabold tracking-tight whitespace-nowrap pb-4 leading-normal">
                    <TextWrapper text="Human Strength. Engineered." className="headline-text" />
                </h1>
            </div>
        </div>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent z-10"></div>
      </div>

      {/* Features Grid */}
      <div id="features" className="h-screen w-full flex flex-col justify-start pt-20 items-center bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Forge's Vision</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Empowering humanity through advanced exoskeleton technology. We bridge the gap between limitation and potential.
            </p>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-45">
            <div className="w-full h-[600px]">
              <SplineScene url="https://prod.spline.design/sB7QOTutqSNr-iap/scene.splinecode" />
            </div>
            <div className="w-full h-[600px]">
              <SplineScene url="https://prod.spline.design/TMd6G0JZbaP3y-f8/scene.splinecode" />
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="py-24 bg-zinc-900 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Technical Superiority</h2>
                <div className="h-1 w-20 bg-red-600 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <div className="flex items-start">
                        <div className="shrink-0 h-14 w-14 rounded-xl bg-zinc-800 flex items-center justify-center border border-white/10">
                            <span className="text-red-500 font-bold text-xl">01</span>
                        </div>
                        <div className="ml-6">
                            <h3 className="text-xl font-bold text-white mb-2">Adaptive Hydraulics</h3>
                            <p className="text-gray-400">
                                Proprietary fluid dynamics system that adjusts pressure 1000 times per second for smooth, organic movement.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="shrink-0 h-14 w-14 rounded-xl bg-zinc-800 flex items-center justify-center border border-white/10">
                            <span className="text-orange-500 font-bold text-xl">02</span>
                        </div>
                        <div className="ml-6">
                            <h3 className="text-xl font-bold text-white mb-2">Neural Interface</h3>
                            <p className="text-gray-400">
                                Non-invasive EEG sensors translate thought into action with &lt;10ms latency.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="shrink-0 h-14 w-14 rounded-xl bg-zinc-800 flex items-center justify-center border border-white/10">
                            <span className="text-amber-500 font-bold text-xl">03</span>
                        </div>
                        <div className="ml-6">
                            <h3 className="text-xl font-bold text-white mb-2">Titanium Alloy Core</h3>
                            <p className="text-gray-400">
                                Aerospace-grade construction delivering maximum durability at minimum weight.
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/50 p-6 rounded-xl border border-white/10 text-center">
                        <div className="text-4xl font-bold text-white mb-1">500<span className="text-red-500 text-2xl">%</span></div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Strength Boost</div>
                    </div>
                    <div className="bg-black/50 p-6 rounded-xl border border-white/10 text-center">
                        <div className="text-4xl font-bold text-white mb-1">12<span className="text-orange-500 text-2xl">hr</span></div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Battery Life</div>
                    </div>
                    <div className="bg-black/50 p-6 rounded-xl border border-white/10 text-center">
                        <div className="text-4xl font-bold text-white mb-1">8<span className="text-amber-500 text-2xl">kg</span></div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Total Weight</div>
                    </div>
                    <div className="bg-black/50 p-6 rounded-xl border border-white/10 text-center">
                        <div className="text-4xl font-bold text-white mb-1">10<span className="text-red-500 text-2xl">ms</span></div>
                        <div className="text-sm text-gray-500 uppercase tracking-wider">Latency</div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Applications Section */}
      <div id="applications" className="py-24 bg-black relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Built for Every Frontier</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">
                      From heavy industry to delicate surgical procedures, Forge adapts to the challenge.
                  </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                      <div className="absolute inset-0 bg-zinc-800 group-hover:bg-red-900/20 transition-colors"></div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                          <Shield className="w-12 h-12 text-gray-500 group-hover:text-red-500 transition-colors mb-4" />
                          <h3 className="text-2xl font-bold text-white">Defense</h3>
                      </div>
                  </div>
                  <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                       <div className="absolute inset-0 bg-zinc-800 group-hover:bg-orange-900/20 transition-colors"></div>
                       <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                          <Zap className="w-12 h-12 text-gray-500 group-hover:text-orange-500 transition-colors mb-4" />
                          <h3 className="text-2xl font-bold text-white">Industrial</h3>
                       </div>
                  </div>
                  <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer">
                       <div className="absolute inset-0 bg-zinc-800 group-hover:bg-amber-900/20 transition-colors"></div>
                       <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                          <Activity className="w-12 h-12 text-gray-500 group-hover:text-amber-500 transition-colors mb-4" />
                          <h3 className="text-2xl font-bold text-white">Medical</h3>
                       </div>
                  </div>
              </div>
          </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-950 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold bg-linear-to-r from-red-500 to-orange-600 bg-clip-text text-transparent">
              FORGE
            </span>
            <p className="text-gray-500 text-sm mt-2">© 2025 Forge Inc. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

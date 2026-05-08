import React from 'react';
import './Bottle3D.css';

export default function Bottle3D({ imageUrl, modelUrl, className = '' }) {
  // If we have a true 3D model file, use <model-viewer>
  if (modelUrl) {
    return (
      <div className={`bottle-model-container ${className}`}>
        <model-viewer 
          src={modelUrl}
          alt="3D model of Jay Agritech Product"
          auto-rotate 
          camera-controls 
          shadow-intensity="1" 
          exposure="1.2"
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-orbit="0deg 75deg 105%"
          style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        >
          <div slot="poster" className="model-poster">
             <img src={imageUrl} alt="Product" />
             <div className="loader-dots"><span>.</span><span>.</span><span>.</span></div>
          </div>
        </model-viewer>
      </div>
    );
  }

  // Fallback to high-fidelity CSS 3D (the interactive tilt version)
  // This ensures the site still looks premium even if the .glb isn't ready
  return <CSSBottle3D imageUrl={imageUrl} className={className} />;
}

// Internal component for the CSS-based 3D tilt interaction
function CSSBottle3D({ imageUrl, className }) {
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [glare, setGlare] = React.useState({ x: 50, y: 50, opacity: 0 });
  const containerRef = React.useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    setRotation({ 
      x: ((centerY - y) / centerY) * 15, 
      y: ((x - centerX) / centerX) * 15 
    });
    setGlare({ 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100, 
      opacity: 0.6 
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      className={`bottle-3d-scene ${className}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="bottle-3d-wrapper"
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        <div className="bottle-main-image">
           <img src={imageUrl} alt="Product Bottle" />
           <div 
             className="bottle-glare"
             style={{
               background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.4) 0%, transparent 60%)`,
               opacity: glare.opacity
             }}
           />
        </div>
        <div 
          className="bottle-shadow"
          style={{
            transform: `translate(-50%, 20%) rotateX(90deg) translateX(${rotation.y * -1}px) translateY(${rotation.x * -1}px)`,
            opacity: 0.2 + (Math.abs(rotation.x) + Math.abs(rotation.y)) / 100
          }}
        />
      </div>
    </div>
  );
}

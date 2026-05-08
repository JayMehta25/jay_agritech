import { useState, useEffect, useRef } from 'react';
import splashVideo from '../../data/c_e_e_d_mp_.mp4';
import './VideoSplashScreen.css';

export default function VideoSplashScreen({ onComplete }) {
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef(null);

  const handleEnded = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 1500); // Duration of fade-out
  };

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div className={`splash-container ${isFading ? 'fade-out' : ''}`}>
      <video
        ref={videoRef}
        src={splashVideo}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        className="splash-video"
      />
      <div className="splash-overlay">
      </div>
      <button className="skip-btn" onClick={handleSkip}>
        Skip Intro
      </button>
    </div>
  );
}

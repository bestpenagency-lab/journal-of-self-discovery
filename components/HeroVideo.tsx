"use client";

import { useRef, useState } from "react";
import { IconVolume } from "./Icons";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const enableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    setMuted(false);
    void video.play().catch(() => {});
  };

  return (
    <div className="hero-photo-frame">
      <video
        ref={videoRef}
        className="hero-video"
        autoPlay
        loop
        muted={muted}
        playsInline
        controls
        poster="/lucia-hero.jpg"
        onVolumeChange={() => setMuted(videoRef.current?.muted ?? true)}
      >
        <source src="/ad-1.mp4" type="video/mp4" />
        Your browser does not support video playback.
      </video>

      {muted && (
        <button type="button" className="sound-toggle" onClick={enableSound}>
          <IconVolume size={18} color="#fff" strokeWidth={1.8} />
          Turn on sound
        </button>
      )}
    </div>
  );
}

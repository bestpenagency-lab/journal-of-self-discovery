"use client";

import { useEffect, useRef, useState } from "react";
import { IconVolume } from "./Icons";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [src, setSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      queueMicrotask(() => setSrc("/ad-1.mp4"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSrc("/ad-1.mp4");
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!src) return;
    void videoRef.current?.play().catch(() => {});
  }, [src]);

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
        src={src}
        autoPlay
        loop
        muted={muted}
        playsInline
        controls
        preload="none"
        poster="/lucia-hero.jpg"
        onVolumeChange={() => setMuted(videoRef.current?.muted ?? true)}
      >
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

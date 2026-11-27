"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";

const motionPreference = "(prefers-reduced-motion: reduce)";
const poster = "/images/yms-hero-poster.webp";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(motionPreference);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function HomeHeroVideo() {
  const reduceMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(motionPreference).matches,
    () => true,
  );

  return <>
    <Image className="home-hero-poster" src={poster} alt="" fill unoptimized preload />
    {!reduceMotion && <HeroPlayback />}
  </>;
}

function HeroPlayback() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  function togglePlayback() {
    const player = video.current;
    if (!player) return;

    if (player.paused) {
      void player.play().catch(() => setPlaying(false));
    } else {
      player.pause();
    }
  }

  if (failed) return null;

  return <>
    <video
      ref={video}
      className="home-hero-video"
      src="/videos/yms-homepage.mp4"
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      onPlaying={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onError={() => setFailed(true)}
    />
    <button
      type="button"
      className="home-hero-playback"
      aria-label={playing ? "Pause background video" : "Play background video"}
      onClick={togglePlayback}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={playing ? "M7 5h3v14H7zm7 0h3v14h-3z" : "M8 5v14l11-7z"} />
      </svg>
    </button>
  </>;
}

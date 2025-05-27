'use client';
import { useEffect, useRef } from 'react';

interface IProps {
  src: string;
  width: string;
  height: string | number | undefined;
}

const ShortsMain = ({ src, width, height }: IProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch((e) => {
            console.error('Autoplay failed:', e);
          });
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.9,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      width={width}
      height={height}
      preload="auto"
      muted={true}
      controls
    />
  );
};

export default ShortsMain;

import React, { useRef, useState } from "react";

interface IProps {
  src: string;
  poster: string;
  width: string;
  height: string | number | undefined;
}

const VideoMain = ({ src, poster, width, height }: IProps) => {
  const [key, setKey] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    videoRef.current!.currentTime = 0;

    setKey(prev => prev + 1);
  };

  return (
    <video preload="none"
           key={key}
           onMouseEnter={handleMouseEnter}
           onMouseLeave={handleMouseLeave}
           ref={videoRef}
           width={width}
           height={height}
           src={src}
           muted={true}
           poster={poster}>
    </video>
  );
};

export default VideoMain;
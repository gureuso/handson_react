import React, { useRef, useState } from "react";

const VideoMain = ({ src, poster, width, height }) => {
  const [key, setKey] = useState(0);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    videoRef.current?.pause();
    videoRef.current.currentTime = 0;
    // 고유 컴포넌트 내에서만 key 업데이트
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
// components/VideoBackground.tsx
import React, { ReactNode } from "react";

interface VideoBackgroundProps {
  videoUrl: string;
  children: ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl,
  children,
}) => {
  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center  mx-auto px-4">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover "
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;

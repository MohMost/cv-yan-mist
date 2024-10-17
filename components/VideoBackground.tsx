"use client";
import React, { useEffect, useState, ReactNode } from "react";
import { useTheme } from "next-themes";

interface VideoBackgroundProps {
  children: ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ children }) => {
  const { theme } = useTheme();
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // Update the video source based on the current theme
    setVideoUrl(theme === "dark" ? "/Dark.mp4" : "/light.mp4");
  }, [theme]); // Re-run this effect when the theme changes

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center mx-auto px-4">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        key={videoUrl} // Key forces re-render when videoUrl changes
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

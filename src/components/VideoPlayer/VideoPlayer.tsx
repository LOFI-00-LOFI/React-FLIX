import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  isMuted?: boolean;
  toggleMute?: () => void;
  pip?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, isMuted, toggleMute, pip }) => {
  const location = useLocation();
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mute, setMute] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);

  const handleContextMenu = (e: React.MouseEvent) => e.preventDefault();

  

  useEffect(() => {
    setVolume(mute ? 0 : 0.8);
  }, [mute]);

 
  return (
    <div
      ref={containerRef}
      className={` ${pip ? 'scale-110 player-wrapper' : location.pathname.startsWith('/watch') ? 'h-[100vh]' : 'player-wrapper scale-150'}`}
      onContextMenu={handleContextMenu}
    >
      {/* React Player */}
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/embed/${videoId}`}
        playing={playing}
        controls={location.pathname.startsWith('/watch') ? true : false}
        muted={location.pathname.startsWith('/watch') ? mute : isMuted}
        volume={volume}
        width="100%"
        height="100%"
        className="react-player"
        loop={true}
        config={{
      
          youtube: {
            playerVars: {
              autoplay: 1,
              modestbranding: 1,
              rel: 0,
              disablekb: 1

            },
            embedOptions:{}
          },
        }}
      />

      
    </div>
  );
};

export default VideoPlayer;

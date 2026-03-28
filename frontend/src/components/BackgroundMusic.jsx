import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay when component mounts
    const playAudio = async () => {
      try {
        audio.volume = 0.3; // Start at 30% volume
        await audio.play();
        setIsPlaying(true);
        
        // Set timeout to fade out and stop after 30 seconds
        setTimeout(() => {
          fadeOutAndStop();
        }, 27000); // Start fade at 27 seconds (3 second fade)
        
        // Hide controls after 5 seconds if playing
        setTimeout(() => {
          setShowControls(false);
        }, 5000);
      } catch (error) {
        console.log('Autoplay prevented by browser:', error);
        // If autoplay fails, show controls permanently
        setShowControls(true);
      }
    };

    playAudio();

    return () => {
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
      }
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const fadeOutAndStop = () => {
    const audio = audioRef.current;
    if (!audio) return;

    let volume = audio.volume;
    fadeIntervalRef.current = setInterval(() => {
      if (volume > 0.05) {
        volume -= 0.05;
        audio.volume = Math.max(0, volume);
      } else {
        clearInterval(fadeIntervalRef.current);
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setShowControls(false);
      }
    }, 100); // Fade over 3 seconds (30 steps * 100ms)
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = 0.3;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
    
    // Show controls again when user interacts
    setShowControls(true);
    setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        loop={false}
        preload="auto"
      >
        {/* Using SoundHelix as placeholder until real audio is uploaded */}
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      {/* Mute/Unmute Control */}
      <AnimatePresence>
        {(showControls || isMuted) && isPlaying && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50"
          >
            <motion.button
              onClick={toggleMute}
              className="group relative bg-black/60 backdrop-blur-md border-2 border-[#d4af37] hover:border-[#ffd700] rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isMuted ? "Unmute background music" : "Mute background music"}
            >
              {/* Pulsing ring animation */}
              {!isMuted && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#d4af37]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}

              {/* Icon */}
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-gray-400 relative z-10" />
              ) : (
                <Volume2 className="h-5 w-5 text-[#d4af37] relative z-10" />
              )}

              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-black/80 text-[#d4af37] text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {isMuted ? 'Unmute Idakka music' : 'Mute Idakka music'}
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
              </div>

              {/* Sound wave animation */}
              {!isMuted && (
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-0.5 bg-[#d4af37] rounded-full"
                      animate={{
                        height: [4, 12, 4],
                      }}
                      transition={{
                        duration: 0.6,
                        delay: i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.button>

            {/* Intro text - shown only first 3 seconds */}
            <AnimatePresence>
              {showControls && !isMuted && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-black/80 backdrop-blur-sm border border-[#d4af37]/30 rounded-lg text-right"
                >
                  <p className="text-[#d4af37] text-sm font-medium">
                    Sopana Sangeetham
                  </p>
                  <p className="text-gray-400 text-xs">
                    Traditional temple music
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackgroundMusic;

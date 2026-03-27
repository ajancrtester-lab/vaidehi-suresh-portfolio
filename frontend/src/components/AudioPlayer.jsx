import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { fetchAudioTracks } from '../services/api';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

const AudioPlayer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const audioRef = useRef(null);

  const [audioTracks, setAudioTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);

  // Fetch audio tracks from API
  useEffect(() => {
    const loadAudioTracks = async () => {
      try {
        setLoading(true);
        const tracks = await fetchAudioTracks();
        setAudioTracks(tracks);
      } catch (error) {
        console.error('Failed to load audio tracks:', error);
        setAudioTracks([]);
      } finally {
        setLoading(false);
      }
    };

    loadAudioTracks();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentTrack < audioTracks.length - 1) {
        setCurrentTrack(currentTrack + 1);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentTrack]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    if (currentTrack > 0) {
      setCurrentTrack(currentTrack - 1);
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentTrack < audioTracks.length - 1) {
      setCurrentTrack(currentTrack + 1);
      setIsPlaying(true);
    }
  };

  const handleSeek = (value) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Show loading state
  if (loading) {
    return (
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a0a]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-[#d4af37] text-xl">Loading audio tracks...</div>
        </div>
      </section>
    );
  }

  // Show empty state if no tracks
  if (audioTracks.length === 0) {
    return (
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a0a]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-400">No audio tracks available</div>
        </div>
      </section>
    );
  }

  const track = audioTracks[currentTrack];

  return (
    <section
      id="audio-section"
      ref={ref}
      className="relative py-32 px-6 bg-gradient-to-b from-[#0a0a0a] to-[#1a0a0a] overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/4 right-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100px' } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </motion.div>

          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-[#d4af37] mb-6">
            Sacred Melodies
          </h2>

          <p className="text-gray-400 text-sm tracking-[0.3em] uppercase">
            Experience the Divine Through Music
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Audio Player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-to-br from-[#800020]/20 via-[#d4af37]/10 to-transparent blur-2xl" />
            <div className="relative border-2 border-[#d4af37]/30 bg-black/50 backdrop-blur-sm p-8">
              {/* Current Track Info */}
              <div className="mb-8">
                <h3 className="font-cormorant text-3xl font-bold text-[#d4af37] mb-2">
                  {track.title}
                </h3>
                <p className="text-gray-400 mb-1">Raga: {track.raga}</p>
                <p className="text-gray-500 text-sm">{track.temple}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-6">
                <Button
                  onClick={handlePrevious}
                  disabled={currentTrack === 0}
                  variant="ghost"
                  size="icon"
                  className="text-[#d4af37] hover:text-white hover:bg-[#800020]/20 disabled:opacity-30"
                >
                  <SkipBack className="h-5 w-5" />
                </Button>

                <Button
                  onClick={togglePlayPause}
                  className="bg-gradient-to-r from-[#800020] to-[#9b2335] hover:from-[#9b2335] hover:to-[#800020] text-white w-14 h-14 rounded-full"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={currentTrack === audioTracks.length - 1}
                  variant="ghost"
                  size="icon"
                  className="text-[#d4af37] hover:text-white hover:bg-[#800020]/20 disabled:opacity-30"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-[#d4af37]" />
                <Slider
                  value={[volume]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setVolume(value[0])}
                  className="flex-1"
                />
              </div>

              {/* Hidden Audio Element */}
              <audio ref={audioRef} src={track.audioUrl} preload="metadata" />
            </div>
          </motion.div>

          {/* Playlist */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2"
          >
            {audioTracks.map((track, index) => (
              <motion.div
                key={track.id}
                onClick={() => {
                  setCurrentTrack(index);
                  setIsPlaying(true);
                }}
                whileHover={{ x: 5 }}
                className={`border p-4 cursor-pointer transition-all duration-300 ${
                  currentTrack === index
                    ? 'border-[#d4af37] bg-[#d4af37]/10'
                    : 'border-[#d4af37]/20 hover:border-[#d4af37]/50 bg-black/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex items-center justify-center w-10 h-10 border ${
                      currentTrack === index
                        ? 'border-[#d4af37] text-[#d4af37]'
                        : 'border-[#d4af37]/30 text-gray-500'
                    }`}
                  >
                    {currentTrack === index && isPlaying ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <Pause className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h4
                      className={`font-cormorant text-lg font-semibold mb-1 ${
                        currentTrack === index ? 'text-[#d4af37]' : 'text-gray-300'
                      }`}
                    >
                      {track.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {track.raga} • {track.temple}
                    </p>
                  </div>

                  <div className="text-sm text-gray-500">{track.duration}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AudioPlayer;
'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  beatTitle: string;
  duration?: number;
}

export default function AudioPlayer({ audioUrl, beatTitle, duration = 180 }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setVolume(vol);
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    setPlaybackRate(rate);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 space-y-4">
      {/* Audio Element */}
      <audio ref={audioRef} src={audioUrl} crossOrigin="anonymous" />

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-300">{beatTitle}</h3>

      {/* Play Button & Progress */}
      <div className="space-y-3">
        {/* Play Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className="w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center text-xl transition"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Time Display */}
          <div className="text-sm text-gray-400 min-w-fit">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />

        {/* Waveform Visualization (placeholder) */}
        <div className="h-16 bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-500 text-sm">
          🎵 Waveform visualization
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between pt-2">
        {/* Volume */}
        <div className="flex items-center gap-2">
          <span className="text-sm">🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-purple-600"
          />
        </div>

        {/* Playback Speed */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Speed:</span>
          <div className="flex gap-1">
            {[0.5, 0.75, 1, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                onClick={() => handlePlaybackRateChange(rate)}
                className={`px-2 py-1 text-xs rounded transition ${
                  playbackRate === rate
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>

        {/* Download Button */}
        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded text-sm transition flex items-center gap-2">
          📥 Download Preview
        </button>
      </div>
    </div>
  );
}

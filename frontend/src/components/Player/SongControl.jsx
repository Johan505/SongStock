import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const SongControl = ({ audio }) => {
  const currentMusic = useSelector((state) => state.player.currentMusic);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!audio.current) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.current?.currentTime);
    };

    audio.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (audio.current) {
        audio.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [audio]);

  const formatTime = (time) => {
    if (time == null) return `0:00`;

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const duration = currentMusic.song ? currentMusic.song.duration : 0;
  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50 w-12 text-right">
        {formatTime(currentTime)}
      </span>
      <input
        type="range"
        value={currentTime}
        max={duration}
        min={0}
        onChange={(e) => {
          audio.current.currentTime = Number(e.target.value);
          setCurrentTime(Number(e.target.value));
        }}
        className="w-[400px]"
      />
      <span className="opacity-50 w-12">{formatTime(duration)}</span>
    </div>
  );
};

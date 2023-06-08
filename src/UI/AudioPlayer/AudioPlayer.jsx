import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AudioPlayer = ({
  currentTrack,
  onNextTrack,
  onPrevTrack,
  onClosePlayer,
}) => {

  const [audio, setAudio] = useState(new Audio(currentTrack.path));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");

  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(0);

  const timeArray = currentTrack.duration.split(":");
  const seconds = parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);

  // 1 UseEffect for seek slider
  useEffect(() => {
    const updateCurrentTime = () => {
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60);
      const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      setCurrentTime(formattedTime);
      if (formattedTime === currentTrack.duration) {
        onNextTrack();
        setCurrentTime("0:00");
      }
    };
    audio.addEventListener("timeupdate", updateCurrentTime);
    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
    };
  }, [audio]);

  // 2 UseEffect for updated track
  useEffect(() => {
    audio.pause();
    setIsPlaying(false);
    setCurrentTime("0:00");
    setAudio(new Audio(currentTrack.path));
  }, [currentTrack]);

  // 3 UseEffect for volume slider
  useEffect(() => {
    audio.volume = volume;
    if (volume === 0) setIsMuted(true);
    else setIsMuted(false);
  }, [volume]);

  const closePlayer = () => {
    audio.pause();
    onClosePlayer();
  };

  const scrubAudio = (event) => {
    const scrubTime = (event.target.value / 100) * seconds;
    audio.currentTime = scrubTime;
  };

  const toggleMute = () => {
    if (!isMuted) {
      setVolumeBeforeMute(volume);
      setVolume(0);
      setIsMuted(true);
    } else {
      setVolume(volumeBeforeMute);
      setIsMuted(false);
    }
  };

  const playAudio = () => {
    audio.play();
    setIsPlaying(true);
    audio.volume = volume;
  };

  const pauseAudio = () => {
    audio.pause();
    setIsPlaying(false);
  };

  return (
    <div className="audio__player">
      <div className="audio__body">
        <div className="audio__close" onClick={closePlayer}>
          <img src={"../../../files/img/icons/close.png"} alt="" />
        </div>
        <div className="audio__name">
          {currentTrack.title}{" "}
          <span className="audio__artist">{currentTrack.artist}</span>
        </div>
        <div className="audio__buttons">
          <img
            src={"../../../files/img/icons/previous_black.png"}
            onClick={onPrevTrack}
            alt=""
            className="audio__previous"
          />
          {isPlaying ? (
            <img
              src={"../../../files/img/icons/pause_black.png"}
              alt=""
              onClick={pauseAudio}
              className="audio__pause"
            />
          ) : (
            <img
              src={"../../../files/img/icons/play_black.png"}
              onClick={playAudio}
              alt=""
              className="audio__play"
            />
          )}

          <img
            src={"../../../files/img/icons/next_black.png"}
            onClick={onNextTrack}
            alt=""
            className="audio__next"
          />
        </div>
        <div className="seek__slider">
          <span className="current__time">{currentTime} </span>
          <input
            type="range"
            className="duration__range"
            min="0"
            step="1"
            max="100"
            value={(audio.currentTime / seconds) * 100}
            onChange={scrubAudio}
          />
          <span className="track__time"> {currentTrack.duration}</span>
        </div>
        <div className="volume__slider">
          {isMuted ? (
            <img
              src={"../../../files/img/icons/muted.png"}
              alt=""
              className="muted__icon"
              onClick={toggleMute}
            />
          ) : (
            <img
              src={"../../../files/img/icons/not_muted.png"}
              alt=""
              className="muted__icon"
              onClick={toggleMute}
            />
          )}
          <input
            type="range"
            className="volume__range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>
        <div className="back__playlists">
          <Link to={`/`} style={{textDecoration:'none'}}>
            <span className="btn__return" onClick={closePlayer}>
              Вернуться к плейлистам
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;

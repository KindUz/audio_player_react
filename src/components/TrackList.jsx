import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AudioPlayer from "../UI/AudioPlayer/AudioPlayer";

const TrackList = ({ playlists }) => {
  const params = useParams();
  const id = params.id - 1;

  const tracks = playlists[id].tracks;

  const [likes, setLikes] = useState(playlists[id].defaultLikes);
  const [isLike, setIsLike] = useState(playlists[id].defaultElect);


  const [currentIndex, setCurrentIndex] = useState(-1);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const setSongActive = (index) => {
    setCurrentTrack(tracks[index]);
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const handleTrackChange = (index) => {
    if (index === -1 || index === tracks[tracks.length - 1].id) return;
    else {
      setCurrentTrack(tracks[index]);
      setCurrentIndex(index);
    }
  };

  const setLikeActive = () => {
    setIsLike(true);
    setLikes(likes+1);
  }

  const setLikeUnActive = () => {
    setIsLike(false);
    setLikes(likes-1);
  }

  return (
    <div className="audio__tracks">
      <div className="tracks__list">

        <div className="tracks__info playlist">
          <span className="playlist__name">{playlists[id].name}</span>

          <div className="playlist__details">
          <div className="playlist__details-likes">
            {isLike ? (
              
                <img
                  className="playlist__like"
                  onClick={setLikeUnActive}
                  src={"../../../files/img/icons/like.png"}
                  alt=""
                />
                
              
            ) : (
              <img
                className="playlist__like"
                onClick={setLikeActive}
                src={"../../../files/img/icons/not_like_black.png"}
                alt=""
              />
            )}
            <span className="like__number">({likes})</span>
            </div>
            <span className="playlist__similar">Похожие треки</span>
          </div>

          <img className="poster__img" src={playlists[id].posterUrl} alt="" />
        </div>

        <div className="tracks">
          {tracks.map((track, index) => (
            <div key={track.id}>
              <div
                className={`track__info ${
                  currentIndex === index ? " active" : ""
                }`}
                onClick={() => setSongActive(index)}
              >
                <span className="track__id">{track.id}</span>
                <div className="track__body">
                  {track.title} <span>{track.artist}</span>
                </div>
                {track.censore && (
                  <div className="track__censore">
                    <span className="censore__word">E</span>
                  </div>
                )}
                <div className="track__duration">
                  <span className="duration__time">{track.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isPlaying && (
        <AudioPlayer
          currentTrack={currentTrack}
          isPlayingAudio={isPlaying}
          onClosePlayer={() => setIsPlaying(false)}
          onPrevTrack={() => handleTrackChange(currentIndex - 1)}
          onNextTrack={() => handleTrackChange(currentIndex + 1)}
        />
      )}
    </div>
  );
};

export default TrackList;

import React, {useState} from "react";
import { Link } from "react-router-dom";

const PlaylistList = ({ playlists }) => {

  const [updatedPlaylists, setUpdatedPlaylists] = useState(playlists);

  const handleLikeClick = (id) => {
    const updatedPlaylist = updatedPlaylists.find((playlist) => playlist.id === id);
    updatedPlaylist.defaultElect = !updatedPlaylist.defaultElect;
    updatedPlaylist.defaultLikes = updatedPlaylist.defaultElect ? updatedPlaylist.defaultLikes + 1 : updatedPlaylist.defaultLikes - 1;
    const updatedPlaylistsCopy = [...updatedPlaylists];
    const index = updatedPlaylistsCopy.findIndex((playlist) => playlist.id === id);
    updatedPlaylistsCopy.splice(index, 1, updatedPlaylist);
    setUpdatedPlaylists(updatedPlaylistsCopy);
  };

  return (
    <div className="playlist__list">
      {updatedPlaylists.map((playlist, index) => (
        <div key={playlist.id} className="playlist__item">
          <Link to={`/playlist/${playlist.id}`}>
            <div className="playlist__poster">
              <img src={playlist.posterUrl} className="poster__img" alt="" />
              <div className="poster__cover"/>
            </div>
          </Link>
          <div className="playlist__body">
            <Link style={{ textDecoration: "none" }} to={`/playlist/${playlist.id}`}>
              <p className="playlist__name">{playlist.name}</p>
            </Link>
            <div className="playlist__likes">
              <img
                src={
                  playlist.defaultElect
                    ? "../../../files/img/icons/like.png"
                    : "../../../files/img/icons/not_like_black.png"
                }
                alt=""
                className="playlist__like active"
                onClick={() => handleLikeClick(playlist.id)}
              />
              <div className="likes__body">
                <p className="like__count">Нравится</p>
                <span className="like__number">({playlist.defaultLikes})</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;

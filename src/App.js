import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import playlists from "./utils/playlists";
import Header from "./UI/Header/Header";
import Footer from "./UI/Footer/Footer";
import PlaylistList from "./components/PlaylistList";
import TrackList from "./components/TrackList";
import './style/style.css'

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Header/>
        <Routes>
          
          <Route
            exact
            path="/"
            element={<PlaylistList playlists={playlists} />}
          />
          <Route
            exact
            path="/playlist/:id"
            element={<TrackList playlists={playlists} />}
          />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;

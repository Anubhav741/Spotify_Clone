import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import MainContent from "./Components/MainContent";
import Player from "./Components/Player";
import Premium from "./Components/Premium";

const GENRE_QUERIES = {
  hits:   "top hits",
  latest: "latest songs",
  pop:    "pop music",
  indian: "bollywood",
  chill:  "chill",
  hiphop: "hip hop",
};

const toSong = (item) => {
  let img = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80";
  if (item.artwork && (item.artwork['480x480'] || item.artwork['150x150'])) {
    img = item.artwork['480x480'] || item.artwork['150x150'];
  }
  return {
    id: item.id,
    title: item.title,
    channel: item.user?.name || "Unknown Artist",
    thumbnail: img,
    streamUrl: `https://discoveryprovider.audius.co/v1/tracks/${item.id}/stream?app_name=spotify_clone`
  };
};

function App() {
  const [view, setView] = useState("home");
  const [genreSongs, setGenreSongs] = useState({
    hits: [], latest: [], pop: [], indian: [], chill: [], hiphop: []
  });
  const [fetchedCategories, setFetchedCategories] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [fetchErrors, setFetchErrors] = useState({});
  const [categoryLoading, setCategoryLoading] = useState({});
  const [currentSong, setCurrentSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [artists, setArtists] = useState([]);
  const [recents, setRecents] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [history, setHistory] = useState(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const fetchCategory = async (key) => {
    if (fetchedCategories[key]) return;
    
    setCategoryLoading(prev => ({ ...prev, [key]: true }));
    setFetchErrors(prev => ({ ...prev, [key]: "" }));
    try {
      const url = key === "hits" 
        ? "https://discoveryprovider.audius.co/v1/tracks/trending?app_name=spotify_clone"
        : `https://discoveryprovider.audius.co/v1/tracks/search?query=${encodeURIComponent(GENRE_QUERIES[key])}&app_name=spotify_clone`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.data && data.data.length > 0) {
        setGenreSongs(prev => ({ ...prev, [key]: data.data.map(toSong) }));
        setFetchedCategories(prev => ({ ...prev, [key]: true }));
      } else {
        setFetchErrors(prev => ({ ...prev, [key]: "No songs found" }));
      }
    } catch (e) {
      setFetchErrors(prev => ({ ...prev, [key]: "Failed to load songs" }));
    } finally {
      setCategoryLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  useEffect(() => {
    fetchCategory("hits");
    setTimeout(() => fetchCategory("latest"), 1000);
    setTimeout(() => fetchCategory("pop"), 2000);
    setTimeout(() => fetchCategory("indian"), 3000);
    setTimeout(() => fetchCategory("chill"), 4000);
    setTimeout(() => fetchCategory("hiphop"), 5000);
  }, []);

  const navigate = (newView) => {
    const next = history.slice(0, historyIndex + 1);
    next.push(newView);
    setHistory(next);
    setHistoryIndex(next.length - 1);
    setView(newView);
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    const q = query.trim();
    setSearchQuery(q);
    setSearchLoading(true);
    setSearchError("");
    setSearchResults([]);
    navigate("search_results");

    const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY || "e8bb3fe8539ea8ee8641953c0a38a676";

    try {
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(q)}&api_key=${LASTFM_API_KEY}&format=json`
      );
      const data = await res.json();
      
      let tracks = data?.results?.trackmatches?.track;
      if (tracks) {
        if (!Array.isArray(tracks)) {
          tracks = [tracks];
        }
        if (tracks.length > 0) {
          const finalSongs = tracks.slice(0, 15).map((t, idx) => ({
            id: `lastfm-${idx}-${t.name}`,
            title: t.name,
            channel: t.artist,
            thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80",
            artist: t.artist
          }));

          setSearchResults(finalSongs);
          return;
        }
      }
      
      setSearchError("No results found");
    } catch (e) {
      setSearchError("Failed to load songs");
    } finally {
      setSearchLoading(false);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setView(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setView(history[historyIndex + 1]);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setRecents(prev => [song, ...prev.filter(s => s.id !== song.id)].slice(0, 20));
  };

  const toggleLike = (song) => {
    const liked = likedSongs.find(s => s.id === song.id);
    setLikedSongs(liked ? likedSongs.filter(s => s.id !== song.id) : [...likedSongs, song]);
  };

  const createPlaylist = () => {
    const name = prompt("Enter playlist name:");
    if (name) setPlaylists([...playlists, { name, songs: [] }]);
  };

  const addToPlaylist = (idx, song) => {
    const updated = [...playlists];
    if (!updated[idx].songs.find(s => s.id === song.id)) {
      updated[idx].songs.push(song);
      setPlaylists(updated);
    }
  };

  const addArtist = (name) => {
    if (!artists.includes(name)) setArtists([...artists, name]);
  };

  const removePlaylist = (idx) => setPlaylists(playlists.filter((_, i) => i !== idx));
  const removeArtist = (idx) => setArtists(artists.filter((_, i) => i !== idx));

  return (
    <Routes>
      <Route path="/" element={
        <div className="app-container" id="app">
          <div className="premium-banner" id="premium-banner">
            <div className="premium-banner__text">
              <span className="premium-banner__label">Preview of Spotify</span>
              <span className="premium-banner__title">
                Sign up to get unlimited songs and podcasts with occasional ads. No credit card needed.
              </span>
            </div>
            <button className="premium-banner__cta" id="signup-free-btn">Sign up free</button>
          </div>

          <div className={`app-body ${isSidebarCollapsed ? "app-body--collapsed" : ""}`}>
            <Sidebar
              navigate={navigate}
              likedSongs={likedSongs}
              playlists={playlists}
              artists={artists}
              createPlaylist={createPlaylist}
              setCurrentPlaylist={setCurrentPlaylist}
              setCurrentArtist={setCurrentArtist}
              removePlaylist={removePlaylist}
              removeArtist={removeArtist}
              isSidebarCollapsed={isSidebarCollapsed}
              setIsSidebarCollapsed={setIsSidebarCollapsed}
            />
            <MainContent
              view={view}
              genreSongs={genreSongs}
              fetchCategory={fetchCategory}
              searchResults={searchResults}
              searchQuery={searchQuery}
              searchLoading={searchLoading}
              fetchErrors={fetchErrors}
              categoryLoading={categoryLoading}
              searchError={searchError}
              likedSongs={likedSongs}
              playlists={playlists}
              recents={recents}
              currentPlaylist={currentPlaylist}
              currentArtist={currentArtist}
              handleSearch={handleSearch}
              playSong={playSong}
              toggleLike={toggleLike}
              addToPlaylist={addToPlaylist}
              addArtist={addArtist}
              goBack={goBack}
              goForward={goForward}
            />
          </div>

          <Player currentSong={currentSong} />
        </div>
      } />
      <Route path="/premium" element={<Premium />} />
    </Routes>
  );
}

export default App;
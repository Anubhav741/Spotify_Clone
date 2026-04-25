import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Card from "./Card";

const GENRE_LABELS = {
  hits: "🔥 Hits", latest: "✨ Latest", pop: "🎵 Pop",
  indian: "🇮🇳 Indian", chill: "😌 Chill", hiphop: "🎤 Hip-Hop",
};

const PAGE_SIZE = 6;

function MainContent({
  view, genreSongs, searchResults, searchQuery, searchLoading,
  likedSongs, playlists, recents, currentPlaylist, currentArtist,
  handleSearch, playSong, toggleLike, addToPlaylist, addArtist, goBack, goForward, fetchCategory,
  fetchErrors, categoryLoading, searchError
}) {
  const [artistSongs, setArtistSongs] = useState([]);
  const [artistLoading, setArtistLoading] = useState(false);

  useEffect(() => {
    if (view !== "artist_view" || !currentArtist) return;
    setArtistLoading(true);
    setArtistSongs([]);
    const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY || "e8bb3fe8539ea8ee8641953c0a38a676";
    fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(currentArtist.name)}&api_key=${LASTFM_API_KEY}&format=json`)
      .then(r => r.json())
      .then(data => {
        let tracks = data?.results?.trackmatches?.track;
        if (tracks) {
          if (!Array.isArray(tracks)) tracks = [tracks];
          setArtistSongs(tracks.slice(0, 15).map((t, idx) => ({
            id: `lastfm-${idx}-${t.name}`,
            title: t.name,
            channel: t.artist,
            thumbnail: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&q=80",
            artist: t.artist
          })));
        }
      })
      .catch(() => {})
      .finally(() => setArtistLoading(false));
  }, [view, currentArtist]);

  const card = (song, idx) => (
    <Card
      key={song.id + idx}
      song={song}
      playSong={() => playSong(song)}
      isLiked={likedSongs.some(s => s.id === song.id)}
      toggleLike={() => toggleLike(song)}
      playlists={playlists}
      addToPlaylist={addToPlaylist}
      addArtist={() => addArtist(song.channel)}
    />
  );

  if (view === "home") {
    return (
      <div className="main-content">
        <Navbar handleSearch={handleSearch} goBack={goBack} goForward={goForward} view={view} />
        <div className="content-scroll">
          <h1 className="greeting" style={{ marginTop: 24 }}>Good evening</h1>
          {Object.entries(genreSongs).map(([key, songs]) => (
            <div className="section" key={key}>
              <div className="section__header">
                <h2 className="section__title">{GENRE_LABELS[key]}</h2>
              </div>
              {songs.length > 0 ? (
                <div className="card-grid">
                  {songs.slice(0, PAGE_SIZE).map((s, i) => card(s, i))}
                </div>
              ) : categoryLoading?.[key] ? (
                <div style={{ padding: "16px 0", color: "#b3b3b3" }}>Loading...</div>
              ) : fetchErrors?.[key] ? (
                <div style={{ padding: "16px 0", color: "#e22134" }}>{fetchErrors[key]}</div>
              ) : (
                <div style={{ padding: "16px 0", color: "#b3b3b3" }}>Nothing here yet.</div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (view === "search_results") {
    const top = searchResults[0];
    const rest = searchResults.slice(1);
    const counts = {};
    searchResults.forEach(s => { counts[s.channel] = (counts[s.channel] || 0) + 1; });
    const topCh = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    const isArtist = topCh && topCh[1] >= Math.ceil(searchResults.length * 0.4);

    return (
      <div className="main-content">
        <Navbar handleSearch={handleSearch} goBack={goBack} goForward={goForward} view={view} />
        <div className="content-scroll">
          <h1 className="greeting" style={{ marginTop: 24 }}>Results for &quot;{searchQuery}&quot;</h1>

          {searchLoading && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#b3b3b3", margin: "32px 0" }}>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
              <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #1db954", borderTopColor: "transparent", animation: "spin 0.8s linear infinite" }} />
              Searching YouTube...
            </div>
          )}

          {!searchLoading && searchError && (
            <div style={{ textAlign: "center", padding: "64px 0", color: "#b3b3b3" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{searchError}</p>
            </div>
          )}

          {!searchLoading && !searchError && searchResults.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0", color: "#b3b3b3" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 8 }}>No results for &quot;{searchQuery}&quot;</p>
              <p style={{ fontSize: 14 }}>Check the spelling or try a different search term.</p>
            </div>
          )}

          {!searchLoading && searchResults.length > 0 && isArtist && top && (
            <div className="artist-search-banner">
              <img src={top.thumbnail} alt={topCh[0]} className="artist-search-banner__img" />
              <div className="artist-search-banner__info">
                <span className="artist-search-banner__label">Artist</span>
                <h2 className="artist-search-banner__name">{topCh[0]}</h2>
                <div className="artist-search-banner__actions">
                  <button className="artist-search-banner__follow-btn" onClick={() => addArtist(topCh[0])}>Follow</button>
                  <button className="artist-search-banner__play-btn" onClick={() => playSong(top, 0, searchResults)}>▶️ Play</button>
                </div>
              </div>
            </div>
          )}

          {!searchLoading && searchResults.length > 0 && (
            <div className={!isArtist && top ? "search-top-layout" : ""}>
              {!isArtist && top && (
                <div className="search-top-layout__left">
                  <h3 className="search-section-label">Top Result</h3>
                  <div className="top-result-card" onClick={() => playSong(top, 0, searchResults)}>
                    <img src={top.thumbnail} alt={top.title} className="top-result-card__img" />
                    <div className="top-result-card__title">{top.title}</div>
                    <div className="top-result-card__sub">{top.channel}</div>
                    <button className="top-result-card__play" onClick={(e) => { e.stopPropagation(); playSong(top, 0, searchResults); }}>▶️</button>
                  </div>
                </div>
              )}
              <div className={!isArtist && top ? "search-top-layout__right" : ""}>
                <h3 className="search-section-label">Songs</h3>
                <div className="card-grid">
                  {(isArtist ? searchResults : rest).map((s, i) =>
                    card(s, isArtist ? i : i + 1)
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  let songs = [];
  let title = "";
  if (view === "liked") { songs = likedSongs; title = "Liked Songs"; }
  else if (view === "recents") { songs = recents; title = "Recently Played"; }
  else if (view === "playlist_view" && currentPlaylist) { songs = currentPlaylist.songs; title = currentPlaylist.name; }
  else if (view === "artist_view" && currentArtist) { songs = artistSongs; title = currentArtist.name; }
  else if (view === "search") { title = "Search"; }

  return (
    <div className="main-content">
      <Navbar handleSearch={handleSearch} goBack={goBack} goForward={goForward} view={view} />
      <div className="content-scroll">
        {view === "artist_view" && currentArtist ? (
          <div style={{ display: "flex", alignItems: "center", marginTop: 24, marginBottom: 32, gap: 24 }}>
            <img src={currentArtist.img} alt={currentArtist.name} style={{ width: 192, height: 192, borderRadius: "50%", objectFit: "cover", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: "bold", color: "#b3b3b3" }}>Artist</p>
              <h1 style={{ fontSize: 56, fontWeight: 900, margin: 0 }}>{currentArtist.name}</h1>
            </div>
          </div>
        ) : (
          <h1 className="greeting" style={{ marginTop: 24 }}>{title}</h1>
        )}

        {view === "search" && (
          <p style={{ color: "#b3b3b3", marginBottom: 24 }}>
            Type a song or artist name in the search bar above and press Enter or click 🔍.
          </p>
        )}

        {view === "artist_view" && artistLoading && (
          <p style={{ color: "#b3b3b3" }}>Loading songs...</p>
        )}

        {songs.length > 0 ? (
          <div className="card-grid">{songs.map((s, i) => card(s, i))}</div>
        ) : (
          !artistLoading && view !== "search" && view !== "artist_view" &&
          <p style={{ color: "#b3b3b3", marginTop: 32 }}>Nothing here yet.</p>
        )}
      </div>
    </div>
  );
}

export default MainContent;
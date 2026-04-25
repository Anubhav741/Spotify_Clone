import React, { useState } from 'react';
import { GoHomeFill, GoSearch } from 'react-icons/go';
import { VscLibrary } from 'react-icons/vsc';
import { HiPlus, HiOutlineArrowRight, HiOutlineArrowLeft } from 'react-icons/hi';
import { IoHeartSharp, IoClose } from 'react-icons/io5';
import { MdPodcasts, MdOutlinePushPin } from 'react-icons/md';
import { BiSortAlt2 } from 'react-icons/bi';
import Logo from '../assets/spotify_icon.png';
import album1 from '../assets/album1.png';

function Sidebar({ navigate, likedSongs, playlists, artists, createPlaylist, setCurrentPlaylist, setCurrentArtist, removePlaylist, removeArtist, isSidebarCollapsed, setIsSidebarCollapsed }) {
  const [filter, setFilter] = useState('All');

  return (
    <div className={`sidebar ${isSidebarCollapsed ? 'sidebar--collapsed' : ''}`}>
      <nav className="sidebar__nav">
        <div className="sidebar__logo">
          <img src={Logo} alt="Spotify" className="sidebar__logo-img" />
          <span className="sidebar__logo-text">Spotify</span>
        </div>
        <div className="sidebar__nav-item" onClick={() => navigate("home")}>
          <GoHomeFill className="sidebar__nav-icon" />
          <span>Home</span>
        </div>
        <div className="sidebar__nav-item" onClick={() => navigate("search")}>
          <GoSearch className="sidebar__nav-icon" />
          <span>Search</span>
        </div>
      </nav>

      <div className="sidebar__library">
        <div className="sidebar__library-header">
          <div className="sidebar__library-title">
            <VscLibrary className="sidebar__library-title-icon" />
            <span>Your Library</span>
          </div>
          <div className="sidebar__library-actions">
            <button className="sidebar__library-btn sidebar__library-btn--create" onClick={createPlaylist}>
              <HiPlus />
            </button>
            <button className="sidebar__library-btn sidebar__library-btn--collapse" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
              {isSidebarCollapsed ? <HiOutlineArrowRight /> : <HiOutlineArrowLeft />}
            </button>
          </div>
        </div>

        <div className="sidebar__library-filters">
          {['All', 'Playlists', 'Artists'].map(f => (
            <span
              key={f}
              className={`sidebar__filter-chip ${filter === f ? 'sidebar__filter-chip--active' : ''}`}
              onClick={() => setFilter(f)}
            >{f}</span>
          ))}
        </div>

        <div className="sidebar__search-sort">
          <button className="sidebar__search-btn"><GoSearch /></button>
          <button className="sidebar__sort-btn" onClick={() => navigate("recents")}>
            <span>Recents</span>
            <BiSortAlt2 />
          </button>
        </div>

        <div className="sidebar__playlists">
          {(filter === 'All' || filter === 'Playlists') && (
            <>
              <div className="sidebar__playlist-item" onClick={() => navigate("liked")}>
                <div className="sidebar__playlist-gradient sidebar__playlist-gradient--liked">
                  <IoHeartSharp />
                </div>
                <div className="sidebar__playlist-info">
                  <span className="sidebar__playlist-name">Liked Songs</span>
                  <span className="sidebar__playlist-meta">
                    <MdOutlinePushPin style={{ marginRight: 4, verticalAlign: 'middle', color: '#1db954', fontSize: '0.75rem' }} />
                    Playlist • {likedSongs.length} songs
                  </span>
                </div>
              </div>

              {playlists.map((pl, idx) => (
                <div className="sidebar__playlist-item playlist-item-hover" key={"pl" + idx} onClick={() => { setCurrentPlaylist(pl); navigate("playlist_view"); }}>
                  <div className="sidebar__playlist-gradient sidebar__playlist-gradient--episodes">
                    <MdPodcasts />
                  </div>
                  <div className="sidebar__playlist-info">
                    <span className="sidebar__playlist-name">{pl.name}</span>
                    <span className="sidebar__playlist-meta">Playlist • {pl.songs.length} songs</span>
                  </div>
                  <button className="sidebar__delete-btn" onClick={(e) => { e.stopPropagation(); removePlaylist(idx); }}>
                    <IoClose />
                  </button>
                </div>
              ))}
            </>
          )}

          {(filter === 'All' || filter === 'Artists') && artists.map((ar, idx) => (
            <div className="sidebar__playlist-item playlist-item-hover" key={"ar" + idx} onClick={() => { setCurrentArtist({ name: ar, img: album1 }); navigate("artist_view"); }}>
              <img src={album1} alt={ar} className="sidebar__playlist-img sidebar__playlist-img--rounded" />
              <div className="sidebar__playlist-info">
                <span className="sidebar__playlist-name">{ar}</span>
                <span className="sidebar__playlist-meta">Artist</span>
              </div>
              <button className="sidebar__delete-btn" onClick={(e) => { e.stopPropagation(); removeArtist(idx); }}>
                <IoClose />
              </button>
            </div>
          ))}
        </div>
      </div>
      <style>{`.playlist-item-hover { position: relative; } .playlist-item-hover .sidebar__delete-btn { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); display: none; background: transparent; border: none; color: #b3b3b3; cursor: pointer; padding: 4px; border-radius: 50%; z-index: 10; } .playlist-item-hover:hover .sidebar__delete-btn { display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.1); } .sidebar__delete-btn:hover { color: #fff; background: rgba(255,255,255,0.2) !important; }`}</style>
    </div>
  );
}

export default Sidebar;
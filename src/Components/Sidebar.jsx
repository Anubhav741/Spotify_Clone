import React from 'react';
import {
  GoHome,
  GoHomeFill,
  GoSearch,
} from 'react-icons/go';
import {
  VscLibrary,
} from 'react-icons/vsc';
import {
  HiPlus,
  HiOutlineArrowRight,
} from 'react-icons/hi';
import {
  IoHeartSharp,
} from 'react-icons/io5';
import {
  MdPodcasts,
  MdOutlinePushPin,
} from 'react-icons/md';
import {
  BiSortAlt2,
} from 'react-icons/bi';
import Logo from '../assets/spotify_icon.png';

import album1 from '../assets/album1.png';
import album2 from '../assets/album2.png';
import album3 from '../assets/album3.png';
import album4 from '../assets/album4.png';
import album5 from '../assets/album5.png';
import album6 from '../assets/album6.png';

const playlistData = [
  {
    name: 'Liked Songs',
    type: 'Playlist',
    count: '312 songs',
    gradient: 'liked',
    isPinned: true,
  },
  {
    name: 'Your Episodes',
    type: 'Playlist',
    count: '12 episodes',
    gradient: 'episodes',
  },
  {
    name: 'Chill Lo-Fi Vibes',
    type: 'Playlist',
    owner: 'Spotify',
    img: album1,
  },
  {
    name: 'Energy Flows',
    type: 'Playlist',
    owner: 'Pop Central',
    img: album2,
  },
  {
    name: 'Cyber Wave EDM',
    type: 'Playlist',
    owner: 'DJ Pulse',
    img: album3,
  },
  {
    name: 'Echoes of the Canyon',
    type: 'Album',
    owner: 'Indie Collective',
    img: album4,
  },
  {
    name: 'Soulful Nights',
    type: 'Playlist',
    owner: 'R&B Mood',
    img: album5,
  },
  {
    name: 'Classical Piano',
    type: 'Playlist',
    owner: 'Piano Masters',
    img: album6,
  },
  {
    name: 'Arijit Singh Radio',
    type: 'Artist',
    isArtist: true,
    img: album1,
  },
  {
    name: 'Midnight Drives',
    type: 'Playlist',
    owner: 'Night Owl',
    img: album3,
  },
  {
    name: 'Morning Coffee',
    type: 'Playlist',
    owner: 'Feel Good Inc',
    img: album4,
  },
];

function Sidebar() {
  return (
    <div className="sidebar">

      <nav className="sidebar__nav">
        <div className="sidebar__logo">
          <img src={Logo} alt="Spotify" className="sidebar__logo-img" />
          <span className="sidebar__logo-text">Spotify</span>
        </div>

        <div className="sidebar__nav-item sidebar__nav-item--active">
          <GoHomeFill className="sidebar__nav-icon" />
          <span>Home</span>
        </div>

        <div className="sidebar__nav-item">
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
            <button className="sidebar__library-btn" title="Create playlist or folder">
              <HiPlus />
            </button>
            <button className="sidebar__library-btn" title="Show more">
              <HiOutlineArrowRight />
            </button>
          </div>
        </div>


        <div className="sidebar__library-filters">
          <span className="sidebar__filter-chip sidebar__filter-chip--active">Playlists</span>
          <span className="sidebar__filter-chip">Artists</span>
          <span className="sidebar__filter-chip">Albums</span>
          <span className="sidebar__filter-chip">Podcasts</span>
        </div>


        <div className="sidebar__search-sort">
          <button className="sidebar__search-btn">
            <GoSearch />
          </button>
          <button className="sidebar__sort-btn">
            <span>Recents</span>
            <BiSortAlt2 />
          </button>
        </div>


        <div className="sidebar__playlists">
          {playlistData.map((item, index) => (
            <div className="sidebar__playlist-item" key={index}>
              {item.gradient ? (
                <div className={`sidebar__playlist-gradient sidebar__playlist-gradient--${item.gradient}`}>
                  {item.gradient === 'liked' ? <IoHeartSharp /> : <MdPodcasts />}
                </div>
              ) : (
                <img
                  src={item.img}
                  alt={item.name}
                  className={`sidebar__playlist-img ${item.isArtist ? 'sidebar__playlist-img--rounded' : ''}`}
                />
              )}
              <div className="sidebar__playlist-info">
                <span className="sidebar__playlist-name">{item.name}</span>
                <span className="sidebar__playlist-meta">
                  {item.isPinned && <MdOutlinePushPin style={{ marginRight: 4, verticalAlign: 'middle', color: '#1db954', fontSize: '0.75rem' }} />}
                  {item.type} {item.owner ? `• ${item.owner}` : item.count ? `• ${item.count}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
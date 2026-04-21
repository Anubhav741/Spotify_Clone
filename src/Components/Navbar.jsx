import React from 'react';
import {
  GoChevronLeft,
  GoChevronRight,
  GoSearch,
} from 'react-icons/go';
import {
  HiOutlineDownload,
} from 'react-icons/hi';
import {
  IoNotificationsOutline,
} from 'react-icons/io5';
import {
  MdOutlineGridView,
} from 'react-icons/md';

function Navbar() {
  return (
    <nav className="navbar" id="navbar">

      <div className="navbar__left">
        <button className="navbar__history-btn navbar__history-btn--disabled" aria-label="Go back">
          <GoChevronLeft />
        </button>
        <button className="navbar__history-btn navbar__history-btn--disabled" aria-label="Go forward">
          <GoChevronRight />
        </button>
      </div>


      <div className="navbar__center">
        <div className="navbar__search-container">
          <GoSearch className="navbar__search-icon" />
          <input
            type="text"
            className="navbar__search-input"
            placeholder="What do you want to play?"
            id="search-input"
            autoComplete="off"
          />
          <span className="navbar__search-divider"></span>
          <button className="navbar__browse-btn" aria-label="Browse">
            <MdOutlineGridView />
          </button>
        </div>
      </div>


      <div className="navbar__right">
        <button className="navbar__premium-btn" id="explore-premium-btn">
          Explore Premium
        </button>
        <button className="navbar__install-btn" id="install-app-btn">
          <HiOutlineDownload style={{ fontSize: '1.1rem' }} />
          Install App
        </button>
        <button className="navbar__notification-btn" aria-label="What's new" id="notification-btn">
          <IoNotificationsOutline />
          <span className="navbar__notification-dot"></span>
        </button>
        <div className="navbar__avatar" id="user-avatar" title="User">
          A
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
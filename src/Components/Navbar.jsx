import React, { useState, useEffect, useRef } from 'react';
import { GoChevronLeft, GoChevronRight, GoSearch } from 'react-icons/go';
import { HiOutlineDownload } from 'react-icons/hi';

import { useNavigate } from 'react-router-dom';

function Navbar({ handleSearch, goBack, goForward, view }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (view === "search" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [view]);

  const submit = () => {
    if (query.trim()) handleSearch(query.trim());
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") submit();
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar__left">
        <button className="navbar__history-btn" onClick={goBack}>
          <GoChevronLeft />
        </button>
        <button className="navbar__history-btn" onClick={goForward}>
          <GoChevronRight />
        </button>
      </div>
      <div className="navbar__center">
        <div className="navbar__search-container">
          <button className="navbar__search-icon-btn" onClick={submit} aria-label="Search">
            <GoSearch />
          </button>
          <input
            ref={inputRef}
            type="text"
            className="navbar__search-input"
            placeholder="What do you want to play?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>
      <div className="navbar__right">
        <button className="navbar__premium-btn" id="explore-premium-btn" onClick={() => navigate('/premium')}>
          Explore Premium
        </button>
        <button className="navbar__install-btn" id="install-app-btn">
          <HiOutlineDownload style={{ fontSize: '1.1rem' }} />
          Install App
        </button>
        <div className="navbar__avatar">A</div>
      </div>
    </nav>
  );
}

export default Navbar;
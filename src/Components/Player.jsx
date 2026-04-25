import React from 'react';
import { MdOutlineQueueMusic } from 'react-icons/md';
import { HiOutlineDeviceMobile } from 'react-icons/hi';
import { SlVolume2 } from 'react-icons/sl';

function Player({ currentSong }) {
  if (!currentSong) {
    return (
      <div style={{ height: '90px', backgroundColor: '#181818', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b3b3b3' }}>
        Select a song to play
      </div>
    );
  }

  return (
    <div style={{ height: '90px', backgroundColor: '#181818', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', width: '30%', overflow: 'hidden' }}>
        <img src={currentSong.thumbnail} alt="" style={{ height: 56, width: 56, borderRadius: 4, marginRight: 16, flexShrink: 0 }} />
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', textOverflow: 'ellipsis', overflow: 'hidden' }}>{currentSong.title}</div>
          <div style={{ color: '#b3b3b3', fontSize: 12, textOverflow: 'ellipsis', overflow: 'hidden' }}>{currentSong.channel}</div>
        </div>
      </div>

      <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ color: '#b3b3b3', fontSize: 14, fontWeight: 'bold' }}>
          Playback not available
        </div>
      </div>

      <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: '#b3b3b3', gap: 16 }}>
        <button><MdOutlineQueueMusic size={20} /></button>
        <button><HiOutlineDeviceMobile size={20} /></button>
        <button><SlVolume2 size={20} /></button>
        <div style={{ width: 90, height: 4, backgroundColor: '#535353', borderRadius: 2 }}>
          <div style={{ width: '50%', height: '100%', backgroundColor: '#fff', borderRadius: 2 }} />
        </div>
      </div>
    </div>
  );
}

export default Player;
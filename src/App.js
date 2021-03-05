import React, { useState } from 'react';
import Player from './components/player/Player';
import qs from "qs";
import './App.scss';

function App() {
  const [searchValue, updateSearch] = useState('')
  const [error, setError] = useState('')
  const [playlist, updatePlaylist] = useState([
    {
      title: "HOSH at Jai Vilas Palace in Gwalior, India for Cercle",
      url: "https://www.youtube.com/watch?v=z05IO3gWlog&t=1982s",
      id: "z05IO3gWlog"
    }
  ]);
  const addSong = () => {
    // get the video id from th url
    const newSong = qs.parse(searchValue.split('?')[1])?.v;

    if (!newSong) {
      setError('Please enter valid video url..')
      return
    }
    updatePlaylist([...playlist, { title: "", url: searchValue }])
    updateSearch('')
  }
  const removeFirstSong = () => {
    const reducedList = playlist.splice(1)
    updatePlaylist(reducedList)
  }

  return (
    <div className="container">
      <div className="container__list_pannel">

        <div className="container__list_pannel__searchbar">
          <input type="text" value={searchValue} onChange={(e) => updateSearch(e.target.value)} />
          <button onClick={addSong}>Add</button>
          <button onClick={removeFirstSong}>Remove</button>
        </div>
        {error && <div className="container__error">{error}</div>}
        <ul className="container__list_pannel__songs">
          {playlist.length ?
            playlist.map((song, i) => <li key={i}>{song.url}</li>) :
            <li>empty list</li>
          }
        </ul>

      </div>
      <div className="container__video_pannel">
        <Player video={playlist[0]} />
      </div>
    </div>
  );
}

export default App;

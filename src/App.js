import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import Player from './components/player/Player';
import qs from "qs";
import { auth } from './firebase';
import { addVideoToDb, getPlaylistFromDb } from './helpers/db';
import SignIn from './components/sign-in/SignIn';
import SignOut from './components/sign-out/SignOut';
import { PageHeader } from 'antd';
import 'antd/dist/antd.css';
import './App.scss';

function App() {

  const [user] = useAuthState(auth)
  const [searchValue, updateSearch] = useState('')
  const [error, setError] = useState('')
  const [playlist, updatePlaylist] = useState([]);

  // Get playlist and update state
  useEffect(() => {
    if (!playlist.length) {
      getPlaylistFromDb.then(res => {
        updatePlaylist(res)
      })
    }
  });

  const addVideo = () => {
    // get the video id from th url
    const newVideoId = qs.parse(searchValue.split('?')[1])?.v;
    if (!newVideoId) {
      setError('Please enter valid video url..')
      return
    }
    const currentDateTime = new Date()
    const newVideoData = { id: newVideoId, title: "", url: searchValue, updatedAt: currentDateTime, order: playlist.length }
    updatePlaylist([...playlist, newVideoData])
    addVideoToDb(newVideoData)
    updateSearch('')
    setError('')
  }

  const removeFirstSong = () => {
    const reducedList = playlist.splice(1)
    updatePlaylist(reducedList)
  }

  return (
    <>
      { !user ? <SignIn auth={auth} /> :
        <>
          <PageHeader><SignOut auth={auth} /></PageHeader>
          <div className="container">
            <div className="container__list_pannel">
              <div className="container__list_pannel__searchbar">
                <input type="text" value={searchValue} onChange={(e) => updateSearch(e.target.value)} />
                <button onClick={addVideo}>Add</button>
                <button onClick={removeFirstSong}>Next</button>
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
              {playlist?.length > 0 &&
                <Player video={playlist[0]} onFinishVideo={removeFirstSong} />
              }
            </div>
          </div>
        </>
      }
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import Player from './components/player/Player';
import qs from "qs";
import { auth } from './firebase';
import { addVideoToDb, getPlaylistFromDb, removeVideoFromDb } from './helpers/db';
import SignIn from './components/sign-in/SignIn';
import SignOut from './components/sign-out/SignOut';
import { PageHeader, Input, Button, Alert, List } from 'antd';
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
    const newVideoData = { vid: newVideoId, title: "", url: searchValue, updatedAt: currentDateTime }
    addVideoToDb(newVideoData, (res) => { newVideoData["id"] = res });
    updatePlaylist([...playlist, newVideoData])
    updateSearch('')
    setError('')
  }

  const removeFirstSong = () => {
    removeVideoFromDb(playlist[0].id)
    const reducedList = playlist.splice(1)
    updatePlaylist(reducedList)
  }

  return (
    <>
      { !user ? <SignIn auth={auth} /> :
        <>
          <PageHeader className="site-page-header"><SignOut auth={auth} /></PageHeader>
          <div className="container">
            <div className="container__list_pannel">
              <div className="container__list_pannel__searchbar">
                <Input
                  type="text"
                  className="container__list_pannel__searchbar__input"
                  value={searchValue}
                  onChange={(e) => updateSearch(e.target.value)}
                  size="large"
                  placeholder="Add url"
                />
                <Button 
                className="container__list_pannel__searchbar__add" 
                onClick={addVideo}>Add</Button>
                <Button 
                className="container__list_pannel__searchbar__remove" 
                disabled={!playlist.length}
                onClick={removeFirstSong}>Next</Button>
              </div>
              {error && <Alert message={error} type="error" />}
              <div className="container__list_pannel__videos">
                {playlist.length ?
                  <List
                    header={<div>Playlist :</div>}
                    bordered
                    dataSource={playlist}
                    renderItem={item => (
                      <List.Item> {item.url} </List.Item>
                    )}
                  /> :
                  <Alert message={"Empty playlist. please add some videos urls"} type="info" />
                }
              </div>
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

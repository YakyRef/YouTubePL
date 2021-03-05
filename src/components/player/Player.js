import YouTube from 'react-youtube';

function Player({video}) {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      };
      const onReady = (event) => {
        event.target.pauseVideo();
      }
    return (
      <>
        <p>You clicked {JSON.stringify(video)} times</p>
        <YouTube videoId={video.id} opts={opts} onReady={onReady} />
      </>
    );
  }

  export default Player;
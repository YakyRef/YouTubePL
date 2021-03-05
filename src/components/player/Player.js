import YouTube from 'react-youtube';

function Player({video, onFinishVideo}) {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          autoplay: 1,
        },
      };
      const onReady = (event) => {
        event.target.playVideo();
      }
      const onEnd = (event) => {
        onFinishVideo()
      }
    return (
      <>
        <YouTube videoId={video.id} opts={opts} onReady={onReady} onEnd={onEnd} />
      </>
    );
  }

  export default Player;
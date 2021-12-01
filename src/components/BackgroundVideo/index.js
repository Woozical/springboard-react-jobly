import './style.css';

const BackgroundVideo = ({videoSrc, opacity}) => {
  return (
    <div style={{opacity}} className="BackgroundVideo">
      <video autoPlay muted>
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  )
}

export default BackgroundVideo;
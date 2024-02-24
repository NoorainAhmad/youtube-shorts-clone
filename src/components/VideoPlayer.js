import React, { useRef, useState, useEffect } from 'react';
import './VideoPlayer.css';

const videos = [
  {
    id: 1,
    title: "Bike Ride",
    description: "Enjoy a scenic bike ride through the countryside.",
    source: "https://player.vimeo.com/external/638855382.sd.mp4?s=af4e03df363b34ab438f3b750852a2ab163698db&profile_id=164&oauth2_token_id=57447761",
    liked: false,
    comments: []
  },
  {
    id: 2,
    title: "Beautiful Scenery",
    description: "Immerse yourself in the beauty of nature with stunning scenery.",
    source: "https://player.vimeo.com/external/458930839.sd.mp4?s=738c8557a7fa1273365d13ed514be25a7fd2f453&profile_id=164&oauth2_token_id=57447761",
    liked: false,
    comments: []
  },
  {
    id: 3,
    title: "Beach and Boat",
    description: "Let's enjoy the beach together.",
    source: "https://player.vimeo.com/external/366974782.sd.mp4?s=cb1c5618db8ee20a68d8bfd026e6b4cee35a68be&profile_id=164&oauth2_token_id=57447761",
    liked: false,
    comments: []
  },
  {
    id: 4,
    title: "Music",
    description: "A very Talented artist",
    source: "https://player.vimeo.com/external/121585463.sd.mp4?s=bbd4f022fcef4ca9de315a940fbd3fba17a2f780&profile_id=112&oauth2_token_id=57447761",
    liked: false,
    comments: []
  }
  
  // Add more video objects as needed
];

const VideoPlayer = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [commentText, setCommentText] = useState("");
  const videoRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

const toggleLike = () => {
  const updatedVideos = [...videos];
  updatedVideos[currentVideoIndex].liked = !updatedVideos[currentVideoIndex].liked;
  // No need to update state as it's managed locally
};


  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleSubmitComment = () => {
    const updatedVideos = [...videos];
    updatedVideos[currentVideoIndex].comments.push(commentText);
    setCommentText("");
    setCurrentVideoIndex(currentVideoIndex);
  };

  const handleShare = (platform) => {
    // Implement share functionality for the specified platform
    console.log(`Sharing video on ${platform}`);
  };

  return (
    <div className="video-container">
      <h1 className="app-title">YouTube Shorts</h1>
      <video
        ref={videoRef}
        className="video-player"
        src={videos[currentVideoIndex].source}
        controls
        autoPlay
        onEnded={handleNextVideo}
      ></video>
      <div className="video-info">
        <h2>{videos[currentVideoIndex].title}</h2>
        <p>{videos[currentVideoIndex].description}</p>
        <button className={`like-button ${videos[currentVideoIndex].liked ? 'liked' : ''}`} onClick={toggleLike}>
          {videos[currentVideoIndex].liked ? 'Unlike' : 'Like'}
        </button>
      </div>
      <div className="video-controls">
        <button className="control-button" onClick={handlePrevVideo}>Previous</button>
        <button className="control-button" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="control-button" onClick={handleNextVideo}>Next</button>
      </div>
      <div className="video-comments">
        <h3>Comments</h3>
        <ul>
          {videos[currentVideoIndex].comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
        <input type="text" value={commentText} onChange={handleCommentChange} />
        <button onClick={handleSubmitComment}>Add Comment</button>
      </div>
      <div className="video-share">
        <h3>Share</h3>
        <button onClick={() => handleShare('Facebook')}>Facebook</button>
        <button onClick={() => handleShare('Twitter')}>Twitter</button>
        {/* Add more share buttons for other platforms */}
      </div>
    </div>
  );
};

export default VideoPlayer;

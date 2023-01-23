import React, { useState, useRef, useEffect } from "react";
import videojs from "video.js";
import "videojs-vtt-thumbnails";

import "./App.scss";

export default function VideoPlayer() {
  const [videoId, setVideoId] = useState(
    "h4bswqk02KxNMlM6Ctn5i9nUv7zlfA00Q602tCAIdqoG2M"
  );
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoPoster, setVideoPoster] = useState(null);
  const [videoThumbs, setVideoThumbs] = useState(null);

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const handleVideoId = (event) => {
    setVideoId(event.target.value);
  };

  const handleLoadVideo = () => {
    setVideoSrc(
      `https://stream.mux.com/02C01HUEfHVPezJam01hHATmntJuH2003Yu3dbZhAKmaP1E.m3u8`
    );
    setVideoPoster(
      `https://image.mux.com/${videoId}/thumbnail.png?fit_mode=smartcrop&time=3`
    );
    setVideoThumbs(`https://image.mux.com/${videoId}/storyboard.vtt`);
  };

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      const video = videoRef.current;

      playerRef.current = videojs(video, {
        autoplay: false,
        controls: true,
        preload: "auto",
        playbackRates: [0.5, 1, 1.5, 2, 2.5],
        userActions: {
          hotkeys: true
        },
        controlBar: {
          pictureInPictureToggle: false
        },
        poster: videoPoster
      });

      playerRef.current.src(videoSrc);

      playerRef.current.vttThumbnails({
        src: videoThumbs
      });

      playerRef.current.on("play", () => {
        playerRef.current.bigPlayButton.hide();
      });

      playerRef.current.on("pause", () => {
        playerRef.current.bigPlayButton.show();
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [videoRef, videoSrc, videoPoster, videoThumbs]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h1>MUX Video Preview</h1>
      <input
        type="text"
        placeholder="Video ID"
        style={{ marginBottom: "10px", width: "50%" }}
        onChange={handleVideoId}
        value={videoId}
      />
      <button onClick={handleLoadVideo}>Load</button>
      {videoSrc && <video ref={videoRef} className="video video-js" />}
    </div>
  );
}

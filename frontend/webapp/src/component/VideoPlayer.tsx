import MuxPlayer from "@mux/mux-player-react";

const VideoPlayer = ({ id, title }: { id: string; title: string }) => {
  return (
    <MuxPlayer
      style={{
        height: "300px",
        maxWidth: "100%",
      }}
      streamType="on-demand"
      playbackId={id}
      metadata={{
        video_id: "video-id-54321",
        video_title: title,
        viewer_user_id: "user-id-007",
      }}
    />
  );
};

export default VideoPlayer;

import React, { useState } from "react";
import "./App.css";
import UploadModal from "./component/UploadModal";

import { Divider } from "antd";
import VideoList from "./component/VideoList";


function App() {
  const [listUpdate, setListUpdate] = useState<boolean>(false);
  const onVideoUpload = () => {
    setListUpdate(true);
  };

  const onVideoListUpdated = () => {
    setListUpdate(false);
  };
  return (
    <>
      <UploadModal onVideoUpload={onVideoUpload} />
      <Divider />
      <VideoList
        isListUpdate={listUpdate}
        onVideoListUpdated={onVideoListUpdated}
      />
    </>
  );
}

export default App;

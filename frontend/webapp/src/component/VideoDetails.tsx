import { Row, Col, Button, Card, Select, Typography, Space } from "antd";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../store/store";

const { Text, Title, Paragraph } = Typography;
const { Option } = Select;

type videoQuality = "low" | "medium" | "high";
const VideoDetails = () => {
  const [selected, setSelected] = useState<videoQuality>("low");

  const { playbackId } = useParams();

  const { videoList } = useAppSelector((state) => state.video);

  const findByPlaybackId = videoList.find(
    (list) => list.playbackId === playbackId
  );

  const handleChange = (value: videoQuality) => {
    setSelected(value);
  };

  return (
    <>
      {findByPlaybackId && (
        <Card
          style={{
            margin: "auto",
            width: "55%",
            position: "relative",
            top: "50px",
          }}
          hoverable
          bodyStyle={{ lineHeight: "0", padding: "10px" }}
          cover={
            <VideoPlayer
              id={findByPlaybackId.playbackId}
              title={findByPlaybackId.videoTitle}
            />
          }
        >
          <Row>
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Title level={2} style={{ textTransform: "capitalize" }}>
                    {findByPlaybackId.videoTitle}
                  </Title>
                </Col>
                <Col span={12}>
                  <Space>
                    <Text> video quality</Text>
                    <Select
                      defaultValue={selected}
                      style={{ width: 120 }}
                      onChange={handleChange}
                    >
                      <Option value="low" >Low</Option>
                      <Option value="medium" >Medium</Option>
                      <Option value="high" >High</Option>
                    </Select>

                    <Button>
                      <a href={`https://stream.mux.com/${findByPlaybackId.playbackId}/${selected}.mp4?download=trial`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Download
                      </a>
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Space direction="vertical" size="large">
                <Text strong>
                  Uploaded On:-
                  {new Date(findByPlaybackId.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      // weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </Text>
                <Paragraph style={{ textTransform: "capitalize" }}>
                  {findByPlaybackId.description}
                </Paragraph>
              </Space>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};

export default VideoDetails;

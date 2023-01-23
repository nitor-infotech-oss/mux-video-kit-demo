import { PlayCircleOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Card,
  message,
  Typography,
  Pagination,
  PaginationProps,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getVideoList } from "../store/slices/video";
import { useAppDispatch } from "../store/store";
import { isFulfilled } from "@reduxjs/toolkit";

import { PaginationType, VideoListType } from "../types/video";
import "./VideoList.css";

const { Text, Title } = Typography;

const VideoList = ({
  isListUpdate,
  onVideoListUpdated,
}: {
  isListUpdate: boolean;
  onVideoListUpdated: () => void;
}) => {
  const [list, setList] = useState<VideoListType[]>();
  const dispatch = useAppDispatch();
  const [pagination, setPagination] = useState<PaginationType>({
    current: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);

  const videoList = async () => {
    setLoader(true);
    const actionResult = await dispatch(
      getVideoList({
        current: pagination.current - 1,
        pageSize: pagination.pageSize,
      })
    );
    if (actionResult && isFulfilled(actionResult)) {
      setLoader(false);
      if (actionResult.payload.success) {
        setList(actionResult.payload.data.videoList);
        setTotal(actionResult.payload.data.total);
        onVideoListUpdated();
      } else {
        message.error(actionResult.payload.message);
      }
    }
  };
  const onChange: PaginationProps["onShowSizeChange"] = (current, pageSize) => {
    setPagination({ current, pageSize });
  };
  useEffect(() => {
    videoList();
  }, [isListUpdate, pagination]);

  return (
    <React.Fragment>
      <Row gutter={16} justify="space-evenly">
        {list
          ? list.map((data: VideoListType) => {
              return (
                <Link to={`/videoDetails/${data.playbackId}`} key={data._id}>
                  <Col span={8}>
                    <Card
                      loading={loader}
                      hoverable={false}
                      style={{ width: 240, margin: "0" }}
                      bordered={false}
                      bodyStyle={{ padding: "0", margin: "10px" }}
                      cover={
                        <div className="container">
                          <img
                            alt="example"
                            src={`https://image.mux.com/${data.playbackId}/animated.gif?width=214&height=121`}
                          />
                          {/* <PlayCircleOutlined className="btn" /> */}
                          <Title level={5} className="title">
                            {data.videoTitle}
                          </Title>
                          <Text strong className="duration">
                            {data.duration}
                          </Text>
                        </div>
                      }
                    ></Card>
                  </Col>
                </Link>
              );
            })
          : []}
      </Row>
      <Pagination
        style={{ textAlign: "center" }}
        current={pagination.current}
        pageSize={pagination.pageSize}
        onChange={onChange}
        total={total}
      />
      ;
    </React.Fragment>
  );
};

export default VideoList;

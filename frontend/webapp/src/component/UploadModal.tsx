import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Upload,
  Row,
  Col,
  Typography,
  Progress,
} from "antd";
import type { UploadProps } from "antd";
import { useState } from "react";
import * as UpChunk from "@mux/upchunk";
import { createUrl, uploadVideo } from "../store/slices/video";
import { useAppDispatch } from "../store/store";
import { isFulfilled } from "@reduxjs/toolkit";
const { TextArea } = Input;
const { Dragger } = Upload;
const { Title } = Typography;
const UploadModal = ({ onVideoUpload }: { onVideoUpload: () => void }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [files, setFiles] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  // const [progress, setProgress] = useState<number>(0);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    setLoader(true);
    const actionResult = await dispatch(createUrl());
    if (actionResult && isFulfilled(actionResult)) {
      if (actionResult.payload.success) {
        const upload = UpChunk.createUpload({
          endpoint: actionResult.payload.data.url,
          file: files, // the file object with all your video file’s data
          chunkSize: 5120, // Uploads the file in ~5mb chunks
        });

        //     // Subscribe to events
        //     upload.on("error", (error) => {
        //       console.error("💥 🙀", error.detail);
        //     });

        upload.on("progress", (progress) => {
          console.log(
            `So far we've uploaded ${progress.detail}% of this file.`
          );
          // setProgress(progress.detail);
        });

        upload.on("offline", () => {
          console.log(` you are offline`);
        });

        upload.on("online", () => {
          console.log(` you are online`);
        });

        upload.on("success", async () => {
          const uploadVideoResult = await dispatch(
            uploadVideo({
              name: values.name,
              description: values.description,
              uploadId: actionResult.payload.data.uploadId,
            })
          );
          if (uploadVideoResult && isFulfilled(uploadVideoResult)) {
            setLoader(false);
            console.log(uploadVideoResult.payload.message);
            if (uploadVideoResult.payload.success) {
              // setProgress(0);
              message.success(uploadVideoResult.payload.message);
              onVideoUpload();
            } else {
              message.error(uploadVideoResult.payload.message);
            }
          }
        });
      } else {
        message.error(actionResult.payload.message);
      }
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const props: UploadProps = {
    multiple: false,
    accept: "video/*",
    beforeUpload(file) {
      setFiles(file);
      return false;
    },
  };

  return (
    <>
      <Button
        type="primary"
        style={{ float: "right", margin: "20px" }}
        onClick={showModal}
      >
        Upload Video
      </Button>
      {/* {progress !== 0 && <Progress percent={progress} width={10} />} */}

      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        closable={false}
      >
        <Row justify="center">
          <Col span={24}>
            <Title
              level={4}
              style={{
                textAlign: "center",
                color: "#585FA9",
                fontWeight: "bold",
              }}
            >
              Upload Video
            </Title>

            <Form
              name="basic"
              form={form}
              labelCol={{ span: 6 }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <TextArea rows={4} maxLength={20} />
              </Form.Item>

              <Form.Item label="select file" valuePropName="file">
                <Dragger {...props}></Dragger>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loader}
                  style={{ alignItems: "center" }}
                >
                  Upload
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default UploadModal;

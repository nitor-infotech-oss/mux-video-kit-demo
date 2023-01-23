import { BaseResponse } from "./base";

export type GetUrlResponse = BaseResponse & {
    data: {
        url: string,
        uploadId: string
    }
}

export type UploadVideoRequest = {
    name: string,
    description: string,
    uploadId: string,
}

export type UploadVideoResponse = BaseResponse & {
    data: {
        assetId: string,
        playbackId: string
    }
}

export type VideoListType = {
    _id: string,
    videoTitle: string,
    description: string,
    assetId: string,
    playbackId: string,
    duration: string,
    createdAt: Date
}

export type GetVideoListRequest = {
    current: number,
    pageSize: number
}

export type GetVideoListResponse = BaseResponse & {
    data: { total: number, videoList: VideoListType[] }
}

export type PaginationType = {
    current: number;
    pageSize: number;
};

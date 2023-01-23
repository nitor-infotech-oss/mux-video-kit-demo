import { GetUrlResponse, GetVideoListRequest, GetVideoListResponse, UploadVideoRequest, UploadVideoResponse } from '../types/video';
import { CREATE_URL, UPLOAD_VIDEO, VIDEO_LIST } from './endpoints';
import api from './main'


export const createUrl = async () => {
    const response = await api.request<GetUrlResponse>({
        url: CREATE_URL,
        method: 'POST',
    })
    if (response.remote === 'success') {
        return {
            remote: 'success',
            data: response.data,
            error: { errors: '' },
        }
    }
    return response
}

export const uploadVideo = async (request: UploadVideoRequest) => {
    const response = await api.request<UploadVideoResponse>({
        url: UPLOAD_VIDEO,
        method: 'POST',
        data: request,
    })
    if (response.remote === 'success') {
        return {
            remote: 'success',
            data: response.data,
            error: { errors: '' },
        }
    }
    return response
}

export const getVideoList = async (request: GetVideoListRequest) => {
    const response = await api.request<GetVideoListResponse>({
        url: VIDEO_LIST,
        method: 'POST',
        data: request,
    })
    if (response.remote === 'success') {
        return {
            remote: 'success',
            data: response.data,
            error: { errors: '' },
        }
    }
    return response
}
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as video from '../../axios/video'
import { GetVideoListResponse, VideoListType } from '../../types/video'

type VideoState = {
    loading: boolean,
    videoList: VideoListType[]
}

export const initialState: VideoState = {
    loading: false,
    videoList: []
}

export const createUrl = createAsyncThunk(
    'video/createUrl',
    async (
        request: void,
        { rejectWithValue, dispatch }
    ) => {
        dispatch(setLoading(true))
        const response = await video.createUrl()
        dispatch(setLoading(false))
        if (response.remote === 'success') {
            const { data } = response

            return { ...data }
        } else {
            return rejectWithValue(response.error.errors)
        }
    }
)

export const uploadVideo = createAsyncThunk(
    'video/uploadVideo',
    async (
        request: { name: string, description: string, uploadId: string },
        { rejectWithValue, dispatch }
    ) => {
        dispatch(setLoading(true))
        const response = await video.uploadVideo(request)
        dispatch(setLoading(false))
        if (response.remote === 'success') {
            const { data } = response

            return { ...data }
        } else {
            return rejectWithValue(response.error.errors)
        }
    }
)

export const getVideoList = createAsyncThunk(
    'video/videoList',
    async (
        request: { current: number, pageSize: number },
        { rejectWithValue, dispatch }
    ) => {
        dispatch(setLoading(true))
        const response = await video.getVideoList(request)
        dispatch(setLoading(false))
        if (response.remote === 'success') {
            const { data } = response
            return { ...data }
        } else {
            return rejectWithValue(response.error.errors)
        }
    }
)

const videosSlice = createSlice({
    name: 'videosSlice',
    initialState,
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getVideoList.fulfilled, (state, { payload }: PayloadAction<GetVideoListResponse>) => {
                state.videoList = payload.data.videoList
            })
    },
})
export default videosSlice.reducer

export const { setLoading } = videosSlice.actions
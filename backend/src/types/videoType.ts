export type UploadVideoRequest = {
    name: string, description: string, uploadId: string
}

export type VideoInfo = {
    videoTitle: string,
    description: string,
    assetId: string,
    playbackId: string,
    duration: string,
    createdAt: number
}
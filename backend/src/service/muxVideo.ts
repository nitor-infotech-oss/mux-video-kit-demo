import Mux from "@mux/mux-node";
import axios from "axios";
import { Request, Response } from "express";
import { UploadVideoRequest, VideoInfo } from "types/videoType";
import uploadModel from '../models/upload'
import dotenv from 'dotenv';
dotenv.config();
const baseUrl = 'https://api.mux.com'

const options = {
    headers: {
        'User-Agent': `Mux Direct Upload Button`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    auth: {
        username: process.env.MUX_ACCESS_TOKEN_ID,
        password: process.env.MUX_SECRET_KEY,
    },
    mode: 'cors',
}


export const createUrl = async (req: Request, res: Response): Promise<any> => {
    try {
        const response = await axios.post(`${process.env.MUX_BASE_URL}/video/v1/uploads`, {
            "cors_origin": "*",
            "new_asset_settings": {
                "playback_policy": [
                    "public"
                ],
                "mp4_support": "standard"

            }
        }, options)
        return res.send({ success: true, data: { url: response.data.data.url, uploadId: response.data.data.id }, message: "url created" });

    } catch (errorRes) {
        return { success: "responseStatus.failure", data: {}, message: "error.message" }
    }
}

export const upload = async (req, res) => {
    try {

        const mux_token_id = process.env.MUX_ACCESS_TOKEN_ID;
        const mux_token_secret_ = process.env.MUX_SECRET_KEY;
        const { Video } = new Mux(mux_token_id, mux_token_secret_);

        const assetData = await Video.Uploads.get(req.body.uploadId);
       

        if (assetData.status == 'asset_created') {
         
            // videoDetails.assetId = assetData.asset_id;
            const video = await Video.Assets.get(assetData.asset_id);
            if (video.status == 'ready') {
                let duration
                if (video.duration > 60) {
                    const min = Math.trunc(video.duration / 60);
                    const sec = Math.trunc((video.duration % 60)).toLocaleString('en-US', {
                        minimumIntegerDigits: 2,
                        useGrouping: false
                    });
                    duration = min + ":" + sec + " min";
                } else {
                    duration = Math.trunc(video.duration) + " sec";
                }
               

                const videoInfo: VideoInfo = {
                    videoTitle: req.body.name,
                    description: req.body.description,
                    assetId: video.id,
                    playbackId: video.playback_ids[0].id,
                    duration: duration,
                    createdAt: <any>new Date(<any>video.created_at * 1000)
                }
                const a = await uploadModel.create(videoInfo)
                return res.send({ success: true, data: { assetId: video.id, playbackId: video.playback_ids[0].id }, message: "video uploaded successfully" });
            }
        }
    } catch (err) {
      
        return res.send({
            success: "responseStatus.failure",
            data: { err },
            message: "err",
        })
    }
}

export const videoList = async (req: Request, res: Response) => {
    try {
        const rows = req.body.current * req.body.pageSize

        const list = await uploadModel.find({}).sort({ createdAt: -1 }).limit(req.body.pageSize).skip(rows);
        const totalVideo = await uploadModel.countDocuments({});
        return res.send({ success: true, data: { total: totalVideo, videoList: list }, message: "get video List successfully" });
    } catch (err) {
        return res.send({ success: false, data: {}, message: err })
    }
}
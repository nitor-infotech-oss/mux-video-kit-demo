import * as express from 'express';
import * as video from '../service/muxVideo'
export const registerRoutes = (app: express.Application) => {
    app.post('/createUrl', video.createUrl);
    app.post('/upload', video.upload);
    app.post('/videoList', video.videoList)
}

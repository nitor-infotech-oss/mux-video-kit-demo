import mongoose from 'mongoose'

const { Schema } = mongoose

const uploadSchema = new Schema({
    videoTitle: String,
    description: String,
    assetId: String,
    playbackId: String,
    duration: String,
    createdAt: Number
});

export default mongoose.model('uploadVideo', uploadSchema);
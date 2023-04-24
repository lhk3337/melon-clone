import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  playcount: { type: Number, default: 0 },
  title: { type: String, required: true },
  thumbUrl: { type: String, required: true },
  artist: { type: String, required: true },
  ytUrl: { type: String, required: true },
});

const Song = mongoose.model("Song", songSchema);

export default Song;

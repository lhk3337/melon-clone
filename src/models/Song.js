import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  playcount: { type: Number },
});

const Song = mongoose.model("Song", songSchema);

export default Song;

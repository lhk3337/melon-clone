import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 10 },
  playlists: [{ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Song" }],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);

export default User;

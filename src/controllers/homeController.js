import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;

  const toplists = await Song.find({}).sort({ playcount: -1 }).limit(30);
  const playlists = await User.findById(_id).populate("playlists").limit(30);

  const toplistsData = JSON.parse(JSON.stringify(toplists));
  const playlistData = JSON.parse(JSON.stringify(playlists));

  return res.render("home", { pageTitle: "Home", toplistsData, playlistData });
};

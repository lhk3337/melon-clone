import Song from "../models/Song";
import User from "../models/User";

export const top = async (req, res) => {
  try {
    const result = await Song.find({}).sort({ playcount: -1 });
    const songs = JSON.parse(JSON.stringify(result));
    return res.render("top", { pageTitle: "Cherry Top 100", songs });
  } catch (error) {
    console.log(error);
  }
};

export const lists = async (req, res) => {
  return res.render("playlists", { pageTitle: "playlist" });
};

export const playadd = async (req, res) => {
  // const { id } = req.body;
  // console.log(id);
  console.log(req.params);
  console.log(req.body);
  return res.end();
  // const isSong = await Song.findById(id);
  // console.log(isSong);

  // return res.send(req.params.id);
};

import request from "request";
import Song from "../models/Song";
import User from "../models/User";

export const top = async (req, res) => {
  try {
    const { loggedIn } = req.session;

    if (!loggedIn) {
      return res.redirect("/");
    }
    const result = await Song.find({}).sort({ playcount: -1 });

    const songs = JSON.parse(JSON.stringify(result));
    return res.render("top", { pageTitle: "Cherry Top 100", songs });
  } catch (error) {
    console.log(error);
  }
};

export const lists = async (req, res) => {
  const { loggedIn } = req.session;
  if (!loggedIn) {
    return res.redirect("/");
  }
  return res.render("playlists", { pageTitle: "playlist" });
};

export const playadd = async (req, res) => {
  const { loggedIn } = req.session;
  if (!loggedIn) {
    return res.redirect("/");
  }
  return res.send(req.params.id);
};

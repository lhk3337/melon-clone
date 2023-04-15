import request from "request";
import Song from "../models/Song";
import User from "../models/User";

export const top = async (req, res) => {
  try {
    const result = await Song.find({}).sort({ listners: -1 }).exec();
    const songs = JSON.parse(JSON.stringify(result));
    return res.render("top", { pageTitle: "Cherry Top 100", songs });
  } catch {
    return res.render("server-error");
  }
};

export const lists = async (req, res) => {
  return res.render("playlists", { pageTitle: "playlist" });
};

export const playadd = async (req, res) => {
  return res.send(req.params.id);
};

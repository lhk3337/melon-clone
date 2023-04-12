import request from "request";
import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const result = await Song.find({}).sort({ listners: -1 }).exec();
    const songs = JSON.parse(JSON.stringify(result));
    return res.render("home", { pageTitle: "Home", songs });
  } catch {
    return res.render("server-error");
  }
};

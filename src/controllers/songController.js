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

export const posthome = async (req, res) => {
  request(
    `https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=kpop&limit=50&api_key=${process.env.API_KEY}&format=json&period=7day`,
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body);
        const addDatas = data.tracks.track.map((v) => {
          return { ...v, listners: Math.floor(Math.random() * (1000 - 1) + 1) };
        });
        Song.collection.insertMany(addDatas);
      } else {
        console.log(error.message);
        res.status(500).send("Server Error");
      }
    }
  );
};

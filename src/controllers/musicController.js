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

export const addListnersCount = async (req, res) => {
  const {
    params: { id: musicId },
  } = req;

  const music = await Song.findById(musicId);
  if (!music) {
    return res.status(404);
  }

  const { playcount } = JSON.parse(JSON.stringify(music));

  await Song.findByIdAndUpdate(musicId, {
    playcount: playcount + 1,
  });
};
export const playlists = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  const playlists = await User.findById(_id).populate("playlists");
  if (!playlists) {
    return res.status(404);
  }
  const playlistData = JSON.parse(JSON.stringify(playlists));
  return res.render("playlists", { pageTitle: "playlist", playlistData });
};

export const addplaylist = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { id: musicId },
  } = req;

  const users = await User.findById(_id);
  const music = await Song.findById(musicId);
  const songs = JSON.parse(JSON.stringify(music));

  if (!music) {
    return res.sendstatus(400);
  }
  if (!users.playlists.includes(songs._id)) {
    await User.findByIdAndUpdate(_id, {
      playlists: [...users.playlists, { ...songs }],
    });
  }

  return res.end();
};
export const delplaylist = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    params: { id: musicId },
  } = req;
  await User.findByIdAndUpdate(_id, { $pull: { playlists: musicId } });
};

export const musicinfo = async (req, res) => {
  const {
    params: { id },
  } = req;
  const music = await Song.findById(id);
  await res.json({ data: music });
};

export const getAddSong = (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;
  if (_id === "643e54773567a45fb9343bd6") {
    res.render("addsong", { pageTitle: "Add Song" });
  } else {
    res.redirect("/");
  }
};
export const postAddSong = async (req, res) => {
  const { title, thumbUrl, artist, ytUrl } = req.body;
  try {
    await Song.create({
      title,
      thumbUrl,
      artist,
      ytUrl: ytUrl.split("=")[1],
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
  }
};

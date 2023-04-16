import User from "../models/User";
import bcrypt from "bcrypt";

export const getLogin = async (req, res) => {
  return res.render("login", { pageTitle: "LOG IN" });
};
export const postLogin = async (req, res) => {
  const { userid, password } = req.body;
  const pageTitle = "LOG IN";
  const user = await User.findOne({ userid });
  if (!user) {
    return res
      .status(400)
      .render("login", { pageTitle, errorMessage: "An account with this user id does not exists." });
  }
  const passwordWrong = await bcrypt.compare(password, user.password);
  if (!passwordWrong) {
    return res.status(400).render("login", { pageTitle, errorMessage: "Wrong password, Please enter it again." });
  }
  return res.redirect("/");
};

export const getJoin = async (req, res) => {
  return res.render("join", { pageTitle: "JOIN" });
};

export const postJoin = async (req, res) => {
  const { userid, password, password2 } = req.body;
  const pageTitle = "JOIN";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ userid });
  if (exists) {
    return res.status(404).render("join", {
      pageTitle,
      errorMessage: "This user ID is already taken.",
    });
  }
  try {
    await User.create({
      userid,
      password,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(404).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const logout = async (req, res) => {
  return res.send("logout");
};

export const home = async (req, res) => {
  const { loggedIn } = req.session;
  if (loggedIn) {
    return res.render("home", { pageTitle: "Home" });
  }
  return res.redirect("/login");
};

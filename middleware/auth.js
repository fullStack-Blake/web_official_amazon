const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    console.log("Session Created");
    next();
  } else {
    console.log("Session not created");
    res.redirect("/user/login");
  }
};

module.exports = isLoggedIn;

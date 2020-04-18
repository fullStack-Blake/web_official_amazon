const dashBoardLoader = (req, res) => {
  if (req.session.user.type == "Inventory Clerk") {
    res.redirect("/product/list");
  } else {
    res.render("userBoard");
  }
};

module.exports = dashBoardLoader;

const dashBoardLoader = (req, res) => {
  if (req.session.user.type == "Inventory Clerk") {
    res.redirect("/product/list");
  } else {
    console.log("userBoard");
    res.render("userBoard");
  }
};

module.exports = dashBoardLoader;

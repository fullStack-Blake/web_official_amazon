const express = require("express");
const router = express.Router();
const productModel = require("../models/product");
const cartModel = require("../models/cart");
const path = require("path");
const isAuthenticated = require("../middleware/auth");
const staticModel = require("../models/staticProducts");

router.get("/", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.bestSeller == true)
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            bestSeller: product.bestSeller,
            productPic: product.productPic,
            discount: (product.price * 0.8).toFixed(2)
          };
        else {
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            bestSeller: product.bestSeller,
            productPic: product.productPic
          };
        }
      });
      res.render("product", {
        title: "Product",
        heading: "mountains",
        products: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.get("/shoes", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.category == "shoes")
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            category: product.category,
            bestSeller: product.bestSeller,
            productPic: product.productPic
          };
      });
      res.render("product", {
        title: "Product",
        heading: "mountains",
        products: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.get("/valentines", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.category == "valentines")
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            category: product.category,
            bestSeller: product.bestSeller,
            productPic: product.productPic
          };
      });
      res.render("product", {
        title: "Product",
        heading: "mountains",
        products: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.get("/electronics", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.category == "electronics")
          return {
            id: product._id,
            productName: product.productName,
            price: (product.price * 1.2).toFixed(2),
            category: product.category,
            bestSeller: product.bestSeller,
            productPic: product.productPic,
            discount: product.price
          };
      });
      res.render("product", {
        title: "Product",
        heading: "mountains",
        products: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.get("/airpodcase", (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        if (product.category == "airpodcase")
          return {
            id: product._id,
            productName: product.productName,
            price: product.price,
            category: product.category,
            bestSeller: product.bestSeller,
            productPic: product.productPic
          };
      });
      res.render("product", {
        title: "Product",
        heading: "mountains",
        products: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.get("/add", isAuthenticated, (req, res) => {
  console.log("Add product");
  res.render("productAddForm");
});

router.post("/add", isAuthenticated, (req, res) => {
  const newProduct = {
    productName: req.body.productName,
    price: req.body.price,
    description: req.body.description,
    category: req.body.category,
    quantity: req.body.quantity,
    bestSeller: req.body.bestSeller,
    productPic: req.body.productPic
  };

  const product = new productModel(newProduct);
  product
    .save()
    .then(user => {
      req.files.productPic.name = `pro_pic_${product._id}${
        path.parse(req.files.productPic.name).ext
      }`;

      req.files.productPic
        .mv(`public/uploads/${req.files.productPic.name}`)
        .then(() => {
          productModel
            .updateOne(
              { _id: product._id },
              { productPic: req.files.productPic.name }
            )
            .then(() => {
              // Here
              res.redirect("/product/add");
            })
            .catch(err => {
              console.log(`Error when storing a path: ${err}`);
            });
        })
        .catch(err => console.log(`Error when inserting a file: ${err}`));
    })
    .catch(err =>
      console.log(
        `Error occured when inserting data into the product collection ${err}`
      )
    );
});

router.get("/list", isAuthenticated, (req, res) => {
  productModel
    .find()
    .then(products => {
      const filteredProduct = products.map(product => {
        return {
          id: product._id,
          productName: product.productName,
          price: product.price,
          description: product.description,
          category: product.category,
          quantity: product.quantity,
          bestSeller: product.bestSeller,
          productPic: product.productPic
        };
      });
      res.render("productBoard", {
        data: filteredProduct
      });
    })
    .catch(err => console.log(`Error when pulling products: ${err}`));
});

router.post("/search", (req, res) => {
  const searchBy = req.body.productSearch;

  if (searchBy == "all") res.redirect("/product");
  else if (searchBy == "Shoes") res.redirect("/product/shoes");
  else if (searchBy == "Valentines") res.redirect("/product/valentines");
  else if (searchBy == "Electronics") res.redirect("/product/electronics");
  else if (searchBy == "AirpodCase") res.redirect("/product/airpodcase");
});

router.get("/addcart/:id", isAuthenticated, (req, res) => {
  let productId = req.params.id;
  let cart = new cartModel(req.session.cart ? req.session.cart : {});

  productModel.findById(productId, function(err, product) {
    if (err) {
      return res.redirect("/");
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect("/product");
  });
});

router.post("/addcart/:id", isAuthenticated, (req, res) => {
  let productId = req.body.productId;
  let quantity = req.body.quantity;

  console.log(productId, quantity);

  let cart = new cartModel(req.session.cart ? req.session.cart : {});

  productModel.findById(productId, function(err, product) {
    if (err) {
      return res.redirect("/");
    }
    cart.add(product, product.id, quantity);
    req.session.cart = cart;

    console.log(req.session.cart);
    res.redirect("/product");
  });
});

router.get("/cart", isAuthenticated, (req, res) => {
  if (!req.session.cart) {
    return res.render("cart", { products: null });
  }
  let cart = new cartModel(req.session.cart);

  res.render("cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice.toFixed(2)
  });
});

router.get("/edit/:id", (req, res) => {
  productModel
    .findById(req.params.id)
    .then(product => {
      const {
        _id,
        productName,
        price,
        description,
        category,
        quantity,
        bestSeller,
        productPic
      } = product;
      res.render("productEditForm", {
        _id,
        productName,
        price,
        description,
        category,
        quantity,
        bestSeller,
        productPic
      });
    })
    .catch(err => console.log(`Error when find by id: ${err}`));
});

router.get("/remove/:id", function(req, res, next) {
  let productId = req.params.id;
  let cart = new cartModel(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;

  res.render("cart", {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice.toFixed(2)
  });
});

router.post("/place", isAuthenticated, (req, res) => {
  let carts = new cartModel(
    req.session.cart ? req.session.cart : res.redirect("/")
  );
  const { firstName, lastName, email } = req.session.user;

  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SEND_GRID_API_KEY);

  carts = carts.generateArray();

  let test = "";

  const total = req.session.cart.totalPrice.toFixed(2);

  carts.map(cart => {
    test +=
      cart.item.productName +
      "    " +
      cart.item.price +
      "    " +
      cart.qty +
      "    " +
      (cart.qty * cart.item.price).toFixed(2) +
      "<br>";
    const product = {
      productName: cart.item.productName,
      price: cart.item.price,
      description: cart.item.description,
      category: cart.item.category,
      quantity: cart.item.quantity - cart.qty,
      bestSeller: cart.item.bestSeller,
      productPic: cart.item.productPic
    };

    productModel
      .updateOne({ _id: cart.item._id }, product)
      .then(() => {
        const msg = {
          // to: `${email}`,
          to: `han.sangyeup@gmail.com`,
          from: `han.sangyeup@gmail.com`,
          subject: `Order Confirmation ${firstName}`,
          html: `
  <h2>Thank you for Shopping with us today! ${firstName} ${lastName}. <h2><br><br>
  <h3>Your Total Price is ${total}<h3><br><br>
  List is<br><br>
  ${test}<br><br>

  <strong>Have a great Day!</strong><br>
  `
        };

        sgMail
          .send(msg)
          .then(() => {
            console.log("Send Msg IS Fine");
            req.session.cart = {};
            res.redirect("/user/profile");
          })
          .catch(err => {
            console.log(`Error when redirect user: ${err}`);
          });
      })
      .catch(err => console.log(`Error when updating quantity: ${err}`));
  });
});

router.get("/profile/:id", (req, res) => {
  console.log("Until Here");
  productModel.findById(req.params.id).then(product => {
    const {
      _id,
      productName,
      price,
      description,
      category,
      quantity,
      bestSeller,
      productPic
    } = product;
    res.render("productDetail", {
      _id,
      productName,
      price,
      description,
      category,
      quantity,
      bestSeller,
      productPic
    });
  });
});

router.put("/update/:id", (req, res) => {
  const product = {
    productName: product.productName,
    price: product.price,
    description: product.description,
    category: product.category,
    quantity: product.quantity,
    bestSeller: product.bestSeller,
    productPic: product.productPic
  };
  productModel
    .updateOne({ _id: req.params.id }, product)
    .then(() => {
      res.redirect("/product/list");
    })
    .catch(err => console.log(`Error when updating: ${err}`));
});

router.delete("/delete/:id", (req, res) => {
  productModel
    .deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/product/list");
    })
    .catch(err => console.log(`Error when deleting data: ${err}`));
});

module.exports = router;

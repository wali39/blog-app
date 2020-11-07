const express = require("express");
const ejs = require("ejs");
// const mongoose = require("mongoose");
require("./db/mongoose");
const session = require("express-session");
const passport = require("passport");
const route = require("./router/route");
const {
  authentication,
  secureAuthentication,
} = require("./authentication/auth");
// const Blog = require("./models/Blog");
const User = require("./models/user");
const control = require("./controller/control");
const flash = require("connect-flash");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./public/template/views");
app.use(express.static("./public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);

// for passport and passport local

app.use(
  session({
    secret: "magic",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user || null;

  next();
});
app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_message = req.flash("success_message");
  res.locals.error_message = req.flash("error_message");
  res.locals.error = req.flash("error");
  next();
});
// root directory redirect to blog directory
app.get("/", (req, res) => {
  res.redirect("/addblogs");
});

app.use(route);

app.get("/about", (req, res) => {
  res.render("contact", {
    title: "About Us",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
  });
});

app.post("/register", (req, res) => {
  const user = new User(req.body);

  const f = /\S+@\S+\.\S+/;

  if (!user.email || !user.name || !user.password) {
    var err = "please fill all the field...";
    res.render("register", {
      err,
      title: "Register",
    });
  } else if (user.password.length < 6) {
    var err = "minimum password length 6...";
    res.render("register", {
      err,
      title: "Register",
    });
  } else if (!f.test(user.email)) {
    var err = "email is invalid...";
    res.render("register", {
      err,
      title: "Register",
    });
  } else {
    user
      .save()
      .then((result) => {
        req.flash("success_message", "registered success..");
        res.redirect("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

// login code
app.get("/login", (req, res) => {
  res.render("login", {
    title: "login",
  });
});

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});
app.post("/login", async (req, res, next) => {
  try {
    // console.log(user);

    await passport.authenticate("local", {
      failureRedirect: "/login",
      successRedirect: "/profile",
      failureFlash: true,
    })(req, res, next);
  } catch (error) {
    res.redirect("404");
  }
});

app.get("/profile", secureAuthentication, function (req, res) {
  res.render("profile", {
    user: req.user,
    title: "Profile",
  });
});

app.use((req, res) => {
  res.render("404", {
    title: "404",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server started on port " + port);
});

const express = require("express");
// const ejs = require("ejs");
// require("./db/mongoose");
const app = express();

// app.get("/register", (req, res) => {
//   res.render("register", { title: "Register" });
//   res.redirect("/");
// });

const a = async () => {
  const bcrypt = require("bcrypt");
  const pass = "wert123";
  const ph = await bcrypt.hash(pass, 10);
  console.log(ph);
};
a();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server started ${port}`);
});

// const bcrypt = require("bcrypt");
// const pass = "wert123";
// const ph = await bcrypt.hash(pass, 10);
// console.log(ph);

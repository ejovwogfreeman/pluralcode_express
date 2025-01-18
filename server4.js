const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static('public'));

const blogs = [
    { id: 1, title: "First post" },
    { id: 2, title: "Second post" },
    { id: 3, title: "Third post" },
  ];
  
app.get("/", (req, res) => {
  res.render("index", { title: "Home page", message: "welcome to home page", blogs:blogs });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    message: "welcome to about page",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact page",
    message: "welcome to contact page",
  });
});

app.get("/services", (req, res) => {
  res.render("services", {
    title: "Services page",
    message: "welcome to services page",
  });
});

app.listen(8000, () => console.log(`Server started at port 8000`));

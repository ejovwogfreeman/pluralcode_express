require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// inbuilt body parser middleware
app.use(express.json());

// custom middleware to log request methods and route
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
});

const blogs = [
  { id: 1, title: "First post" },
  { id: 2, title: "Second post" },
  { id: 3, title: "Third post" },
];

// get all blogs
app.get("/api/blogs", (req, res) => {
  res.status(200).json(blogs);
});

// get a single blog by id
app.get("/api/blog/:id", (req, res) => {
  const id = req.params.id;
  const blog = blogs.find((blog) => blog.id === parseInt(id));
  if (!blog) {
    return res.status(400).json({ message: "blog not found" });
  }
  res.status(200).json(blog);
});

// add a blog
app.post("/api/blog", (req, res) => {
  const title = req.body.title;
  const id = blogs.length + 1;

  if (!title) {
    return res.status(400).json({ message: "please enter a title" });
  }

  const blog = { id, title };

  blogs.push(blog);

  res.status(200).json(blogs);
});

// update a blog
app.put("/api/blog/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;

  let blog = blogs.find((blog) => blog.id === parseInt(id));

  if (!blog) {
    return res.status(400).json({ message: "blog not found" });
  }

  if (!title) {
    return res.status(400).json({ message: "please enter a title" });
  }

  blog.title = title;
  res.status(400).json(blog);
});

// delete a blog
app.delete("/api/blog/:id", (req, res) => {
  const id = req.params.id;
  let blogIndex = blogs.findIndex((blog) => blog.id === parseInt(id));
  if (blogIndex === -1) {
    return res.status(400).json({ message: "blog not found" });
  }
  blogs.splice(blogIndex, 1);
  res.status(200).json(blogs);
});

app.listen(port, () => console.log(`Server started at port ${port}`));

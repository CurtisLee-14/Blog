import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let blogPosts = [
    {id: 1, title: "First Blog Post", content: "This is my first blog post! It is being used as an example for future refereances. This is a terrible example of a good blog post. It serves its point well though! What a fantastic time to be writing an example blog post. Whoopie!", author: "Curtis Antisdel"}
];

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", { blogPosts });
});

app.get("/post/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = blogPosts.find((post) => post.id === postId);
    const cssFilePath = `/styles/post${postId}.css`;

    res.render("post.ejs", { post, cssFilePath });
});

app.get("/compose", (req, res) => {
    res.render("compose.ejs");
});

app.get("/back", (req, res) => {
    res.render("index.ejs", { blogPosts });
});

app.post("/compose", (req, res) => {
    const { title, content, author } = req.body;

    const newPostId = blogPosts.length + 1;

    blogPosts.push({ id: newPostId, title, content, author });

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  
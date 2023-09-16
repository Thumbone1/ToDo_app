import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let dailyTodos = [];
let workTodos = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { dailyTodos });
});

app.get("/work", (req, res) => {
  res.render("work.ejs", { workTodos });
});

app.post("/", (req, res) => {
  try {
    const newTodo = req.body.newTodo;
    if (newTodo) {
      dailyTodos.push(newTodo);
    }
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.render("error.ejs");
  }
});

app.post("/work", (req, res) => {
  try {
    const newWorkTodo = req.body.newWorkTodo;
    if (newWorkTodo) {
      workTodos.push(newWorkTodo);
    }
    res.redirect("/work");
  } catch (err) {
    console.log(err);
    res.redirect("error.ejs");
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let dailyTodos = [];
let workTodos = [];

app.use(express.static("public"));
app.use(express.static("css"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { dailyTodos }); 
});

app.get("/work", (req, res) => {
  res.render("work.ejs", { workTodos });
});

app.post("/", (req, res) => {
  const newTodo = req.body.newTodo;
  if (newTodo) {
    dailyTodos.push(newTodo);
  }
  res.redirect("/");
});

app.post("/work", (req, res) => {
  const newWorkTodo = req.body.newWorkTodo;
  if (newWorkTodo) {
    workTodos.push(newWorkTodo);
  }
  res.redirect("/work");
});

app.listen(port, () => console.log(`Listening on port ${port}`));

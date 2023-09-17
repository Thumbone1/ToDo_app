import express from "express";
import bodyParser from "body-parser";
import {
  addTodo,
  getTodos,
  connectToDatabase,
  deleteTodo,
  List
} from "./database.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

connectToDatabase();

app.get("/", async (req, res) => {
  const todaysItems = await getTodos();

  console.log(todaysItems);
  res.render("index.ejs", { todaysItems });
});

app.get("/:customListName", async (req, res) => {
  const someName = req.params.customListName;
  
})

app.post("/", async (req, res) => {
  try {
    if (req.body.newTodo) {
      const newTodo = req.body.newTodo;

      await addTodo(newTodo);
    }

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.render("error.ejs");
  }
});

app.post("/delete", async (req, res) => {
  try {
    const todotodelete = req.body.checkbox;
    await deleteTodo(todotodelete);

    res.redirect("/");
  } catch (error) {
    console.error("Error deleting list item:", error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

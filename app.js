import express from "express";
import bodyParser from "body-parser";
import {
  connectToDatabase,
  deleteTodo,
  createList,
  databaseExists,
  addItemToList,
  getList,
} from "./database.js";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

connectToDatabase();

app.get("/Home", async (req, res) => {
  if (await databaseExists("Home")) {
    let foundList = await getList("Home");
    let listItems = foundList.items;
    res.render("index.ejs", { listTitle: foundList.name, listItems });
  } else {
    await createList("Home");
    res.redirect("/Home");
  }
});

app.get("/Home/:customListName", async (req, res) => {
  const customListName =
    req.params.customListName[0].toUpperCase() +
    req.params.customListName.slice(1);

  if (await databaseExists(customListName)) {
    let foundList = await getList(customListName);
    let listItems = foundList.items;
    res.render("index.ejs", { listTitle: foundList.name, listItems });
  } else {
    await createList(customListName);
    res.redirect(`/Home/${customListName}`);
  }
});

app.post("/", async (req, res) => {
  let itemName = req.body.newItem;
  let listName = req.body.listTitle;

  addItemToList(listName, itemName);

  if (listName === "Home") {
    res.redirect("/Home");
  } else {
    res.redirect(`/Home/${listName}`);
  }
});

app.post("/delete", async (req, res) => {
  try {
    let itemToDelete = req.body.checkbox;
    let listName = req.body.listTitle;

    deleteTodo(listName, itemToDelete);

    if (listName === "Home") {
      res.redirect("/Home");
    } else {
      res.redirect(`/Home/${listName}`);
    }
  } catch (error) {
    console.error("Error deleting list item:", error);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));

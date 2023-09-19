import { Schema, model, mongoose } from "mongoose";

mongoose.set("strictQuery", false);

const todolistDB = "mongodb://127.0.0.1/todolistDB";
const ItemSchema = new Schema({
  name: String,
});
const ListSchema = new Schema({
  name: String,
  items: [ItemSchema],
});
const Item = model("Item", ItemSchema);
const List = model("List", ListSchema);

export async function connectToDatabase() {
  try {
    await mongoose.connect(todolistDB);
    console.log("Successfully connected to database");
  } catch (error) {
    console.error("An error occured while connecting to DB:", error);
  }
}

export async function databaseExists(dbName) {
  try {
    if (await List.findOne({ name: dbName })) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Could not check if database exists:", error);
  }
}

export async function createList(listName) {
  try {
    const list = new List({
      name: listName,
      items: [],
    });
    await list.save();
  } catch (error) {
    console.error(
      `An error occured while trying to create ${listName}:`,
      error
    );
  }
}

export async function getList(listName) {
  try {
    const foundList = List.findOne({ name: listName }).exec();
    return foundList;
  } catch (error) {
    console.error(
      "The app encountered an error while searching for the list:",
      error
    );
  }
}

export async function addItemToList(listName, itemName) {
  const newItem = new Item({
    name: itemName,
  });

  try {
    const currentList = await getList(listName);
    currentList.items.push(newItem), currentList.save();
  } catch (error) {
    console.error("The app encountered a DB error:", error);
  }
}

export async function deleteTodo(listName, itemId) {
  try {
    await List.updateOne(
      { name: listName },
      { $pull: { items: { _id: itemId } } }
    );

    console.log("deleted element");
  } catch (error) {
    console.error("Could not delete:", error);
  }
}

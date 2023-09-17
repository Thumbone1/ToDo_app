import { Schema, model, mongoose } from "mongoose";

//to get rid of prepatory warnings for mongoose 7
// opts into filtering by properties that aren't in the schema
mongoose.set("strictQuery", false);

// Define the database URL to connect to:
const todolistDB = "mongodb://127.0.0.1/todolistDB";

// create new Schema for main list
const TodoSchema = new Schema({
  name: String,
});

// create a general schema for custom list names
const ListSchema = new Schema({
  name: String,
  item: [TodoSchema],
});

// create new model
const Todo = model("Todo", TodoSchema);
export const List = model("List", ListSchema);

/**
 * connects to db.
 * throws error if failure to connect
 */
export async function connectToDatabase() {
  try {
    await mongoose.connect(todolistDB);
    console.log("Successfully connected to database");
  } catch (error) {
    console.error("An error occured while connecting to DB:", error);
  }
}

/**
 *
 * @returns Promise to return array of names from Todos collection
 */
export async function getTodos() {
  try {
    console.log("getting items from the DB");
    const items = [];
    const todosFromDB = await Todo.find({});
    todosFromDB.forEach((item) => items.push(item));
    return items;
  } catch (error) {
    console.error("The app encountered an error:", error);
  }
}

/**
 * @param {newTodo} todoString
 * Should save todo items to the Todos collection
 */
export async function addTodo(todoString) {
  try {
    const newDBItem = new Todo({
      name: todoString,
    });
    try {
      await newDBItem.save();
    } catch (error) {
      console.error("Didn't save to database due to error:", error);
    }

    console.log(`Added ${todoString} to database`);
  } catch (error) {
    console.error("The app encountered a DB error:", error);
  }
}

export async function deleteTodo(todoId) {
  try {
    await Todo.deleteOne({ _id: todoId });
    console.log("deleted element");
  } catch (error) {
    console.error("Could not delete:", error);
  }
}

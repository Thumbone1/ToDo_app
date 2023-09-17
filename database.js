import { Schema, model, mongoose } from "mongoose";

//to get rid of prepatory warnings for mongoose 7
// opts into filtering by properties that aren't in the schema
mongoose.set("strictQuery", false);

// Define the database URL to connect to:
const todolistDB = "mongodb://127.0.0.1/todolistDB";

// create new Schema for todo list
const TodoSchema = new Schema({
  name: String,
});

// create new model
const Todo = model("Todo", TodoSchema);

export async function getTodos() {
  try {
    await mongoose.connect(todolistDB);
    console.log("Connection to DB established.");

    console.log("getting items from the DB");
    const items = [];
    const todosFromDB = await Todo.find({});
    todosFromDB.forEach((item) => items.push(item.name));
    return items;
  } catch (error) {
    console.error("The app encountered an error:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Connection to DB closed.");
  }
}

export async function addTodo(todoString) {
  try {
    await mongoose.connect(todolistDB);
    console.log("Connection to DB established.");

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
  } finally {
    await mongoose.connection.close();
    console.log("Connection to DB closed.");
  }
}

export async function deleteTodo(todoString) {
  return;
}

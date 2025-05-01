import Todo from "../models/todo.models.js";

// CREATE
export const createTodo = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const userId = req.user?._id;

    // Basic validation
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'text' field" });
    }

    if (!userId) {
      return res.status(400).json({ error: "Missing user information" });
    }

    const newTodo = new Todo({ text, completed, user: userId });
    const savedTodo = await newTodo.save();

    return res.status(201).json({
      message: "Todo created successfully",
      todo: savedTodo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
};

// READ (Get all todos for logged-in user)
export const getTodos = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ error: "Missing user information" });
    }

    const todos = await Todo.find({ user: userId });

    return res.status(200).json({ todos });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
};

// UPDATE (only if todo belongs to user)
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    const userId = req.user?._id;

    const todo = await Todo.findOne({ _id: id, user: userId });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found or unauthorized" });
    }

    // Apply updates if fields are provided
    if (typeof text !== "undefined") todo.text = text;
    if (typeof completed !== "undefined") todo.completed = completed;

    const updatedTodo = await todo.save();

    return res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
};

// DELETE (only if todo belongs to user)
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found or unauthorized" });
    }

    return res.status(200).json({
      message: "Todo deleted successfully",
      todo: deletedTodo,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
};

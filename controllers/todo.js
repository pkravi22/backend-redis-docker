import todo from "../model/todo.js";

export const createTodo = async (req, res) => {
  try {
    const data = req.body;
    const newTodo = await todo.create(data);
    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (err) {
    console.log("Error while creating todo", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { todoId } = req.params;
    console.log("tdoid", req.params);
    const { title, content } = req.body;

    // Find the todo by ID
    const existingTodo = await todo.findById(todoId);
    if (!existingTodo) {
      return res.status(404).json({
        success: false,
        message: "No todo found with this ID",
      });
    }

    // Update the todo
    const updatedTodo = await todo.findByIdAndUpdate(
      todoId,
      { title, content },
      { new: true } // returns updated document
    );

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getALlTodo = async (_, res) => {
  try {
    const todos = await todo.find();
    return res.status(200).json({
      success: true,
      message: "todo fetched successfully",
      todos: todos,
    });
  } catch (e) {
    res.staus(500).json({ message: "INternal error" });
  }
};

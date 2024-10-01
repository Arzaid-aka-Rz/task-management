import { Task } from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, status,completed  } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({success: false, message: "Title is required!" });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({ success: false,message: "Description is required!" });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      completed: completed !== undefined ? completed : false,  
      user: req.id,
    });

    await task.save();

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.log("Error in createTask: ", error.message);
    res.status(500).json({ success: false, message: "Server Error: " + error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({success: false, message: "User not found!" });
    }

    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully!",
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error in getTasks: ", error.message);
    res.status(500).json({ success: false,message: "Server Error: " + error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a task ID" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found!" });
    }

    // Check if the task belongs to the user
    if (!task.user.equals(userId)) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized to view this task" });
    }
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.log("Error in getTask: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error: " + error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a task ID" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found!" });
    }

    // Check if the task belongs to the user
    if (!task.user.equals(userId)) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized to view this task" });
    }

    const { title, description, dueDate, priority, status, completed } =
      req.body;

    //update the task with new data if provided or keep the old data
    if (title) task.title = title;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (priority) task.priority = priority;
    if (status) task.status = status;
    if (completed !== undefined) task.completed = completed;

    await task.save();

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.log("Error in updateTask: ", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server Error: " + error.message });
  }
};


export const deleteTask = async (req, res) => {
    try {
      const userId = req.id;
      if (!userId) {
        return res
          .status(400)
          .json({ success: false, message: "User not found" });
      }
  
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ success: false, message: "Please provide a task ID" });
      }
  
      const task = await Task.findById(id);
      if (!task) {
        return res
          .status(404)
          .json({ success: false, message: "Task not found!" });
      }
  
      // Check if the task belongs to the user
      if (!task.user.equals(userId)) {
        return res
          .status(401)
          .json({ success: false, message: "Not authorized to view this task" });
      }
  
      await Task.findByIdAndDelete(id);
      return res.status(200).json({success: true,message:"Task deleted successfully!"});
     
    } catch (error) {
      console.log("Error in deleteTask: ", error.message);
      res
        .status(500)
        .json({ success: false, message: "Server Error: " + error.message });
    }
  };
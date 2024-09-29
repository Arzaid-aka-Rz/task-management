import express from "express";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/task.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/create",isAuthenticated ,createTask);
router.get("/get-tasks",isAuthenticated,getTasks);
router.get("/get-task/:id",isAuthenticated,getTask);
router.put("/update/:id",isAuthenticated,updateTask);
router.delete("/delete/:id",isAuthenticated,deleteTask);


export default router;

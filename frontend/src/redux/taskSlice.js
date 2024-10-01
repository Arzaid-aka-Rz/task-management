import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    task: {},
    priority: "all",
    isEditing: false,
    modalMode: "",
    activeTask:null,
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task._id === action.payload._id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setModalMode: (state, action) => {
      state.modalMode = action.payload;
    },
    setActiveTask: (state, action) => {
      state.activeTask = action.payload;
    },
  },
});

export const {
  setTasks,
  setTask,
  addTask,
  updateTask,
  deleteTask,
  setPriority,
  setIsEditing,
  setModalMode,
  setActiveTask
} = taskSlice.actions;
export default taskSlice.reducer;

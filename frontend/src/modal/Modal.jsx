import useDetectOutside from "@/hooks/useDetectOutside";
import { setLoading } from "@/redux/authSlice";
import { addTask, setIsEditing, setModalMode, setTask, setTasks } from "@/redux/taskSlice";
import { TASK_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useRef } from "react";


import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const Modal = () => {
  const ref =useRef(null);
  const dispatch = useDispatch();
  const { tasks,task,isEditing,modalMode,activeTask } = useSelector((store) => store.task);

  const handleInput = (name) => (e) => {
    let value = e.target.value;
  
    // Convert string "true"/"false" to boolean for the completed field
    if (name === "completed") {
      value = value === "true"; // Ensures it's a boolean
    }
  
    dispatch(setTask({ ...task, [name]: value }));
  };

  
  
  const createTask = async (task) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${TASK_API_END_POINT}/create`,
        task,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

    //   console.log("Task created", response.data.task);
      dispatch(addTask(response.data.task));
      toast.success("Task created successfully");

      closeModal();
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };


  const updateTask = async (task) => {
  
    try {
      dispatch(setLoading(true));
      const response = await axios.put(`${TASK_API_END_POINT}/update/${task._id}`, task,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);
      // update the task in the tasks array
      const newTasks = tasks.map((tsk) => {
        return tsk._id === response.data.task._id ? response.data.task : tsk;
      });


      toast.success("Task updated successfully");

      dispatch(setTasks(newTasks));
      closeModal();
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.log(error);
    }

      finally {
      dispatch(setLoading(false));
    }
    
  };


  const closeModal=()=>{
    dispatch(setIsEditing(false));
    dispatch(setTask({}));
    dispatch(setModalMode(""));
  }
  

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (modalMode === "edit") {
      updateTask(task);
    } else if (modalMode === "add") {
      createTask(task);
    }
  };

  // Use the hook to detect clicks outside the modal
  useDetectOutside({
    ref,
    callback: () => {
      if (isEditing) {
        closeModal(); // Close modal if it is in add/edit mode
      }
    },
  });

  useEffect(()=>{
    if (modalMode === "edit" && activeTask) {
      dispatch(setTask(activeTask));
    }
  }, [modalMode, activeTask]);
 

  return (
    <div className="fixed left-0 top-0 z-50 h-full w-full bg-[#333]/30 overflow-hidden">
      <form
        className="py-5 px-6 max-w-[520px] w-full flex flex-col gap-3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md"
        onSubmit={formSubmitHandler}
        ref={ref}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="title">Title</label>
          <input
            className="bg-[#F9F9F9] p-2 rounded-md border"
            type="text"
            id="title"
            placeholder="Task Title"
            name="title"
            value={task?.title}
            onChange={(e) => handleInput("title")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            className="bg-[#F9F9F9] p-2 rounded-md border resize-none"
            name="description"
            placeholder="Task Description"
            rows={4}
            value={task.description}
            onChange={(e) => handleInput("description")(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority">Select Priority</label>
          <select
            className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
            name="priority"
            value={task.priority}
            onChange={(e) => handleInput("priority")(e)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="dueDate">Due Date</label>
          <input
            className="bg-[#F9F9F9] p-2 rounded-md border"
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={(e) => handleInput("dueDate")(e)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="completed">Task Completed</label>
          <div className="flex items-center justify-between bg-[#F9F9F9] p-2 rounded-md border">
            <label htmlFor="completed">Completed</label>
            <div>
              <select
                className="bg-[#F9F9F9] p-2 rounded-md border cursor-pointer"
                name="completed"
                value={task.completed ? "true" : "false"}
                onChange={(e) => handleInput("completed")(e)}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className={`text-white py-2 rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out ${
              modalMode === "edit" ? "bg-blue-400" : "bg-green-400"
            }`}
          >
            {modalMode === "edit" ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;

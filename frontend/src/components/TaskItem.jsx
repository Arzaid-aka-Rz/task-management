import { setLoading } from "@/redux/authSlice";
import { setActiveTask, setIsEditing, setModalMode, setTask } from "@/redux/taskSlice";
import { item } from "@/utils/animations";
import { TASK_API_END_POINT } from "@/utils/constant";
import { formatTime } from "@/utils/utilities";
import axios from "axios";
import { motion } from "framer-motion";
import { EditIcon, Star, Trash } from "lucide-react";
import { useDispatch } from "react-redux";

const TaskItem = ({ task }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-red-500";
    }
  };

  const dispatch = useDispatch();

  // get task
  const getTask = async (taskId) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(`${TASK_API_END_POINT}/get-task/${taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(response);
      dispatch(setTask(response.data.task));

    } catch (error) {
      console.log("Error getting task", error);
    }
    finally{
      dispatch(setLoading(false));
    }
    
  };

  const openModalForEdit = (task)=>{
    dispatch(setModalMode("edit"));
    dispatch(setIsEditing(true));
    dispatch(setActiveTask(task));
  }


  return (
    <motion.div
      className="h-[16rem] px-4 py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] rounded-lg border-2 border-white"
      variants={item}
    >
      <div>
        <h4 className="font-bold text-2xl">{task.title}</h4>
        <p>{task.description}</p>
      </div>

      <div className="mt-auto flex justify-between items-center">
        <p className="text-sm text-gray-400">{formatTime(task.createdAt)}</p>
        <p className={`text-base font-bold ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </p>

        <div>
          <div className="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            <button>
              <Star
                className={`fill-current ${
                  task.completed === true ? "text-yellow-400" : "text-gray-400"
                }`}
              />
            </button>

            <button
            onClick={()=>{
              getTask(task._id);
              openModalForEdit(task);
            }}

            >
              <EditIcon className="text-[#00A1F1]  " />
            </button>

            <button>
              <Trash className=" text-[#F65314] " />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;

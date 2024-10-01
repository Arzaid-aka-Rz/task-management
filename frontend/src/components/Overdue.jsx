import { setLoading } from "@/redux/authSlice";
import { setIsEditing, setModalMode, setPriority, setTask, setTasks } from "@/redux/taskSlice";
import { TASK_API_END_POINT } from "@/utils/constant";
import { filteredTasks, overdueTasks } from "@/utils/utilities";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import TaskItem from "./TaskItem";
import { container, item } from "@/utils/animations";
import Filters from "./Filters";

const Overdue = () => {

  const { tasks } = useSelector((store) => store.task);
  const { user } = useSelector((store) => store.auth);
  const userId = user?._id;
  const dispatch = useDispatch();


  const getTasks = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`${TASK_API_END_POINT}/get-tasks`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      dispatch(setTasks(response.data.tasks));
    } catch (error) {
      console.log("Error getting tasks:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const { priority } = useSelector((store) => store.task);

  const overdue = overdueTasks(tasks);

  const filtered = filteredTasks(overdue , priority);

  const openModalForAdd = ()=>{
    dispatch(setModalMode("add"));
    dispatch(setIsEditing(true));
    dispatch(setTask({}));
  }


  useEffect(() => {
    if (userId) {
      getTasks();
      // getTask(66f8b21788caf38ad3282da7);
    }
  }, [userId]);

  useEffect(() => {
    dispatch(setPriority("all"));
  }, []);


  return (
    <div className="main-layout  flex-1 bg-[#EDEDED] border-2 border-white rounded-[1.5rem] overflow-auto  h-[40rem]">
    <main className="m-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Completed Tasks</h1>
        <Filters />
      </div>

      <motion.div
        className="pb-[2rem] mt-6 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[1.5rem]"
        variants={container}
        initial="hidden"
        animate="visible"
      >

        
        {filtered.map((task, i) => (
          <TaskItem key={i} task={task} />
        ))}


        <motion.button
          className="h-[16rem] w-full py-2 rounded-md text-lg font-medium text-gray-500 border-dashed border-2 border-gray-400
        hover:bg-gray-300 hover:border-none transition duration-200 ease-in-out"
          variants={item}
          onClick={openModalForAdd}
        >
          Add New Task
        </motion.button>

      </motion.div>
    </main>
  </div>
  )
}

export default Overdue

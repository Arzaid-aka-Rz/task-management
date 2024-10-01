import { setIsEditing, setModalMode, setTask } from "@/redux/taskSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const {tasks} = useSelector(store=>store.task);
  const activeTasks = tasks.filter((task) => !task.completed);
  const dispatch = useDispatch();
  const openModalForAdd = ()=>{
    dispatch(setModalMode("add"));
    dispatch(setIsEditing(true));
    dispatch(setTask({}));
  }
  return (
    <header className="bg-[#f9f9f9]">
      <div className="px-6 my-3 w-full flex items-start justify-between ">
        <div>
          <h1 className="text-2xl uppercase font-bold">
            <span>Welcome to Task Flow</span>
          </h1>

          <p className="text-base">
            You have{" "}
            <span className="font-bold text-[#3aafae]">
              {activeTasks.length}
            </span>
            &nbsp;active tasks
          </p>
        </div>

        <div className="flex gap-10 items-center">
          <div className="h-[60px] flex items-center gap-[10.4rem]">
            <button
              className="px-8 py-3 bg-[#3aafae] text-white rounded-[50px]
           hover:bg-[#00A1F1] hover:text-white transition-all duration-200 ease-in-out"
           onClick={()=>{
            openModalForAdd();
           }}
            >
              Add a new Task
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

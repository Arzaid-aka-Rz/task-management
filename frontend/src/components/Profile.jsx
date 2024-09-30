import { Code } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setIsLoggedIn, setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${USER_API_END_POINT}/logout`,{
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );

      if (response.data.success) {
        dispatch(setUser(null));
        dispatch(setIsLoggedIn(false));

        toast.success(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.log(error);
    }
  };

  return (
    <div className="m-6">
      <div
        className="px-2 py-4 flex items-center gap-5 bg-[#E6E6E6]/20 rounded-[0.8rem]
        hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-2 hover:border-white"
      >
        <div>
          <Code size={45} />
        </div>
        <div>
          <h1 className="flex flex-col text-xl">
            <span className=" font-medium">Hello,</span>
            <span className="font-bold">{user?.fullname}</span>
          </h1>
        </div>
      </div>

      <Button
        className=" w-full mt-4 bg-[#EB4E31] text-white rounded-[50px] hover:bg-[#3aafae] transition duration-200 ease-in-out"
        onClick={logoutHandler}
      >
        Sign Out
      </Button>

      <div className="mt-6 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-400">
            <p>Total Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-41%] bg-purple-500 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {/* {tasks.length} */} 10
              </span>
            </p>
          </div>

          <div className="text-gray-400">
            <p>In Progress:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-41%] bg-[#3AAFAE] rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {/* {activeTasks.length} */} 5
              </span>
            </p>
          </div>

          <div className="text-gray-400">
            <p>Open Tasks:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-41%] bg-orange-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {/* {activeTasks.length} */}4
              </span>
            </p>
          </div>

          <div className="text-gray-400">
            <p>Completed:</p>
            <p className="pl-4 relative flex gap-2">
              <span className="absolute h-[70%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-41%] bg-green-400 rounded-[5px]"></span>
              <span className="font-medium text-4xl text-[#333]">
                {/* {completedTasks.length} */}7
              </span>
            </p>
          </div>
        </div>
      </div>

      <h3 className="mt-8 font-medium">Activity</h3>
    </div>
  );
};

export default Profile;

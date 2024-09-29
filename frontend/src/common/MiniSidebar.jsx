
import {
  Home,
  Clock,
  Trash,
  Code,
  ClipboardCheck,
  CalendarArrowDown,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom"; 

const MiniSidebar = () => {
  const location = useLocation(); 

  const getStrokeColor = (link) => {
    return location.pathname === link ? "#3aafae" : "#71717a"; 
  };

  const navItems = [
    {
      icon: <Home size={32} color={getStrokeColor("/")} />, 
      title: "All",
      link: "/",
    },
    {
      icon: <ClipboardCheck size={32} color={getStrokeColor("/completed")} />, 
      title: "Completed",
      link: "/completed",
    },
    {
      icon: <CalendarArrowDown size={32} color={getStrokeColor("/pending")} />,
      title: "Pending",
      link: "/pending",
    },
    {
      icon: <Clock size={32} color={getStrokeColor("/overdue")} />,
      title: "Overdue",
      link: "/overdue",
    },
  ];

  return (
    <div className="basis-[5rem] flex flex-col bg-[#f9f9f9] h-screen">
      <div className="flex items-center justify-center h-[5rem]">
        <Link to="/"><Code size={40} /></Link>
      </div>

      <div className="mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10 mb-auto">
          {navItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link to={item.link}>{item.icon}</Link>

              {/* Hover Tooltip */}
              <span className="u-triangle absolute top-[50%] translate-y-[-50%] left-10 text-xs pointer-events-none text-white bg-[#3aafae] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.title}
              </span>
            </li>
          ))}
        </ul>

        <div className="mb-4">
          <button className="w-12 h-12 flex justify-center items-center border-2 border-[#EB4E31] p-2 rounded-full">
            <Trash color="#EB4E31" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MiniSidebar;

import Header from "@/common/Header";
import MiniSidebar from "@/common/MiniSidebar";
import Sidebar from "@/common/Sidebar";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-full flex overflow-hidden">
      {/* LeftSideBar */}
      <MiniSidebar />

      <div className="flex-1 h-full flex flex-col">
        <Header />
        <div className="pr-[20rem] pb-[1.5rem] flex h-full ">

          <Outlet />
          {/* RightSideBar */}
          <Sidebar />
          
        </div>
      </div>
    </div>
  );
};

export default Layout;

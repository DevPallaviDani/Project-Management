import { Link } from "react-router-dom";
import {
  LucideSidebar,
  Home,
  LucideSettings,
  SidebarClose,
  SidebarOpen,
} from "lucide-react";
import { FaTasks } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { useState } from "react";
import profile from "../../assets/images/profileavatar.png";
import logo from "../../assets/images/klogo.png";
import SidebarItem from "../UI/SideBarItem.jsx";
import { SlCalender } from "react-icons/sl";
import ToggleTheme from "../UI/ToggleTheme";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div
        className={`hidden h-screen md:block flex-shrink-0  p-2 transition-all duration-300  
      rounded-xl bg-white dark:bg-[#1c253b] shadow-lg  ${isCollapsed ? "w-20 " : "w-64"} 
   rounded-tr-3xl rounded-br-3xl `}
      >
        {/* Logo + Sidebar Toggle */}
        <div className="group relative flex items-center justify-between mt-5 mb-10">
          {/* <SiTask size={30} className="ml-3" /> */}
          <img
            src={logo}
            alt="logo"
            className={`w-12 h-10 cursor-pointer 
              ${isCollapsed ? "group-hover:opacity-0" : "group-hover:opacity-100"}`}
            onClick={() => setIsCollapsed((prev) => !prev)}
          />

          {/* Toggle Icon (only when sidebar open) */}
          {isCollapsed ? (
            <>
              <SidebarOpen
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="absolute left-1 
               cursor-pointer text-gray-400
               opacity-0 group-hover:opacity-100
              hover:shadow-md "
                size={30}
              />
              <span
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2
               whitespace-nowrap rounded-lg px-3 py-1
               text-lg text-white bg-gray-800 shadow-lg
               opacity-0 group-hover:opacity-100
               transition duration-200 pointer-events-none"
              >
                {isCollapsed ? "Open Sidebar" : "Close Sidebar"}
              </span>
            </>
          ) : (
            <>
              <SidebarClose
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="
               cursor-pointer text-gray-400
               transition duration-200"
                size={30}
              />
              <span
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2
               whitespace-nowrap rounded-lg px-3 py-1
               text-lg text-white bg-gray-800 shadow-lg
               opacity-0 group-hover:opacity-100
               transition duration-200 pointer-events-none"
              >
                {isCollapsed ? "Open Sidebar" : "Close Sidebar"}
              </span>
            </>
          )}
        </div>

        {/* Sidebar Item */}
        <div className="flex flex-col gap-2 dark:text-gray-500">
          <Link to="/">
            {/* Items */}
            <SidebarItem
              icon={
                <Home
                  size={!isCollapsed ? 20 : 30}
                  className="hover:scale-105"
                />
              }
              label={!isCollapsed ? "Dashboard" : ""}
              tooltip={isCollapsed ? "Dashboard" : ""}
            />
          </Link>
          <Link to="/projects">
            <SidebarItem
              icon={
                <GrProjects
                  size={!isCollapsed ? 20 : 30}
                  className="hover:scale-105"
                />
              }
              label={!isCollapsed ? "Projects" : ""}
              tooltip={isCollapsed ? "Projects" : ""}
            />
          </Link>
          <Link to="/tasks">
            <SidebarItem
              icon={
                <FaTasks
                  size={!isCollapsed ? 20 : 30}
                  className="hover:scale-105"
                />
              }
              label={!isCollapsed ? "Tasks" : ""}
              tooltip={isCollapsed ? "Tasks" : ""}
            />
          </Link>
          <Link to="/calender">
            <SidebarItem
              icon={
                <SlCalender
                  size={!isCollapsed ? 20 : 30}
                  className="hover:scale-105"
                />
              }
              label={!isCollapsed ? "Calender" : ""}
              tooltip={isCollapsed ? "Calender" : ""}
            />
          </Link>
          <Link to="/settings">
            <SidebarItem
              icon={
                <LucideSettings
                  size={!isCollapsed ? 20 : 30}
                  className="hover:scale-105"
                />
              }
              label={!isCollapsed ? "Settings" : ""}
              tooltip={isCollapsed ? "Settings" : ""}
            />
          </Link>
        </div>

        <div
          className="flex flex-row items-center gap-2 fixed left-2 bottom-5 p-4
         hover:text-gray-500 hover:bg-white/10 rounded-lg cursor-pointer  hover:shadow-indigo-500/20  hover:scale-105 transition
        "
        >
          {isCollapsed ? (
            <img
              //   onClick={() => setOpen(!open)}
              src={profile}
              alt="profile"
              className=" text-gray-600 w-9 h-9 sm:w-10 sm:h-10 rounded-full"
            />
          ) : (
            <>
              <img
                //   onClick={() => setOpen(!open)}
                src={profile}
                alt="profile"
                className=" text-gray-600 w-9 h-9 sm:w-10 sm:h-10 rounded-full"
              />
              <span className="text-lg font-bold text-gray-700 dark:text-gray-300 ">
                Pallavi Bhalerao
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;

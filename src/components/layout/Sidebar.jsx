import { Link } from "react-router-dom";
import {
  Home,
  LucideSettings,
  SidebarClose,
  SidebarOpen,
  X,
} from "lucide-react";
import { FaTasks } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { useState } from "react";
import profile from "../../assets/images/profileavatar.png";
import logo from "../../assets/images/klogo.png";
import SidebarItem from "../UI/SidebarItem.jsx";
import { SlCalender } from "react-icons/sl";

function Sidebar({ mobileOpen = false, onCloseMobile = () => {} }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuItems = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/projects", label: "Projects", icon: GrProjects },
    { to: "/tasks", label: "Tasks", icon: FaTasks },
    { to: "/calender", label: "Calender", icon: SlCalender },
    { to: "/settings", label: "Settings", icon: LucideSettings },
  ];

  const renderItems = (collapsed) =>
    menuItems.map(({ to, label, icon: Icon }) => (
      <Link key={to} to={to} onClick={onCloseMobile}>
        <SidebarItem
          icon={
            <Icon size={!collapsed ? 20 : 30} className="hover:scale-105" />
          }
          label={!collapsed ? label : ""}
          tooltip={collapsed ? label : ""}
        />
      </Link>
    ));

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onCloseMobile}
        />
      )}
      <div
        className={`fixed z-50 inset-y-0 left-0 w-72 bg-white dark:bg-[#1c253b] shadow-lg p-3 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between mt-3 mb-8">
          <img src={logo} alt="logo" className="w-12 h-10" />
          <button type="button" onClick={onCloseMobile}>
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        <div className="flex flex-col gap-2 dark:text-gray-500">
          {renderItems(false)}
        </div>
      </div>
      <div
        className={`hidden h-screen md:block flex-shrink-0  p-2 transition-all duration-300  
      rounded-xl bg-white dark:bg-[#1c253b] shadow-lg  ${isCollapsed ? "w-20 " : "w-64"} 
   rounded-tr-3xl rounded-br-3xl text-sm md:text-base
p-2 md:p-3`}
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
               cursor-pointer text-gray-500
               opacity-0 group-hover:opacity-100
              hover:shadow-md "
                size={18}
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
               cursor-pointer text-gray-500
               transition duration-200"
                size={18}
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
          {renderItems(isCollapsed)}
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
                className="  w-8 h-8 md:w-9 md:h-9 object-cover border border-gray-300 dark:border-gray-600 rounded-full"
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

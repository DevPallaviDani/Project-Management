import { Link, NavLink } from "react-router-dom";
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
import { loggedInUser } from "../../constants/global.js";

function Sidebar({ mobileOpen = false, onCloseMobile = () => {} }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const iconStyle = "";

  const menuItems = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/projects", label: "Projects", icon: GrProjects },
    { to: "/tasks", label: "Tasks", icon: FaTasks },
    { to: "/calendar", label: "Calender", icon: SlCalender },
    { to: "/settings", label: "Settings", icon: LucideSettings },
  ];
  const mobileMenuItems = [
    { to: "/projects", label: "Projects", icon: GrProjects },
    { to: "/tasks", label: "Tasks", icon: FaTasks },
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/calendar", label: "Calender", icon: SlCalender },
    { to: "/settings", label: "Settings", icon: LucideSettings },
  ];
  const renderItems = (collapsed) =>
    menuItems.map(({ to, label, icon: Icon }) => (
      <NavLink key={to} to={to} onClick={onCloseMobile}>
        <SidebarItem
          icon={
            <Icon size={!collapsed ? 20 : 30} className="hover:scale-105 " />
          }
          label={!collapsed ? label : ""}
          tooltip={collapsed ? label : ""}
        />
      </NavLink>
    ));

  return (
    <>
      {/* Bottom Navigation For small screen  */}
      <div
        className=" fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center md:hidden *
     border-t shadow-lg px-2 py-2 bg-sidebar overflow-visible"
      >
        {mobileMenuItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={`flex flex-col items-center px-3 py-1 rounded-full transition`}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`${isActive ? "bg-muted-bg rounded-full" : ""} rounded-full px-2 py-2`}
                >
                  <Icon size={15} className="text-text-muted" />
                </span>

                <span
                  className={`${isActive ? "text-text-muted" : "text-text-primary"}  text-xs mt-1`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div
        className={`hidden md:flex flex-col h-screen flex-shrink-0   
                    transition-all duration-300 bg-sidebar
                     ${isCollapsed ? "w-20" : "w-64"}
                   rounded-tr-3xl rounded-br-3xl
                    p-3 md:block sticky top-0 h-screen overflow-visible`}
      >
        {/* Top Section*/}
        {/* Logo + Sidebar Toggle */}
        <div className="group relative flex items-center justify-between mt-5 mb-10 m-2 overflow-visible">
          {/* <SiTask size={30} className="ml-3" /> */}
          <img
            src={logo}
            alt="logo"
            className={`w-10 h-10 cursor-pointer 
              ${isCollapsed ? "group-hover:opacity-0" : "group-hover:opacity-100"}`}
            onClick={() => setIsCollapsed((prev) => !prev)}
          />

          {/* Toggle Icon (only when sidebar open) */}
          {isCollapsed ? (
            <>
              <SidebarOpen
                onClick={() => setIsCollapsed((prev) => !prev)}
                className="absolute left-1 
               cursor-pointer text-text-light
               opacity-0 group-hover:opacity-100
              hover:shadow-md "
                size={18}
              />
              <span
                className="absolute -translate-y-1/2
               whitespace-nowrap rounded-lg 
               text-lg text-text-strong bg-card shadow-lg
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
               cursor-pointer text-text-light
               transition duration-200"
                size={18}
              />
              <span
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2
               whitespace-nowrap rounded-lg px-3 py-1
               text-lg text-text-strong bg-card shadow-lg
               opacity-0 group-hover:opacity-100
               transition duration-200 pointer-events-none"
              >
                {isCollapsed ? "Open Sidebar" : "Close Sidebar"}
              </span>
            </>
          )}
        </div>

        {/* Middle Section*/}
        {/* Sidebar Item */}
        <div className="flex flex-col gap-2 dark:text-gray-500">
          {renderItems(isCollapsed)}
        </div>

        {/* Bottom Section*/}
        <div
          className="mt-auto flex items-center gap-2 p-2
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
                {loggedInUser.userName}
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;

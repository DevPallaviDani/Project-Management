import React,{useState,useEffect} from 'react'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";


function ToggleTheme() {
  
      const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("project-Management-them");
        return savedTheme === "dark";
      });
      useEffect(() => {
        document.documentElement.classList.toggle("dark", darkMode);
        localStorage.setItem(
          "project-Management-them",
          darkMode ? "dark" : "light",
        );
      },[darkMode]);
  return (
    <div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-lg bg-[#e3eaf1]    dark:bg-[#0f172a] flex items-center"
      >
        {darkMode ? <MdDarkMode size={25} color="#748fa5" /> : <MdLightMode size={25} color="#748fa5"/>}
           {/* {darkMode ? "🌙 Dark" : "☀️ Light"} */}
      </button>
    </div>
  )
}

export default ToggleTheme
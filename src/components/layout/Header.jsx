import React from "react";
import Welcome from "../../features/dashboard/Welcome.jsx";
import profile from "../../assets/images/profileavatar.png";
import ToggleTheme from "../UI/ToggleTheme.jsx";

function Header() {
  return (
    <>
      <header
        className="px-2 py-2 md:px-6 md:py-4 flex items-center justify-between 
         dark:text-gray-200 bg-[#e3eaf1]    dark:bg-[#0f172a] rounded-lg "
      >
        <div className="flex items-center gap-3 md:gap-4">
          <Welcome userName="Pallavi" />
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Profile avatar  */}
          <img
            //   onClick={() => setOpen(!open)}
            src={profile}
            alt="profile"
            className="  w-8 h-8 md:w-9 md:h-9 object-cover border border-gray-300 dark:border-gray-600 rounded-full"
          />
          <ToggleTheme />
        </div>
      </header>
    </>
  );
}

export default Header;

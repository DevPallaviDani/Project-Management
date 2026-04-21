import React from "react";
import Welcome from "../../features/dashboard/Welcome.jsx";
import profile from "../../assets/images/profileavatar.png";
import ToggleTheme from "../UI/ToggleTheme.jsx";

import { loggedInUser } from "../../constants/global.js";

function Header() {
  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50  md:sticky">
        <header
          className=" md:px-2 md:py-2 flex items-center justify-between 
         rounded-xl bg-header text-text-strong  mb-5 hover:shadow-lg hover:scale-100  transition"
        >
          <div className="flex items-center gap-3 md:gap-2">
            <Welcome userName={loggedInUser.userName} />
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            {/* Profile avatar  */}
            <img
              //   onClick={() => setOpen(!open)}
              src={profile}
              alt="profile"
              className="w-5 h-5 md:w-9 md:h-9 object-cover border border-gray-300 dark:border-gray-600 rounded-full"
            />
            <ToggleTheme />
          </div>
        </header>
      </div>
    </>
  );
}

export default Header;

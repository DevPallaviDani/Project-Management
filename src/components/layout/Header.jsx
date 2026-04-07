import React from "react";
import Welcome from "../../features/dashboard/Welcome.jsx";
import profile from "../../assets/images/profileavatar.png"
import ToggleTheme from "../UI/ToggleTheme.jsx"

function Header() {
  return (
    <>
      <header className="p-6 flex items-center justify-between  dark:text-gray-200 ">
        <div className="flex items-center gap-4">
          <Welcome userName="Pallavi" />
        </div>
        <div className="flex flex-row gap-3">
            {/* Profile avatar  */}
            <img
            //   onClick={() => setOpen(!open)}
              src={profile}
              alt="profile"
              className=" text-gray-600 w-9 h-9 sm:w-10 sm:h-10 rounded-full"
            />
             <ToggleTheme/>
        </div>
        

   
      </header>
    </>
  );
}

export default Header;

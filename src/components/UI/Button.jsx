import React from "react";

function Button({children ,...props}) {
  return (
    <button
      className="px-4 py-2 text-xs md:text-base 
            rounded-md bg-gray-700 text-gray-400 hover:bg-gray-600
             hover:text-gray-100"
             {...props}
    >
   {children}
    </button>
  );
}

export default Button;

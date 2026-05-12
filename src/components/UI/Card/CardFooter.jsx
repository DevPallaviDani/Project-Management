import React from "react";

function CardFooter({ children }) {
  return (
    <div className="mt-3 border-t border-gray-200
     dark:border-gray-700 ">
      {children}
    </div>
  );
}

export default CardFooter;

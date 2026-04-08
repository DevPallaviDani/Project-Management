import React from "react";
import { PlusCircle } from "lucide-react";

function SectionWrapper({ title, children, count, onAdd }) {
  return (
    <>
      <div
        className="bg-white dark:bg-gray-800 rounded-xl
    shadow h-full flex flex-col p-5 "
        //  "h-full flex flex-col mt-2 bg-gray-500
        //  p-5 rounded-xl"
      >
        <div className="flex items-center justify-between">
          <div >
            <span className="text-lg font-semibold p-1 ">{title}</span>
            <span className="text-sm text-gray-500 ">{`(${count})`}</span>
          </div>
          {onAdd && (
            <PlusCircle
              size={20}
              className="cursor-pointer text-gray-400  hover:text-blue-500 hover:scale-110 transition"
              onClick={onAdd}
            />
          )}
        </div>

        <div className="mt-3 border-b "></div>
        <div className="grid gap-3 mt-5">{children}</div>
      </div>
    </>
  );
}

export default SectionWrapper;

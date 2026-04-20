import React from "react";
import { PlusCircle } from "lucide-react";

function SectionWrapper({
  title,
  children,
  count,
  onAdd,
  Icon,
  color = "transparent",
}) {
  return (
    <>
      <div
        className=" transition rounded-xl
    shadow h-full flex flex-col p-5   "
        //  "h-full flex flex-col mt-2 bg-gray-500
        //  p-5 rounded-xl"
      >
        <div
          className={`flex p-1 items-center justify-between bg-muted-bg dark:text-gray-600 rounded-lg`}
        >
          <div className="flex items-center gap-1">
            {Icon && <Icon size={18} className={color} />}

            <span className="text-lg font-semibold p-1 text-text-strong ">
              {title}
            </span>

            <span className="min-w-[20px] h-5 py-4 px-3 flex items-center justify-center rounded-full  text-sm  bg-bg text-text-primary ">
              {count > 99 ? "99+" : count}{" "}
            </span>
          </div>
          {onAdd && (
            <PlusCircle
              size={20}
              className="cursor-pointer text-gray-400  hover:text-blue-500 hover:scale-110 transition"
              onClick={onAdd}
            />
          )}
        </div>

        <div className="mt-1 border-b "></div>
        <div className="grid gap-3 mt-5">{children}</div>
      </div>
    </>
  );
}

export default SectionWrapper;

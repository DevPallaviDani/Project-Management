import React from "react";

function CardHeader({ dueDate, title, subtitle, rightContent }) {
  return (
    <div className="flex flex-col items-start justify-between mb-2">
      <div>
        {dueDate && (
          <p
            className="text-sm text-gray-400 
          rounded-2xl py-1"
          >
            {dueDate}
          </p>
        )}
      </div>

      <div>
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>

      {rightContent && <div>{rightContent}</div>}
    </div>
  );
}

export default CardHeader;

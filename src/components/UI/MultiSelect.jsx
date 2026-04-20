import React from "react";

function MultiSelect({ options, selected = [], onChange }) {


  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
        <li
        
        >
 {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => toggleOption(opt.value)}
          className={`px-3 py-1 rounded-full text-sm border
            ${
              selected.includes(opt.value)
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 dark:bg-[#0f172a]"
            }`}
        >
          {opt.name}
        </button>
      ))}
        </li>
     
    </div>
  );
}

export default MultiSelect;

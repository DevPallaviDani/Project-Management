function SidebarItem({ icon, label, tooltip }) {
  return (
    <div
      className="relative group flex items-start gap-2  px-2 py-2 hover:bg-white/10 
    rounded-lg cursor-pointer  hover:shadow-indigo-500/20  
    hover:scale-105 transition "
    >
      {icon}
      <span className="text-gray-500 font-bold text-lg dark:text-gray-200">
        {label}
      </span>
      {tooltip && (
        <span
          className="absolute  ml-1 top-1/2 
                     whitespace-nowrap rounded px-2 py-1 shadow-lg
                     text-sm text-text-light bg-card
                     opacity-0 group-hover:opacity-100 
                     transition pointer-events-none z-50"
        >
          {tooltip}
        </span>
      )}
    </div>
  );
}

export default SidebarItem;

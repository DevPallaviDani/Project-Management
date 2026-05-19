import React from "react";
import useWorkspace from "../../hooks/useWorkspace.jsx";

function DashboardOverviewList({
  items = [],
  tbHeader,
  tableName,
  message,
  css,
}) {
  return (
    <>
      <div className="flex-1 min-w-0">
        <div>
          <h3 className="text-xl p-2">{tableName}</h3>
        </div>
        {Array.isArray(items) && items.length > 0 ? (
          <div>
            <table className={`${css}`}>
              <thead>
                <tr>
                  {tbHeader.map((key) => (
                    <th key={key} className="bg-panel text-left p-2 ">
                      {key.toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className={`  border bg-[#f8f9fa] hover:bg-[#f1f1f1] `}
                  >
                    {tbHeader.map((key) => {
                      const cell = item[key];

                      return (
                        <td
                          key={key}
                          className={` text-left text-sm truncate `}
                        >
                          {cell?.type === "image" ? (
                            <td className={`flex ${cell.css} `}>
                              <img
                                src={cell.value}
                                alt="Avatar"
                                className=" w-9 h-9 rounded-full object-cover
                        ring-2 ring-white/70 dark:ring-slate-700
                        shadow-md "
                              />
                            </td>
                          ) : cell?.type === "checkbox" ? (
                            <div className={`flex items-center ${cell?.css}`}>
                              <input
                                type="checkbox"
                                checked={Boolean(cell.value ?? cell.checked)}
                                onChange={(e) =>
                                  cell.onChange?.(
                                    e.target.checked,
                                    item,
                                    key,
                                    cell,
                                  )
                                }
                                className="w-4 h-4 accent-indigo-600 cursor-pointer"
                              />
                            </div>
                          ) : cell?.type === "div" ? (
                            <div className={` flex  justify-center`}>
                              <div className={`relative group ${cell?.css || ""}`}>
                                {/* <span
                                  className="absolute                      
                               text-xs bg-gray-800 text-white px-2 py-1 rounded
                               opacity-0 group-hover:opacity-100
                               transition whitespace-nowrap
                               pointer-events-none z-50"
                                >
                                
                                  {cell?.value}
                                </span> */}
                              </div>
                            </div>
                          ) : (
                            <td className={`flex  ${cell?.css} rounded-full `}>
                              <p> {cell?.value ?? ""}</p>
                            </td>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>{" "}
          </div>
        ) : (
          <div className="p-8 text-center bg-[#f8f9fa] border border-dashed rounded-xl shadow-sm">
            <p className="text-gray-400 font-medium text-base">{message}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardOverviewList;

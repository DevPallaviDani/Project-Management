import React from "react";

function DashboardOverviewList({ items = [], tbHeader, tableName, message }) {
  return (
    <>
      <div className="flex-1 min-w-0">
        <div>
          <h3 className="text-xl p-2">{tableName}</h3>
        </div>
        {Array.isArray(items) &&  items.length > 0 ? (
          <div className="w-full overflow-x-auto max-h-[120px] overflow-y-auto">
           
          <table className="w-full min-w-[100px] border-collapse rounded-xl shadow-md 
           bg-gray-200 text-gray-600 ">
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
                        className={` text-left text-sm  px-2 py-1 truncate `}
                      >
                        {cell?.type === "image" ? (
                          <td className={`flex ${cell.css} `}>
                            <img
                              src={cell.value}
                              alt="Avatar"
                              className="w-8 h-8 rounded-full object-cover inline-block "
                            />
                          </td>
                        ) : (
                          <td className={`flex  ${cell.css} rounded-full `}>
                            <p> {cell?.value ?? ""}</p>
                          </td>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table> </div>
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

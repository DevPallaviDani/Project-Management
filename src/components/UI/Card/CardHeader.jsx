
import React from 'react'

function CardHeader({title,subtitle,rightContent}) {
  return (
    <div className="flex items-start justify-between mb-2">
      <div>
        <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>
        {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
      </div>

      {rightContent && <div>{rightContent}</div>}
    </div>
  )
}

export default CardHeader


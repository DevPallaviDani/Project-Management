import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import {CSS} from "@dnd-kit/utilities"
function DraggableCard({data,className,children}) {
    const {attributes,listeners,setNodeRef,transform,isDragging}=useDraggable({
    id:data.id,
    })
   
 const style = {
  transform: transform
    ? CSS.Translate.toString(transform)
    : undefined,
};

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`${className} flex flex-col cursor-grab active:cursor-grabbing
        ${isDragging ? "opacity-30" : ""}`}
    >
      {children}
    </div>
  );
}

export default DraggableCard
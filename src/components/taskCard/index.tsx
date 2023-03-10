import React from "react";

function TaskCard({ task, idx }: any) {
  return (
    <div key={idx} className="text-lg bg-gray-600 bg-opacity-40 rounded-lg">
      <div className="flex items-center p-2">
        <div className="border border-gray-400 w-8 h-8 rounded-full flex justify-center items-center">
          {task.id}
        </div>
        <div className="ml-5">
          <h1>{task.title}</h1>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

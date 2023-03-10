import React from "react";
import { GoCheck } from "react-icons/go";

function TaskCard({ task, idx }: any) {
  return (
    <div key={idx} className="text-lg bg-gray-600 bg-opacity-40 rounded-lg">
      <div className="flex items-center p-2 justify-between">
        <div className="flex items-center">
          <div className="border border-gray-400 w-8 h-8 rounded-full flex justify-center items-center">
            {task.id}
          </div>
          <div className="ml-5">
            <h1>{task.title}</h1>
          </div>
        </div>
        <div>
          <button
            className="text-sm w-10 rounded-full border h-8 flex opacity-50 hover:opacity-100 justify-center items-center
           hover:bg-white hover:bg-opacity-30 hover:scale-110 duration-150"
          >
            <GoCheck className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

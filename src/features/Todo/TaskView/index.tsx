import React, {useState} from "react";
import TaskCard from "@/features/Todo/TaskCard";
import {useTodoStore} from "@/features/state";

export function TaskView() {
  const tasks = useTodoStore(state => Object.values(state.tasks))
  const addTask = useTodoStore(state => state.addTask)

  return (
    <div className="max-w-[800px] mx-auto w-full justify-center">
      <div className="h-fit mx-auto">
        <h1 className="text-2xl text-center my-10"> TO DO APP </h1>
        <button
          onClick={() => addTask()}
          className="w-28 mx-auto mb-10 h-10 border-2 rounded-xl"
        >
          Add task
        </button>
      </div>
      <div className="">
        {tasks.length == 0 ? (
          <div className="text-gray-300 text-center">
            <h1>It seems empty here. Try adding new Tasks</h1>
          </div>
        ) : (
          <section className="flex flex-col">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
              />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default TaskView;

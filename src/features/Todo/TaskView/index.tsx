import React, {useState} from "react";
import TaskCard from "@/features/Todo/TaskCard";

export function TaskView() {
  const [task, setTask] = useState<any>([]);
  const [newTask, setNewTask] = useState("");
  const [complete, setComplete] = useState(false);

  // add new task
  const addTask = () => {
    if (task) {
      let num = task.length + 1;
      let newEntry = { id: num, title: newTask, status: complete };
      setTask([...task, newEntry]);
      setNewTask("");
    }
  };

  // mark task complete
  const markComplete = (id: number) => {
    let markTask = task.map((task: any) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTask(markTask);
  };

  // handles form input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewTask(e.target.value);
  };

  return (
    <div className="w-full flex justify-center">
      <div>
        <div className="w-96 h-fit mx-auto">
          <h1 className="text-2xl text-center my-10"> TO DO APP </h1>
          <div className=" flex flex-col space-y-6">
            <input
              type="text"
              value={newTask}
              maxLength={80}
              placeholder="Enter tasks here..."
              onChange={handleInputChange}
              className="flex-1 w-full text-lg px-3 py-2 rounded-lg"
            />
            <button
              onClick={addTask}
              className="w-28 mx-auto h-10 border-2 rounded-xl"
            >
              Add task
            </button>
          </div>
        </div>
        <div className="mt-12">
          {task.length == 0 ? (
            <div className="text-gray-300 text-center">
              <h1>It seems empty here. Try adding new Tasks</h1>
            </div>
          ) : (
            <section className="flex flex-col space-y-5">
              {task.map((task: string, idx: number) => (
                <TaskCard
                  task={task}
                  idx={idx}
                  markComplete={markComplete}
                />
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;

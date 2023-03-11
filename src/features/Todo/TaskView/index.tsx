import React, {useEffect, useMemo, useRef, useState} from "react";
import {motion, AnimatePresence, Reorder} from "framer-motion";
import cx from "classnames";
import TaskCard from "@/features/Todo/TaskCard";
import {getTags, useTodoStore} from "@/features/state";

export function TaskView() {
  const [selectedTag, setSelectedTag] = useState<string>("")

  const tasks = useTodoStore(state => Object.values(state.tasks).sort((a, b) => a.done === b.done ? 0 : (a.done ? 1 : -1)))
  const tags = useTodoStore(state => getTags(state))
  const addTask = useTodoStore(state => state.addTask)

  const filteredTasks = useMemo(
    () => {
      if (selectedTag) {
        return tasks.filter(task => task.tags.indexOf(selectedTag) !== -1)
      } else {
        return tasks
      }
    },
    [tasks, selectedTag]
  )
  const addTaskWithSelectedTag = () => {
    selectedTag != "" ? addTask([selectedTag]) : addTask()
  }

  // we should only auto-focus when a new task is created (i.e. not when new tag is selected)
  const prevTagRef = useRef<string>("")
  const renderCount = useRef<number>(0)
  useEffect(() => {
    prevTagRef.current = selectedTag
    renderCount.current++
  }, [selectedTag])

  return (
    <div className="max-w-[800px] mx-auto w-full justify-center">
      <div className="h-fit mx-auto">
        <h1 className="text-2xl text-center my-10">Cobra Tasks</h1>
        <div className="mb-4">
          <button
            onClick={addTaskWithSelectedTag}
            className="w-28 mb-4 mx-auto h-10 border-2 rounded-xl"
          >
            Add task
          </button>
          <div className="mb-8">
            <div className="font-medium text-sm px-2 mr-1 rounded-xl items-center">
              <button
                className={cx(
                  selectedTag === "" && "bg-slate-300",
                  "border-2 border-transparent hover:border-slate-300 px-2 rounded-xl inline-block"
                )}
                onClick={() => setSelectedTag("")}
              >
                All
              </button>
              <AnimatePresence>
                {tags.map(tag => (
                  <motion.button
                    key={tag}
                    className={cx(
                      selectedTag === tag && "bg-slate-300",
                      "border-2 border-transparent hover:border-slate-300 px-2 rounded-xl inline-block"
                    )}
                    onClick={() => setSelectedTag(tag)}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {tasks.length == 0 ? (
          <div className="text-gray-300 text-center">
            <h1>It seems empty here. Try adding new Tasks</h1>
          </div>
        ) : (
          <section className="flex flex-col">
            <Reorder.Group
              as="ul"
              axis="y"
              onReorder={console.log}
              values={filteredTasks}
            >
              <AnimatePresence>
                {filteredTasks.map((task, index) => (
                  <Reorder.Item id={task.id} key={task.id} value={task} dragListener={false}>
                    <motion.div
                      className={(task.done && (index === 0 || !filteredTasks[index - 1].done)) ? "mt-24" : ""}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <TaskCard
                        autoFocus={filteredTasks.length == (index + 1) && prevTagRef.current === selectedTag && renderCount.current > 0}
                        task={task}
                      />
                    </motion.div>
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          </section>
        )}
      </div>
    </div>
  );
}

export default TaskView;

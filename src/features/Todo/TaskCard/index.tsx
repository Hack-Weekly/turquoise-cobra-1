import React, {useState} from "react";
import colors from "tailwindcss/colors";
import ClickAwayListener from 'react-click-away-listener';
import { motion } from 'framer-motion';
import { GoTag } from "react-icons/go";
import { RiCloseCircleFill } from "react-icons/ri"
import { Task } from "@/features/types";
import {useTodoStore} from "@/features/state";
import TaskTagPicker from "@/features/Todo/TaskTagPicker";

export type ITaskCard = {
  autoFocus?: boolean
  task: Task
}

export function TaskInput(props: ITaskCard) {
  const { task } = props
  const [focused, setFocus] = useState<boolean>(false);
  const removeTask = useTodoStore(state => state.removeTask)
  const editName = useTodoStore(state => state.editName)
  const editNotes = useTodoStore(state => state.editNotes)
  const markCompletion = useTodoStore(state => state.markCompletion)
  const removeTag = useTodoStore(state => state.removeTag)

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    editName(task.id, e.target.value);
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    editNotes(task.id, e.target.value);
  };

  const handleCompletionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    markCompletion(task.id, e.target.checked);
  }

  const handleClickAway = () => {
    setFocus(false);
  };

  const handleFocus = (e: any) => {
    setFocus(true);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <motion.div
        initial="closed"
        animate={focused ? "focused" : "closed"}
        className={"grid grid-cols-[30px_auto] px-5 rounded-md " + (focused ? "border border-gray-200 shadow-md" : "")}
        variants={{
          focused: { paddingTop: '1rem', paddingBottom: '1rem', marginTop: '2rem', marginBottom: '2rem' },
          closed: { }
        }}
      >
        <motion.label className="py-1">
          <input
            className="truncate"
            type="checkbox"
            id="task-id"
            checked={task.done}
            onChange={handleCompletionChange}
          />
        </motion.label>
        <motion.label htmlFor="task-id" className="inline-block">
          <input
            autoFocus={props.autoFocus}
            onFocus={handleFocus}
            type="text"
            value={task.name}
            placeholder="New To Do"
            onChange={handleTitleChange}
            className="flex-1 w-full rounded-lg inline-block focus:outline-none truncate py-1"
          />
        </motion.label>

        <motion.div />

        <motion.div>
          <motion.textarea
            variants={{
              focused: { opacity: 1, height: 80, paddingTop: '0.5rem' },
              closed: { opacity: 0, height: 0 }
            }}
            onFocus={handleFocus}
            value={task.notes}
            placeholder="Notes"
            onChange={handleNotesChange}
            className="block flex-1 w-full rounded-lg leading-snug focus:outline-none"
          />
          <motion.div className="grid grid-cols-[auto_80px]">
            <motion.ul className="">
              {props.task.tags.map(tag => (
                <motion.li
                  className="text-sm font-medium px-2 mr-1 rounded-xl items-center inline-flex"
                  key={tag}
                  variants={{
                    focused: {
                      backgroundColor: colors.green[300],
                      borderColor: 'rgba(0,0,0,0)',
                      borderWidth: 1,
                      color: colors.green[700],
                      fontWeight: 500,
                      marginBottom: 0
                    },
                    closed: {
                      borderColor: colors.stone[500],
                      borderWidth: 1,
                      color: colors.stone[500],
                      fontWeight: 100,
                      marginBottom: '1rem'
                    }
                  }}
                >
                  <span>{tag}</span>
                  <motion.button
                    onClick={() => removeTag(task.id, tag)}
                    className="inline-flex pl-1"
                    variants={{
                      focused: { width: 16 },
                      closed: { width: 0 },
                    }}
                  >
                    <RiCloseCircleFill className="inline-block" />
                  </motion.button>
                </motion.li>
              ))}
              {focused && (
                <motion.li className="text-sm px-2 mr-1 rounded-xl items-center inline-flex">
                  <GoTag />
                  <TaskTagPicker task={task} />
                </motion.li>
              )}
            </motion.ul>
            {focused && (
              <motion.button
                onClick={() => removeTask(task.id)}
                className="text-sm text-red-500 hover:bg-red-100 active:bg-red-200 px-2 rounded-lg"
              >
                Delete
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </ClickAwayListener>
  );
};

export default TaskInput;
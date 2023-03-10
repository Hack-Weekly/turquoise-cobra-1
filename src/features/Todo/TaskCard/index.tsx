import React, {useState} from "react";
import ClickAwayListener from 'react-click-away-listener';
import { GoTag, GoX } from "react-icons/go";
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

  const handleFocus = () => {
    setFocus(true);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={"grid grid-cols-[30px_auto] px-5 rounded-md " + (focused ? "border border-gray-200 shadow-md my-8 py-4" : "")}>
        <label className="py-1">
          <input
            className="truncate"
            type="checkbox"
            id="task-id"
            checked={task.done}
            onChange={handleCompletionChange}
            onFocus={handleFocus}
          />
        </label>
        <label htmlFor="task-id" className="inline-block">
          <input
            autoFocus={props.autoFocus}
            onFocus={handleFocus}
            type="text"
            value={task.name}
            placeholder="New To Do"
            onChange={handleTitleChange}
            className="flex-1 w-full rounded-lg inline-block focus:outline-none truncate py-1"
          />
        </label>
        <div />
        {focused
          ? (
            <div>
              <textarea
                onFocus={handleFocus}
                value={task.notes}
                placeholder="Notes"
                onChange={handleNotesChange}
                className="flex-1 w-full py-2 rounded-lg focus:outline-none"
              />
              <div className="flex items-center">
                <ul className="">
                  {props.task.tags.map(tag => (
                    <li className="bg-green-300 text-sm text-green-700 font-medium px-2 mr-1 rounded-xl items-center inline-block" key={tag}>
                      <span>{tag}</span>
                      <button onClick={() => removeTag(task.id, tag)} className="inline-block pl-1"><RiCloseCircleFill className="inline-block" /></button>
                    </li>
                  ))}
                  <li className="text-sm px-2 mr-1 rounded-xl items-center inline-flex">
                    <GoTag />
                    <TaskTagPicker task={task} />
                  </li>
                </ul>
              </div>
            </div>
          )
          : (
            <ul className="">
              {props.task.tags.map(tag => (
                <li className="text-sm font-medium text-stone-500 border-stone-500 border px-2 mr-1 rounded-xl mb-2 inline-block" key={tag}>{tag}</li>
              ))}
            </ul>
          )
        }
      </div>
    </ClickAwayListener>
  );
};

export default TaskInput;

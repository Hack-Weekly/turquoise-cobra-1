import React, {useState} from "react";
import ClickAwayListener from 'react-click-away-listener';
import { GoTag } from "react-icons/go";
import { Task } from "@/features/types";
import {useTodoStore} from "@/features/state";

export type ITaskCard = {
  task: Task
}

export function TaskInput(props: ITaskCard) {
  const { task } = props
  const [focused, setFocus] = useState<boolean>(false);
  const editName = useTodoStore(state => state.editName)
  const editNotes = useTodoStore(state => state.editNotes)
  const markCompletion = useTodoStore(state => state.markCompletion)

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
          <input className="truncate" type="checkbox" id="task-id" checked={task.done} onChange={handleCompletionChange} />
        </label>
        <label htmlFor="task-id" className="inline-block">
          <input
            autoFocus
            onFocus={handleFocus}
            type="text"
            value={task.name}
            placeholder="New To Do"
            onChange={handleTitleChange}
            className="flex-1 w-full rounded-lg inline-block focus:outline-none truncate py-1"
          />
        </label>
        <div />
        {focused && (
          <div>
            <textarea
              onFocus={handleFocus}
              value={task.notes}
              placeholder="Notes"
              onChange={handleNotesChange}
              className="flex-1 w-full py-2 rounded-lg focus:outline-none"
            />
            <div className="flex flex-end justify-items-end">
              <GoTag />
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default TaskInput;

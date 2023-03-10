import React, {useMemo, useState} from 'react'
import Downshift from 'downshift'
import cx from 'classnames'
import {GoTag} from "react-icons/go";
import {getTags, useTodoStore} from "@/features/state";
import {Task} from "@/features/types";

export type ITaskTagPicker = {
  task: Task
}
export function TaskTagPicker (props: ITaskTagPicker) {
  const { task } = props
  const addTag = useTodoStore(state => state.addTag)
  const [tag, setTag] = useState("")

  const possibleTags = useTodoStore(state => getTags(state, task))
  const tags = useMemo(() => {
    const tags = possibleTags.map(tag => ({ value: tag, label: tag }))

    if (tag && possibleTags.indexOf(tag) == -1 && task.tags.indexOf(tag) == -1) {
      return [...tags, { value: tag, label: `Add Tag "${tag}"` }]
    } else {
      return tags
    }
  }, [tag, possibleTags, task])

  return (
    <Downshift
      onChange={(selection, helpers) => {
        if (selection) {
          addTag(props.task.id, selection.value)
          helpers.clearSelection()
          helpers.openMenu()
        }
      }}
      onInputValueChange={tag => setTag(tag)}
      itemToString={item => item ? item.value : ''}
    >
      {({
          getInputProps,
          getItemProps,
          getMenuProps,
          getRootProps,
          highlightedIndex,
          inputValue,
          isOpen,
          openMenu,
          selectedItem,
        }) => (
        <div className="text-sm">
          <div className="flex flex-col gap-1">
            <div
              className="flex shadow-sm bg-white gap-0.5"
              {...getRootProps({}, {suppressRefError: true})}
            >
              <input
                placeholder="Add Tag"
                className="w-24 p-1.5 focus:bg-slate-100 focus:outline-none rounded-md"
                {...getInputProps({ onFocus: openMenu })}
              />
            </div>
          </div>
          <ul
            className={`absolute bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 ${
              !(isOpen && tags.length) && 'hidden'
            }`}
            {...getMenuProps()}
          >
            {isOpen
              ? tags
                .filter(
                  tag =>
                    !inputValue ||
                    tag.value
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                )
                .map((item, index) => (
                  <li
                    className={cx(
                      highlightedIndex === index && 'bg-blue-300',
                      selectedItem === item && 'font-bold',
                      'py-1 px-2 flex flex-col rounded-md',
                    )}
                    {...getItemProps({
                      key: item.value,
                      index,
                      item,
                    })}
                  >
                    <span>
                      <GoTag className="inline-block mr-2" />
                      {item.label}
                    </span>
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}

export default TaskTagPicker
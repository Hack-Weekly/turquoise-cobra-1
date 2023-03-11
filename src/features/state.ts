import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Task } from "@/features/types";

interface TodoState {
  tasks: { [id:string]: Task }
  addTask: (tags?: string[], id?: string) => void
  addTag: (id: string, tag: string) => void
  removeTask: (id: string) => void
  removeCompletedTasks: (id?: string) => void
  removeTag: (id: string, tag: string) => void
  editName: (id: string, name: string) => void
  editNotes: (id: string, notes: string) => void
  markCompletion: (id: string, done: boolean) => void
}

// TODO: Optimize this
export const getTags = (state: TodoState, exceptTask: Task | null = null) => {
  const tagsSet = new Set(['webdev', 'productivity'])
  for (const key in state.tasks) {
    for (const tag of state.tasks[key].tags) {
      tagsSet.add(tag)
    }
  }
  if (exceptTask) {
    for (const key of exceptTask.tags) {
      tagsSet.delete(key)
    }
  }
  return Array.from(tagsSet)
}

// TODO: should have used immer
export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      tasks: {},
      addTask: (tags = [], id = nanoid()) => set((state) => ({
        tasks: {
          ...state.tasks,
          [id]: {
            id,
            name: "",
            notes: "",
            tags,
            createdAt: (new Date()).toString(),
            done: false
          }
        }
      })),
      removeTask: (id) => set((state) => {
        const tasks = { ...state.tasks }
        delete tasks[id]

        return { tasks }
      }),
      removeCompletedTasks: (tag: string = '') => set((state) => {
        const tasks = { ...state.tasks }
        const keys = Object.keys(tasks)
        for (let key of keys) {
          const task = tasks[key]
          if (task.done && (tag === '' || task.tags.indexOf(tag) !== -1)) {
            delete tasks[key]
          }
        }

        return { tasks }
      }),
      addTag: (id, tag) => set((state) => ({
        tasks: {
          ...state.tasks,
          [id]: {
            ...state.tasks[id],
            tags: state.tasks[id].tags.indexOf(tag) === -1 ? [...state.tasks[id].tags, tag] : state.tasks[id].tags
          }
        }
      })),
      removeTag: (id, tag) => set((state) => ({
        tasks: {
          ...state.tasks,
          [id]: {
            ...state.tasks[id],
            tags: state.tasks[id].tags.filter((item) => item !== tag)
          }
        }
      })),
      editName: (id: string, name: string) => set((state) => ({
        tasks: {
          ...state.tasks,
          [id]: { ...state.tasks[id], name }
        }
      })),
      editNotes: (id: string, notes: string) => set((state) => ({
        tasks: {
          ...state.tasks,
          [id]: { ...state.tasks[id], notes }
        }
      })),
      markCompletion: (id: string, done: boolean) => set((state) => ({
        tasks: {
          ...state.tasks,
          [id]: { ...state.tasks[id], done }
        }
      })),
    }),
    {
      name: 'cobra-tasks'
    }
  )
);
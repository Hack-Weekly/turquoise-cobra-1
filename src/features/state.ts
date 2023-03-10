import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { Task } from "@/features/types";

interface TodoState {
  tasks: { [id:string]: Task }
  addTask: (id?: string) => void
  editName: (id: string, name: string) => void
  editNotes: (id: string, notes: string) => void
  markCompletion: (id: string, done: boolean) => void
}

export const useTodoStore = create<TodoState>()((set) => ({
  tasks: {},
  addTask: (id = nanoid()) => set((state) => ({
    tasks: {
      ...state.tasks,
      [id]: {
        id,
        name: "",
        notes: "",
        tags: [],
        createdAt: (new Date()).toString(),
        done: false
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
}));
export type TaskTag = {
  id: string;
  name: string;
  color: string;
}

export enum TaskStatus {
}

export type Task = {
  id: string;
  name: string;
  notes: string;
  tags: TaskTag[]
  // date string
  createdAt: string;
  done: boolean;
}

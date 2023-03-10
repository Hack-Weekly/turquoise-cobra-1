export type Task = {
  id: string;
  name: string;
  notes: string;
  tags: string[];
  // date string
  createdAt: string;
  done: boolean;
}

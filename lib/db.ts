import Dexie, { type EntityTable } from "dexie";

interface Jadwal {
  id: number;
  title: string;
  startTime: string; // format "HH:mm"
  endTime: string;
  date: string; // format "YYYY-MM-DD"
  category: string;
  recurringId?: string; // opsional, buat nandain grup jadwal berulang
}

interface Task {
  id: number;
  title: string;
  dueDate: string; // format "YYYY-MM-DD"
  completed: boolean;
  category: string;
}

interface Subtask {
  id: number;
  taskId: number;
  title: string;
  done: boolean;
}

const db = new Dexie("JadwalKuDB") as Dexie & {
  jadwal: EntityTable<Jadwal, "id">;
  task: EntityTable<Task, "id">;
  subtask: EntityTable<Subtask, "id">;
};

db.version(1).stores({
  jadwal: "++id, date, startTime, category",
  task: "++id, dueDate, completed, category",
  subtask: "++id, taskId, done",
});

export type { Jadwal, Task, Subtask };
export { db };
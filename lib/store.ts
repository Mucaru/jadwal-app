import { create } from "zustand";
import { db, type Jadwal, type Task, type Subtask } from "./db";

interface AppState {
  jadwalList: Jadwal[];
  taskList: Task[];
  subtaskList: Subtask[];

  loadJadwal: (date: string) => Promise<void>;
  addJadwal: (item: Omit<Jadwal, "id">) => Promise<void>;
  deleteJadwal: (id: number) => Promise<void>;

  loadTasks: () => Promise<void>;
  addTask: (item: Omit<Task, "id">) => Promise<void>;
  toggleTaskDone: (id: number) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;

  loadSubtasks: (taskId: number) => Promise<void>;
  addSubtask: (item: Omit<Subtask, "id">) => Promise<void>;
  toggleSubtaskDone: (id: number) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  jadwalList: [],
  taskList: [],
  subtaskList: [],

  loadJadwal: async (date) => {
    const items = await db.jadwal.where("date").equals(date).sortBy("startTime");
    set({ jadwalList: items });
  },
  addJadwal: async (item) => {
    await db.jadwal.add(item as Jadwal);
    await get().loadJadwal(item.date);
  },
  deleteJadwal: async (id) => {
    const item = await db.jadwal.get(id);
    await db.jadwal.delete(id);
    if (item) await get().loadJadwal(item.date);
  },

  loadTasks: async () => {
    const items = await db.task.orderBy("dueDate").toArray();
    set({ taskList: items });
  },
  addTask: async (item) => {
    await db.task.add(item as Task);
    await get().loadTasks();
  },
  toggleTaskDone: async (id) => {
    const item = await db.task.get(id);
    if (item) await db.task.update(id, { completed: !item.completed });
    await get().loadTasks();
  },
  deleteTask: async (id) => {
    await db.subtask.where("taskId").equals(id).delete();
    await db.task.delete(id);
    await get().loadTasks();
  },

  loadSubtasks: async (taskId) => {
    const items = await db.subtask.where("taskId").equals(taskId).toArray();
    set({ subtaskList: items });
  },
  addSubtask: async (item) => {
    await db.subtask.add(item as Subtask);
    await get().loadSubtasks(item.taskId);
  },
  toggleSubtaskDone: async (id) => {
    const item = await db.subtask.get(id);
    if (item) {
      await db.subtask.update(id, { done: !item.done });
      await get().loadSubtasks(item.taskId);
    }
  },
}));
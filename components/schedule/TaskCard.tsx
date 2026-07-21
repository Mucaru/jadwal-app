"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import type { Task } from "@/lib/db";
import { Trash2 } from "lucide-react";
import SwipeToDelete from "@/components/ui/SwipeToDelete";

export default function TaskCard({ task }: { task: Task }) {
  const [expanded, setExpanded] = useState(false);
  const [newSubtask, setNewSubtask] = useState("");

  const {
    subtaskList,
    loadSubtasks,
    addSubtask,
    toggleSubtaskDone,
    toggleTaskDone,
    deleteTask,
  } = useAppStore();

  useEffect(() => {
    if (expanded) loadSubtasks(task.id);
  }, [expanded]);

  const mySubtasks = subtaskList.filter((s) => s.taskId === task.id);
  const doneCount = mySubtasks.filter((s) => s.done).length;
  const progress =
    mySubtasks.length > 0 ? (doneCount / mySubtasks.length) * 100 : 0;

  const handleAddSubtask = async () => {
    if (!newSubtask.trim()) return;
    await addSubtask({ taskId: task.id, title: newSubtask, done: false });
    setNewSubtask("");
  };

  const actions = (
    <button
      onClick={() => deleteTask(task.id)}
      className="flex-1 bg-red-500 text-white text-xs font-medium flex flex-col items-center justify-center gap-1"
    >
      <Trash2 size={16} />
      Hapus
    </button>
  );

  return (
    <div className="animate-card-in">
      <SwipeToDelete actions={actions}>
        <div className="bg-white p-3.5 shadow-card rounded-2xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleTaskDone(task.id)}
              className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                task.completed
                  ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                  : "border-gray-300"
              }`}
            />
            <div
              className="flex-1 cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            >
              <p
                className={`text-sm font-medium ${task.completed ? "line-through text-gray-400" : ""}`}
              >
                {task.title}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Deadline {task.dueDate}
              </p>
            </div>
          </div>

          {mySubtasks.length > 0 && (
            <div className="h-1 bg-gray-200 rounded mt-2 overflow-hidden">
              <div
                className="h-full bg-[var(--color-primary)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {expanded && (
            <div className="mt-3 pl-8 space-y-2">
              {mySubtasks.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSubtaskDone(s.id)}
                    className={`w-4 h-4 rounded border-2 flex-shrink-0 ${
                      s.done
                        ? "bg-[var(--color-primary)] border-[var(--color-primary)]"
                        : "border-gray-300"
                    }`}
                  />
                  <p
                    className={`text-xs ${s.done ? "line-through text-gray-400" : "text-gray-600"}`}
                  >
                    {s.title}
                  </p>
                </div>
              ))}

              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Tambah subtask..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
                  className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5"
                />
                <button
                  onClick={handleAddSubtask}
                  className="text-xs bg-[var(--color-primary)] text-white rounded-lg px-3"
                >
                  +
                </button>
              </div>
            </div>
          )}
        </div>
      </SwipeToDelete>
    </div>
  );
}

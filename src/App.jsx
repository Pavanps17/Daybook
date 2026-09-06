import { useEffect, useMemo, useState } from "react";
import ProgressTracker from "./components/progresstracker";
import TaskForm from "./components/taskform";
import TaskList from "./components/tasklist";
import "./App.css";

const STORAGE_KEY = "tasks";

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((task, index) => ({
      id: task.id || `legacy-${index}-${task.text || "task"}`,
      createdAt: task.createdAt || Date.now() - index,
      dueDate: task.dueDate || "",
      completed: Boolean(task.completed),
      priority: task.priority || "Medium",
      category: task.category || "General",
      text: task.text || "",
    }));
  } catch {
    return [];
  }
}

function todayLabel() {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("open");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((current) => [
      {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        ...task,
      },
      ...current,
    ]);
  };

  const updateTask = (id, patch) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, ...patch } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  };

  const clearDone = () => {
    setTasks((current) => current.filter((task) => !task.completed));
  };

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks
      .filter((task) => {
        if (status === "open" && task.completed) return false;
        if (status === "done" && !task.completed) return false;
        if (category !== "All" && task.category !== category) return false;
        if (q && !task.text.toLowerCase().includes(q)) return false;
        return true;
      })
      .sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        const dueA = a.dueDate || "9999";
        const dueB = b.dueDate || "9999";
        if (dueA !== dueB) return dueA.localeCompare(dueB);
        const rank = { High: 0, Medium: 1, Low: 2 };
        return (rank[a.priority] ?? 9) - (rank[b.priority] ?? 9);
      });
  }, [tasks, query, status, category]);

  const remaining = tasks.filter((task) => !task.completed).length;

  return (
    <div className="app">
      <header className="masthead">
        <div>
          <p className="date-kicker">{todayLabel()}</p>
          <h1>
            {remaining === 0
              ? "Desk is clear."
              : remaining === 1
                ? "One thing left."
                : `${remaining} things on the list.`}
          </h1>
        </div>
        <div className="brand">
          <strong>Daybook</strong>
          <span>A quiet daily planner</span>
        </div>
      </header>

      <main className="sheet">
        <ProgressTracker tasks={tasks} />
        <TaskForm addTask={addTask} />

        <div className="toolbar">
          <div className="search">
            <input
              type="search"
              placeholder="Find a task"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search tasks"
            />
          </div>
          <div className="chips">
            {["open", "all", "done"].map((value) => (
              <button
                key={value}
                type="button"
                className={`chip ${status === value ? "active" : ""}`}
                onClick={() => setStatus(value)}
              >
                {value === "open" ? "To do" : value === "done" ? "Done" : "All"}
              </button>
            ))}
            {["All", "Work", "Personal", "General"].map((value) => (
              <button
                key={value}
                type="button"
                className={`chip ${category === value ? "active" : ""}`}
                onClick={() => setCategory(value)}
              >
                {value}
              </button>
            ))}
            <button type="button" className="ghost" onClick={clearDone}>
              Clear done
            </button>
          </div>
        </div>

        <TaskList
          tasks={visible}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      </main>
    </div>
  );
}

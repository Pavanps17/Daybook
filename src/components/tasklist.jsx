import { useState } from "react";

function dueLabel(dueDate) {
  if (!dueDate) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${dueDate}T00:00:00`);
  const diff = Math.round((due - today) / 86400000);

  if (diff < 0) return { text: "Overdue", overdue: true };
  if (diff === 0) return { text: "Due today", overdue: false };
  if (diff === 1) return { text: "Due tomorrow", overdue: false };
  return {
    text: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
    }).format(due),
    overdue: false,
  };
}

function TaskItem({ task, updateTask, deleteTask }) {
  const [editing, setEditing] = useState(false);
  const due = dueLabel(task.dueDate);

  const saveEdit = (e) => {
    e.preventDefault();
    const text = e.currentTarget.text.value.trim();
    if (!text) return;
    updateTask(task.id, {
      text,
      dueDate: e.currentTarget.dueDate.value,
      priority: e.currentTarget.priority.value,
      category: e.currentTarget.category.value,
    });
    setEditing(false);
  };

  return (
    <li className={`task ${task.completed ? "done" : ""}`}>
      <button
        type="button"
        className="check"
        aria-label={task.completed ? "Mark as not done" : "Mark as done"}
        onClick={() => updateTask(task.id, { completed: !task.completed })}
      >
        {task.completed ? "✓" : ""}
      </button>

      {editing ? (
        <form className="edit-row" onSubmit={saveEdit}>
          <input name="text" defaultValue={task.text} />
          <div className="meta-row">
            <input name="dueDate" type="date" defaultValue={task.dueDate || ""} />
            <select name="priority" defaultValue={task.priority}>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select name="category" defaultValue={task.category}>
              <option>General</option>
              <option>Personal</option>
              <option>Work</option>
            </select>
          </div>
          <div className="actions">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="title">{task.text}</p>
          <div className="tags">
            <span className={`tag ${task.priority}`}>{task.priority}</span>
            <span className="tag cat">{task.category}</span>
            {due && (
              <span className={`tag due ${due.overdue ? "overdue" : ""}`}>
                {due.text}
              </span>
            )}
          </div>
        </div>
      )}

      {!editing && (
        <div className="actions">
          <button type="button" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button
            type="button"
            className="danger"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  );
}

export default function TaskList({ tasks, updateTask, deleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <h2>Nothing here</h2>
        <p>Add a task above, or switch filters if you already have some.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id || task.text}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

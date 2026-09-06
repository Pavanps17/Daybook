export default function TaskForm({ addTask }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const text = form.task.value.trim();
    if (!text) return;

    addTask({
      text,
      priority: form.priority.value,
      category: form.category.value,
      dueDate: form.dueDate.value || "",
      completed: false,
    });

    form.reset();
    form.priority.value = "Medium";
    form.category.value = "General";
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="row">
        <input
          name="task"
          type="text"
          placeholder="What needs doing?"
          autoComplete="off"
        />
        <button type="submit" className="primary">
          Add
        </button>
      </div>
      <div className="meta-row">
        <input name="dueDate" type="date" aria-label="Due date" />
        <select name="priority" defaultValue="Medium" aria-label="Priority">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select name="category" defaultValue="General" aria-label="Category">
          <option value="General">General</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
      </div>
    </form>
  );
}

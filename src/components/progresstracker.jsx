export default function ProgressTracker({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((task) => task.completed).length;
  const open = total - done;
  const overdue = tasks.filter((task) => {
    if (task.completed || !task.dueDate) return false;
    return task.dueDate < new Date().toISOString().slice(0, 10);
  }).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <section className="progress">
      <div className="progress-meta">
        <span>
          <strong>{done}</strong> of {total || 0} finished
        </span>
        <span>{percent}%</span>
      </div>
      <div className="bar" aria-hidden="true">
        <span style={{ width: `${percent}%` }} />
      </div>
      <div className="stats">
        <div className="stat">
          <b>{open}</b>
          <span>Still open</span>
        </div>
        <div className="stat">
          <b>{done}</b>
          <span>Finished</span>
        </div>
        <div className="stat">
          <b>{overdue}</b>
          <span>Overdue</span>
        </div>
      </div>
    </section>
  );
}

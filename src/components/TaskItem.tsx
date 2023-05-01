const TaskItem = ({ task, onRemove, onToggle }: TaskProps): JSX.Element => {
  const handleToggle = () => {
    onToggle(task.id);
  };

  const handleRemove = () => {
    onRemove(task.id);
  };

  return (
    <li className="task-item">
      <input
        className="task-item-checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      <span
        className="task-item-text"
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.text}
      </span>
      <button className="task-item-remove-button" onClick={handleRemove}>
        Remove
      </button>
    </li>
  );
};

export default TaskItem;

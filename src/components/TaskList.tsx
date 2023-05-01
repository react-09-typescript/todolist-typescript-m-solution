import React, { useState, useEffect, useRef } from 'react';
import TaskItem from './TaskItem';

const defaultProps: TaskListProps = {
  tasks: []
};

const TaskList = (props: TaskListProps): JSX.Element => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>(props.tasks);
  const isMounted = useRef(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (tasks.length === 0 && storedTasks !== null) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (isMounted.current || tasks.length !== 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    } else {
      isMounted.current = true;
    }
  }, [tasks]);

  const handleNewTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    const newId = tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1;
    const newTaskItem = { id: newId, text: newTask, completed: false };
    setTasks(existingTasks => [...existingTasks, newTaskItem]);
    setNewTask('');
  };

  const handleRemoveTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskStatusChange = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="task-list">
      <h2 className="task-list-title">Task List</h2>
      <div className="add-task-form">
        <input
          className="add-task-input"
          type="text"
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <button className="add-task-button" onClick={handleAddTask}>
          Add
        </button>
      </div>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onRemove={handleRemoveTask}
              onToggle={handleTaskStatusChange}
            />
          ))}
        </ul>
      ) : (
        <div className="task-list-empty">No tasks to display</div>
      )}
    </div>
  );
};

TaskList.defaultProps = defaultProps;

export default TaskList;

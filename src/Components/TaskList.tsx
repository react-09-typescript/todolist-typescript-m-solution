import React, { useState, useEffect } from 'react';
import TaskItem, { Task } from './TaskItem';

type TaskListProps = { tasks?: Task[] };

const TaskList = (props: TaskListProps): JSX.Element => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    if (props.tasks) {
      return props.tasks;
    }
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
    return [];
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
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

export default TaskList;

type Task = {
    id: number;
    text: string;
    completed: boolean;
  };
  
type TaskProps = {
    task: Task;
    onRemove: (id: number) => void;
    onToggle: (id: number) => void;
  };

type TaskListProps = { tasks?: Task[] };

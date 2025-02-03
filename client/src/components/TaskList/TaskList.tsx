import { useEffect, useState } from 'react';

type Task = {
  todo_id: number;
  description: string;
};

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  async function getAllTasks() {
    try {
      const response = await fetch('http://localhost:5000/todos');

      if (!response.ok) {
        throw new Error('Failed to fetch all tasks');
      }

      const data: Task[] = await response.json(); // Extract JSON data

      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.todo_id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

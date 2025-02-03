import { useEffect, useState } from 'react';
import Button from '../Button/Button';

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

  async function editTask(id: number, currentDescription: string) {
    const newDescription = prompt('Enter new description:', currentDescription);

    if (!newDescription || newDescription === currentDescription) return;

    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newDescription }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Refresh the task list after updating
      getAllTasks();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteTask(id: number) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this task?'
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete the task');
      }

      // Refresh the task list after deleting
      getAllTasks();
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
          <li key={task.todo_id}>
            {task.description}
            <Button
              title="Edit"
              onClick={() => editTask(task.todo_id, task.description)}
            />
            <Button title="Delete" onClick={() => deleteTask(task.todo_id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

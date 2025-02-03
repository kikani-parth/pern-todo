import { useState } from 'react';
import Button from '../Button/Button';
import InputBox from '../InputBox/InputBox';
import './AddTaskForm.css';

function AddTaskForm() {
  const [task, setTask] = useState('');

  async function addTask() {
    // Prevent empty tasks
    if (!task.trim()) {
      console.log('Please enter a task');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: task }),
      });

      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      setTask(''); // Clear input after adding task
      console.log('Task added successfully!');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="add-task-form">
      <InputBox task={task} setTask={setTask} />
      <Button title="Add Task" onClick={addTask} />
    </div>
  );
}

export default AddTaskForm;

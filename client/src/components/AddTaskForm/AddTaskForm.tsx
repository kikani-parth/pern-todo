import { useState } from 'react';
import Button from '../Button/Button';
import InputBox from '../InputBox/InputBox';
import { Task, addTask } from '../../utils/taskService';
import './AddTaskForm.css';

type AddTaskFormProps = {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function AddTaskForm({ setTasks }: AddTaskFormProps) {
  const [task, setTask] = useState('');

  async function handleAddTask() {
    if (!task.trim()) return;
    try {
      const newTask = await addTask(task);

      if (newTask === null) {
        console.error('Failed to add task');
        return;
      }

      setTasks((prevTasks) => [...prevTasks, newTask]); // Update the task list with the new task

      setTask(''); // Reset the input
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  }

  return (
    <div className="add-task-form">
      <InputBox task={task} setTask={setTask} />
      <Button title="Add Task" onClick={handleAddTask} className="add-btn" />
    </div>
  );
}

export default AddTaskForm;

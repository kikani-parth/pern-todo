import { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import TaskList from './components/TaskList/TaskList';
import { Task, getAllTasks } from './utils/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks().then(setTasks);
  }, []);

  return (
    <div className="container">
      <h1>PERN To-Do App</h1>
      <AddTaskForm setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;

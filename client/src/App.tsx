import Heading from './components/Heading/Heading';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import './App.css';
import TaskList from './components/TaskList/TaskList';

function App() {
  return (
    <div className="container">
      <Heading />
      <AddTaskForm />
      <TaskList />
    </div>
  );
}

export default App;

import Button from './components/Button/Button';
import Heading from './components/Heading/Heading';
import InputBox from './components/InputBox/InputBox';
import './App.css';

function App() {
  return (
    <div className="container">
      <Heading />
      <InputBox />
      <Button title="Add Task" />
    </div>
  );
}

export default App;

import './InputBox.css';

type InputBoxProps = {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
};

function InputBox({ task, setTask }: InputBoxProps) {
  return (
    <input
      className="task-input"
      placeholder="Enter your task..."
      value={task}
      onChange={(e) => setTask(e.target.value)}
    />
  );
}

export default InputBox;

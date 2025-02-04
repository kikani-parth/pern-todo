import './TaskList.css';
import Button from '../Button/Button';
import { Task, deleteTask, editTask } from '../../utils/taskService';

type TaskListProps = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function TaskList({ tasks, setTasks }: TaskListProps) {
  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this task?'
    );
    if (!confirmed) return;

    await deleteTask(id);
    setTasks((prevTasks: Task[]) =>
      prevTasks.filter((task) => task.todo_id !== id)
    );
  }

  async function handleEdit(id: number, currentDescription: string) {
    const newDescription = prompt('Enter new description:', currentDescription);
    if (!newDescription || newDescription === currentDescription) return;

    try {
      const updatedTask = await editTask(id, newDescription);

      // If updatedTask is valid, update state
      if (updatedTask) {
        setTasks((prevTasks: Task[]) =>
          prevTasks.map((task) => (task.todo_id === id ? updatedTask : task))
        );
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.todo_id} className="task-item">
            <span>*</span>
            <span className="task-text">{task.description}</span>
            <div className="task-buttons">
              <Button
                title="Edit"
                onClick={() => handleEdit(task.todo_id, task.description)}
                className="edit-btn"
              />
              <Button
                title="Delete"
                onClick={() => handleDelete(task.todo_id)}
                className="delete-btn"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

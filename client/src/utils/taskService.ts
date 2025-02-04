export type Task = {
  todo_id: number;
  description: string;
};

const BASE_URL = 'http://localhost:5000/todos'; // API base URL

// Fetch all tasks
export async function getAllTasks(): Promise<Task[]> {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error('Failed to fetch all tasks');
    }

    return await response.json(); // Extract JSON data
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Add a Task
export async function addTask(task: string): Promise<Task | null> {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: task }),
    });

    if (!response.ok) {
      throw new Error('Failed to add task');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Edit a task
export async function editTask(
  id: number,
  newDescription: string
): Promise<Task | null> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: newDescription }),
    });

    if (!response.ok) {
      throw new Error('Failed to update task');
    }

    const { updatedTodo } = await response.json();
    return updatedTodo;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Delete a task

export async function deleteTask(id: number): Promise<void> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the task');
    }
  } catch (error) {
    console.error(error);
  }
}

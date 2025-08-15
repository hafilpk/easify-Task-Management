import { useEffect, useState, useContext } from "react";
import { getTasks, createTask } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";

export default function TaskListPage() {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      const data = await getTasks(token);
      setTasks(data);
    }
    if (token) fetchTasks();
  }, [token]);

  async function handleAddTask(e) {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const taskData = { title: newTaskTitle, status: "todo" };
      const createdTask = await createTask(token, taskData);
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setNewTaskTitle("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  }

  return (
    <div>
      <h2>My Tasks</h2>

      <form onSubmit={handleAddTask} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> — {task.status} (Due: {task.due_date})
          </li>
        ))}
      </ul>
    </div>
  );
}

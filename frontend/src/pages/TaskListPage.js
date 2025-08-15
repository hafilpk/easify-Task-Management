import { useEffect, useState, useContext } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
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
      setTasks((prev) => [...prev, createdTask]);
      setNewTaskTitle("");
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  }

  async function handleStatusChange(taskId, newStatus) {
    try {
      const updatedTask = await updateTask(token, taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  }

  async function handleDelete(taskId) {
    try {
      await deleteTask(token, taskId);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  }

  return (
    <div>
      <h2>My Tasks</h2>

      {/* Add Task Form */}
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
            <strong>{task.title}</strong>
            {" — "}
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {" "}
            (Due: {task.due_date || "N/A"})
            {" "}
            <button onClick={() => handleDelete(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

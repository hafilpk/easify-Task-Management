import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getTaskById, updateTask, deleteTask } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function fetchTask() {
      try {
        const data = await getTaskById(token, id);
        setTask(data);
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    }
    if (token) fetchTask();
  }, [token, id]);

  async function handleStatusChange(e) {
    try {
      const updated = await updateTask(token, id, { status: e.target.value });
      setTask(updated);
    } catch (err) {
      console.error("Error updating task:", err);
    }
  }

  async function handleDelete() {
    try {
      await deleteTask(token, id);
      window.location.href = "/tasks";
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  }

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <h2>Task Detail</h2>
      <h3>{task.title}</h3>
      <p><strong>Description:</strong> {task.description || "No description"}</p>
      <p><strong>Status:</strong>
        <select value={task.status} onChange={handleStatusChange}>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </p>
      <p><strong>Priority:</strong> {task.priority || "N/A"}</p>
      <p><strong>Due Date:</strong> {task.due_date || "N/A"}</p>
      <p><strong>Created At:</strong> {task.created_at}</p>
      <p><strong>Updated At:</strong> {task.updated_at}</p>

      <button onClick={handleDelete}>Delete Task</button>
      <br /><br />
      <Link to="/tasks">⬅ Back to Tasks</Link>
    </div>
  );
}

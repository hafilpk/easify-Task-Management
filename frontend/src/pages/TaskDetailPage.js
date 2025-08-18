import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { getTaskById, updateTask, deleteTask } from "../services/taskService";
import { getComments, addComment, deleteComment } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";

export default function TaskDetailPage() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // fetch task
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

  // fetch comments
  useEffect(() => {
    async function fetchComments() {
      try {
        const data = await getComments(token, id);
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    }
    if (token) fetchComments();
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

  async function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const comment = await addComment(token, id, newComment);
      setComments([...comments, comment]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      await deleteComment(token, commentId);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (err) {
      console.error("Error deleting comment:", err);
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

      {/* Comments Section */}
      <h3>Comments</h3>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            <strong>{c.user}:</strong> {c.content}
            <button onClick={() => handleDeleteComment(c.id)}>❌</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Add</button>
      </form>

      <br />
      <Link to="/tasks">⬅ Back to Tasks</Link>
    </div>
  );
}

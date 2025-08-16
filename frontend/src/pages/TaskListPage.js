import { useEffect, useState, useContext } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";

export default function TaskListPage() {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("due_date");

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
  const filteredTasks =
    filterStatus === "all"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortOption === "due_date") {
      return new Date(a.due_date) - new Date(b.due_date);
    } else if (sortOption === "priority") {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
    } else if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });    

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

      {/* Filter + Sort Controls */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Filter by Status:{" "}
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </label>

        <label style={{ marginLeft: "20px" }}>
          Sort by:{" "}
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="due_date">Due Date</option>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>

      {/* Task List */}
      <ul>
        {sortedTasks.map((task) => (
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
            (Priority: {task.priority || "N/A"} — Due: {task.due_date || "N/A"})
            {" "}
            <button onClick={() => handleDelete(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
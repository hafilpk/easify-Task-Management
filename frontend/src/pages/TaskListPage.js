import { useEffect, useState, useContext } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Card,
  CardContent,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export default function TaskListPage() {
  const { token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("due_date");
  const [searchQuery, setSearchQuery] = useState("");

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
      const taskData = {
        title: newTaskTitle,
        priority: newTaskPriority,
        due_date: newTaskDueDate,
        status: "todo",
      };
      const createdTask = await createTask(token, taskData);
      setTasks((prev) => [...prev, createdTask]);
      setNewTaskTitle("");
      setNewTaskPriority("medium");
      setNewTaskDueDate("");
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

  const searchedTasks = filteredTasks.filter((task) =>
    (task.title && task.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedTasks = [...searchedTasks].sort((a, b) => {
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
    <Box sx={{ minHeight: "100vh", backgroundColor: "#c2719aff", py: 5 }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
          My Tasks
        </Typography>

        {/* Add Task Form */}
        <Box
          component="form"
          onSubmit={handleAddTask}
          sx={{ display: "flex", flexWrap: "wrap", gap: 2, mb: 3 }}
        >
          <TextField
            label="Enter new task"
            fullWidth
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            sx={{ flex: "2"}}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={newTaskPriority}
              label="Priority"
              onChange={(e) => setNewTaskPriority(e.target.value)}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Due Date"
            type="date"
            value={newTaskDueDate}
            onChange={(e) => setNewTaskDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained" startIcon={<AddIcon />}>
            Add
          </Button>
        </Box>

        {/* Filters */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortOption}
                label="Sort by"
                onChange={(e) => setSortOption(e.target.value)}
              >
                <MenuItem value="due_date">Due Date</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="title">Title</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Search tasks..."
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* Task Cards */}
        <Grid container spacing={2}>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <Grid item xs={12} key={task.id}>
                <Card
                  sx={{
                    borderRadius: "12px",
                    transition: "0.2s",
                    "&:hover": { boxShadow: 6 },
                  }}
                >
                  <CardContent
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Box>
                      <Typography variant="h6">
                        <Link to={`/tasks/${task.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                          {task.title}
                        </Link>
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Priority: {task.priority || "N/A"} — Due: {task.due_date || "N/A"}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <FormControl size="small">
                        <Select
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        >
                          <MenuItem value="todo">To Do</MenuItem>
                          <MenuItem value="in_progress">In Progress</MenuItem>
                          <MenuItem value="done">Done</MenuItem>
                        </Select>
                      </FormControl>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="white" sx={{ mt: 2, textAlign: "center" }}>
              No tasks found.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

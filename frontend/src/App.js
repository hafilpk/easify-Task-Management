import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import TaskListPage from "./pages/TaskListPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskListPage />} />
        <Route path="/tasks/:id" element={<TaskDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;

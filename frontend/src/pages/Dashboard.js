import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Easify Task Management</h1>
      <p>Welcome to your dashboard! Choose an option below:</p>

      <ul>
        <li><Link to="/tasks">View Tasks</Link></li>
        <li><Link to="/projects">View Projects</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
}

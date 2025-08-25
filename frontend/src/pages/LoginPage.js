import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("auth/jwt/create/", form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center text-center p-5">
          <h1 className="display-4 fw-bold">Easify</h1>
          <p className="lead text-muted">
            Organize your tasks. Stay productive. Achieve more.
          </p>
        </div>
        
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card shadow p-4" style={{ width: "350px" }}>
            <h3 className="text-center mb-3">Login</h3>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <p className="mt-3 text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-decoration-none">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

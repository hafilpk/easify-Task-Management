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
    <div
      className="container-fluid d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ce4784ff 0%, #78063fff 100%)",
        color: "#fff",
      }}
    >
      <div className="row w-100">
        {/* Left Section - Branding */}
        <div className="col-md-6 d-flex flex-column justify-content-center text-center p-5 text-white">
          <h1 className="display-3 fw-bold">Easify</h1>
          <p className="lead" style={{ fontSize: "1.2rem" }}>
            Organize your tasks. Stay productive. Achieve more.
          </p>
        </div>

        {/* Right Section - Login Card */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div
            className="card shadow-lg p-4"
            style={{
              width: "360px",
              borderRadius: "20px",
              backgroundColor: "#ffffff",
            }}
          >
            <h3 className="text-center mb-4 text-danger fw-bold">Login</h3>
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
                  style={{ borderRadius: "10px" }}
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
                  style={{ borderRadius: "10px" }}
                />
              </div>
              <button
                type="submit"
                className="btn w-100"
                style={{
                  background: "linear-gradient(90deg, #9a4b80ff, #cf077fff)",
                  border: "none",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                Login
              </button>
            </form>
            <p className="mt-3 text-center text-muted">
              Don’t have an account?{" "}
              <Link to="/register" className="text-decoration-none fw-bold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

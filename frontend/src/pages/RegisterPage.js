import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("auth/users/", form);
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);
      if (err.response?.data) {
        const errorMessages = Object.values(err.response.data).flat().join(" ");
        setError(errorMessages || "Registration failed. Try again.");
      } else {
        setError("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center text-center p-5">
          <h1 className="display-4 fw-bold">Easify</h1>
          <p className="lead text-muted">
            Create your free account and start managing tasks effortlessly.
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card shadow p-4" style={{ width: "400px" }}>
            <h3 className="text-center mb-3">Register</h3>
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
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={form.re_password}
                  onChange={(e) => setForm({ ...form, re_password: e.target.value })}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </form>
            <p className="mt-3 text-center">
              Already have an account?{" "}
              <Link to="/" className="text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

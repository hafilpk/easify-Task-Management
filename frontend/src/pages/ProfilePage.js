import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
  const { token, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    timezone: "",
    password: ""
  });

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("http://localhost:8000/api/core/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setFormData({ 
        first_name: data.first_name || "", 
        last_name: data.last_name || "", 
        email: data.email || "", 
        timezone: data.timezone || "UTC",
        password: ""
      });
    }
    if (token) fetchProfile();
  }, [token]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();
    await fetch("http://localhost:8000/api/core/profile/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    alert("Profile updated successfully!");
  }

  return (
    <div>
      <h2>My Profile</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>First Name:</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Timezone:</label>
          <input type="text" name="timezone" value={formData.timezone} onChange={handleChange} />
        </div>
        <div>
          <label>New Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      <button onClick={logout} style={{ marginTop: "1rem", color: "red" }}>
        Logout
      </button>
    </div>
  );
}

import axios from "axios";

const API_URL = "http://localhost:8000/api/tasks/";

export async function getTasks(token) {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function createTask(token, taskData) {
  const res = await axios.post(API_URL, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
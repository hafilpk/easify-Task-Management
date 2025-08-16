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

export async function updateTask(token, taskId, updatedFields) {
  const res = await axios.patch(`${API_URL}${taskId}/`, updatedFields, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function deleteTask(token, taskId) {
  await axios.delete(`${API_URL}${taskId}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getTaskById(token, id) {
  const res = await axios.get(`${API_URL}${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
import API from "./api";

export const getTasks = async (token) => {
  const res = await API.get("/tasks/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTask = async (taskData, token) => {
  const res = await API.post("/tasks/", taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

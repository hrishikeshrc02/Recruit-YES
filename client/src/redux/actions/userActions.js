import axios from "axios";
import { message } from "antd";
import { jwtDecode } from "jwt-decode"; // Correct import

export const registerUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/register", values);
    message.success("User Registered Successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("Something went wrong, please try later");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const loginUser = (values) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/login", values);
    const token = response.data.token;
    const user = jwtDecode(token); // Decode the token to get user info

    message.success("Login success");
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("Invalid credentials");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const updateUser = (values) => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    message.error("User not logged in");
    return;
  }

  const user = jwtDecode(token); // Decode the token to get user info
  values._id = user.userId;

  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/update", values, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updatedToken = response.data.token;
    const updatedUser = jwtDecode(updatedToken); // Decode the new token to get updated user info

    message.success("User updated successfully");
    localStorage.setItem("token", updatedToken);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    message.error("Something went wrong, please try later");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/users/getallusers", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};


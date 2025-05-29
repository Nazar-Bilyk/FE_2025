import { getCurrentUser, logout } from "../../services";
import { setUserData, removeUserData } from "../slices/userSlice";

export const getUserThunk = () => async (dispatch) => {
  try {
    const response = await getCurrentUser(localStorage.getItem("token"));
    dispatch(setUserData(response.result));
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutThunk = (token) => async (dispatch) => {
  try {
    await logout(token);

    dispatch(removeUserData());
    return true;
  } catch (error) {
    console.error("Logout error:", error);
    dispatch(removeUserData());
    throw error;
  }
};

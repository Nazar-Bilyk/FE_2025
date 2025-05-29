import { getAuthors, createAuthor } from "../../services";
import { setAuthors, saveAuthor } from "../slices/authorsSlice";

export const getAuthorsThunk = () => async (dispatch) => {
  try {
    const response = await getAuthors();
    dispatch(setAuthors(response.result));
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createAuthorThunk = (authorData) => async (dispatch) => {
  try {
    const response = await createAuthor(
      authorData,
      localStorage.getItem("token")
    );
    dispatch(saveAuthor(response.result));
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
};

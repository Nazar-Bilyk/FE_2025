import {
  getCourses,
  createCourse,
  deleteCourseService,
  updateCourseService,
} from "../../services";
import {
  setCourses,
  saveCourse,
  deleteCourse,
  updateCourse,
} from "../slices/coursesSlice";

export const getCoursesThunk = (arg) => async (dispatch) => {
  try {
    const response = await getCourses();
    dispatch(setCourses(response.result));
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createCourseThunk = (courseData) => async (dispatch) => {
  try {
    const response = await createCourse(
      courseData,
      localStorage.getItem("token")
    );
    dispatch(saveCourse(response.result));
    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCourseThunk = (courseId) => async (dispatch) => {
  try {
    await deleteCourseService(courseId, localStorage.getItem("token"));
    dispatch(deleteCourse(courseId));
    return courseId;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCourseThunk = (course) => async (dispatch) => {
  try {
    const response = await updateCourseService(
      course,
      localStorage.getItem("token")
    );

    dispatch(updateCourse(response.result));

    return response.result;
  } catch (error) {
    throw new Error(error.message);
  }
};

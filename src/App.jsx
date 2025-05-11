import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Courses } from "./components/Courses";
import { CourseInfo } from "./components/CourseInfo";
import { Registration } from "./components/Registration/Registration";
import { Login } from "./components/Login/Login";
import { CourseForm } from "./components/CourseForm/CourseForm";
import { mockedAuthorsList, mockedCoursesList } from "./constants";
import styles from "./App.module.css";

// Module 1:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * add next components to the App component: Header, Courses and CourseInfo
// * pass 'mockedAuthorsList' and 'mockedCoursesList' to the Courses and CourseInfo components
// * use hook useState for saving selected courseId [showCourseId, handleShowCourse]

// Module 2:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * remove useState for selected courseId
// * use hook useState for storing list of courses and authors
// * import Routes and Route from 'react-router-dom'
// * Add Routes to the container div (do not include Header to the Routes since header will not be changed with pages)
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#add-the-router-to-the-app-component

// Module 3:
// * the App component and BrowserRouter components should be wrapped with Redux 'Provider' in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * use selector from store/selectors.js to get user token from store
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component
// * get authorized user info by 'user/me' GET request if 'localStorage' contains token

function App() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  // Redirect logic
  if (
    !token &&
    location.pathname !== "/login" &&
    location.pathname !== "/registration"
  ) {
    return <Navigate to="/login" replace />;
  }
  if (
    token &&
    (location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/registration")
  ) {
    return <Navigate to="/courses" replace />;
  }

  const createCourse = (newCourse) => {
    mockedCoursesList.push(newCourse);
  };

  const createAuthor = (newAuthor) => {
    mockedAuthorsList.push(newAuthor);
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.container}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/courses"
            element={
              <Courses
                coursesList={mockedCoursesList}
                authorsList={mockedAuthorsList}
              />
            }
          />
          <Route
            path="/courses/add"
            element={
              <CourseForm
                authorsList={mockedAuthorsList}
                coursesList={mockedCoursesList}
                createCourse={createCourse}
                createAuthor={createAuthor}
              />
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <CourseInfo
                coursesList={mockedCoursesList}
                authorsList={mockedAuthorsList}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/courses" : "/login"} replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

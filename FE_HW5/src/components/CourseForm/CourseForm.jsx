// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * add functionality to create new course with:
// //   ** title
// //   ** description
// //   ** duration (user enters in minutes, you should map in format «hh:mm»)
// //   ** existing authors (use 'authorsList' prop)
// //   ** new created author (create field and button, update 'authorsList')
// //   ** user should be able to remove author from the course
// //   ** add validation to the fields
// //   ** add new course to the 'coursesList' and navigate to the '/courses' page => new course should be in the courses list
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#add-new-course

// // Module 3.
// // * remove props - authorsList, createCourse, createAuthor
// // * use selector from store/selectors.js to get authorsList from store
// // * save new course to the store. Use action 'saveCourse' from 'src/store/slices/coursesSlice'
// // * save new author to the store. Use action 'saveAuthor' from 'src/store/slices/authorsSlice'
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#add-new-course

// // Module 4.
// // * render this component only for ADMIN user
// // * in this module you should separate functionality for this component:
// //   ** create mode:
// //     * form for the course creation should be opened by 'courses/add' route by 'ADD NEW COURSE' button click (as before)
// //     * make a request to save new course
// //     * use 'createCourse' service from 'src/services.js' and 'createCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
// //     * use 'createAuthor ' service from 'src/services.js' and 'createAuthorThunk' thunk from 'src/store/thinks/authorsThunk.js'
// //     * save new course to the store after success response
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-4/home-task/components#add-new-course
// //   ** update mode:
// //     * form should be opened by route '/courses/update/:courseId' route by 'update' button click
// //     * appropriate forms field should be prefilled with course's info
// //     * user should have ability to modify course information in the fields and change authors list
// //     * make a request to save updated course
// //     * use 'updateCourseService' from 'src/services.js' and 'updateCourseThunk' thunk from 'src/store/thinks/coursesThunk.js'
// //     save updated course to the store after success response.
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-4/home-task/components#update-course

// // Module 5:
// // * proposed cases for unit tests:
// //   ** CourseForm should show authors lists (all and course authors).
// //   **  CourseForm 'Create author' button click should call dispatch.
// //   **  CourseForm 'Add author' button click should add an author to the course authors list.
// //   **  CourseForm 'Delete author' button click should delete an author from the course list.

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { AuthorItem } from "./components/AuthorItem/AuthorItem";
import { getCourseDuration } from "../../helpers/getCourseDuration";
import { saveCourse } from "../../store/slices/coursesSlice";
import { CreateAuthor } from "./components";

export const CourseForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authorsList = useSelector((state) => state.authors);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [courseAuthors, setCourseAuthors] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (
    fields = { title, description, duration, courseAuthors }
  ) => {
    const newErrors = {};

    if (!fields.title || fields.title.trim().length < 2) {
      newErrors.title = "Title is required (min 2 chars).";
    }

    if (!fields.description || fields.description.trim().length < 2) {
      newErrors.description = "Description is required (min 2 chars).";
    }

    if (
      !fields.duration ||
      isNaN(fields.duration) ||
      Number(fields.duration) <= 0
    ) {
      newErrors.duration = "Duration must be a positive number.";
    }

    if (!fields.courseAuthors || fields.courseAuthors.length === 0) {
      newErrors.courseAuthors = "Author list is empty.";
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate({ title, description, duration, courseAuthors }));
  };

  const handleChange = (setter, field) => (e) => {
    const value =
      field === "duration" ? e.target.value.replace(/\D/g, "") : e.target.value;
    setter(value);
    if (touched[field] || submitted) {
      setErrors(
        validate({
          title: field === "title" ? value : title,
          description: field === "description" ? value : description,
          duration: field === "duration" ? value : duration,
          courseAuthors,
        })
      );
    }
  };

  const handleAddAuthor = (author) => {
    setCourseAuthors([...courseAuthors, author]);
  };

  const handleRemoveAuthor = (author) => {
    setCourseAuthors(courseAuthors.filter((a) => a.id !== author.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({
      title: true,
      description: true,
      duration: true,
      courseAuthors: true,
    });
    if (Object.keys(validationErrors).length > 0) return;
    const newCourse = {
      id: String(Date.now()),
      title: title.trim(),
      description: description.trim(),
      creationDate: new Date().toLocaleDateString("en-GB").replace(/\//g, "/"),
      duration: Number(duration),
      authors: courseAuthors.map((a) => a.id),
    };
    dispatch(saveCourse(newCourse));
    navigate("/courses");
  };

  return (
    <div className={styles.container}>
      <h2>Course Edit/Create Page</h2>
      <form onSubmit={handleSubmit}>
        <Input
          labelText="Title"
          placeholderText="Input text"
          value={title}
          onChange={handleChange(setTitle, "title")}
          onBlur={() => handleBlur("title")}
          error={touched.title || submitted ? errors.title : ""}
          data-testid="titleInput"
        />
        <label>
          Description
          <textarea
            className={`${styles.description} ${
              touched.description || submitted
                ? errors.description
                  ? styles.inputError
                  : ""
                : ""
            }`}
            value={description}
            onChange={handleChange(setDescription, "description")}
            onBlur={() => handleBlur("description")}
            data-testid="descriptionTextArea"
          />
          {(touched.description || submitted) && errors.description && (
            <div className={styles.error}>{errors.description}</div>
          )}
        </label>
        <div className={styles.infoWrapper}>
          <div>
            <div className={styles.duration}>
              <Input
                labelText="Duration"
                value={duration}
                onChange={handleChange(setDuration, "duration")}
                onBlur={() => handleBlur("duration")}
                error={touched.duration || submitted ? errors.duration : ""}
                data-testid="durationInput"
                maxLength={4}
              />
              <p>{getCourseDuration(Number(duration) || 0)}</p>
            </div>
            <h2>Authors</h2>
            <CreateAuthor />
            <div className={styles.authorsContainer}>
              <h3>Authors List</h3>
              {authorsList.length === 0 ? (
                <p className={styles.notification}>Authors list is empty</p>
              ) : (
                authorsList.map((author) => (
                  <AuthorItem
                    key={author.id}
                    name={author.name}
                    onClick={() => handleAddAuthor(author)}
                    buttonText="Add author"
                    dataTestId="addAuthor"
                    disabled={courseAuthors.some((a) => a.id === author.id)}
                  />
                ))
              )}
            </div>
          </div>
          <div className={styles.courseAuthorsContainer}>
            <h2>Course authors</h2>
            {courseAuthors.map((author) => (
              <AuthorItem
                key={author.id}
                name={author.name}
                onClick={() => handleRemoveAuthor(author)}
                buttonText="Delete author"
                dataTestId="deleteAuthor"
              />
            ))}
            {(touched.courseAuthors || submitted) && errors.courseAuthors && (
              <div className={styles.error}>{errors.courseAuthors}</div>
            )}
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <Link to="/courses">
            <Button buttonText="CANCEL" type="button" />
          </Link>
          <Button
            buttonText="CREATE COURSE"
            data-testid="createCourseButton"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

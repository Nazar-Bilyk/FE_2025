// This component shows information about the current chosen course.

// Module 1.
// * Use template to show course's information:
// ** ID of course;
// ** Title;
// ** Description;
// ** Duration;
// ** List of authors;
// ** Creation date;
// * use <Button /> component to replace CourseInfo component with Courses component
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#course-info

// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#course-info

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

import React from "react";
import { Button } from "../../common/Button";
import { formatCreationDate, getCourseDuration } from "../../helpers";

import styles from "./styles.module.css";

// props description
// * 'coursesList' - list of all courses. You need it to get chosen course from the list
// * 'authorsList' - list of all authors. You need it to get authors' names for chosen course
// * 'showCourseId' - id of chosen course. Use it to find needed course on the 'coursesList'.
export const CourseInfo = ({
  coursesList,
  authorsList,
  onBack,
  showCourseId,
}) => {
  // Find the selected course by ID
  const course = coursesList.find((course) => course.id === showCourseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  // Get the course details
  const { title, description, id, duration, creationDate, authors } = course;

  // Format the duration
  const formattedDuration = getCourseDuration(duration);

  // Format the creation date
  const formattedDate = formatCreationDate(creationDate);

  // Get the course authors
  const courseAuthors = authors
    .map((authorId) => {
      const author = authorsList.find((author) => author.id === authorId);
      return author ? author.name : "";
    })
    .filter((name) => name);

  return (
    <div className={styles.container} data-testid="courseInfo">
      <h1>{title}</h1>
      <div className={styles.courseInfo}>
        <p className={styles.description}>{description}</p>
        <div>
          <p>
            <b>ID: </b>
            {id}
          </p>
          <p>
            <b>Duration: </b>
            {formattedDuration}
          </p>
          <p>
            <b>Created: </b>
            {formattedDate}
          </p>
          <div className={styles.authorsContainer}>
            <b>Authors: </b>
            <ul className={styles.authorsList}>
              {courseAuthors.map((authorName, index) => (
                <li key={index}>{authorName}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.backButton}>
        <Button
          buttonText="BACK"
          handleClick={onBack}
          data-testid="backButton"
        />
      </div>
    </div>
  );
};

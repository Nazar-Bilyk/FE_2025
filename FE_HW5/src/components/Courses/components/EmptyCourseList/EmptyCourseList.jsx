import React from "react";
import { Button } from "../../../../common/Button";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const EmptyCourseList = ({ onAddCourse }) => {
  return (
    <div className={styles.emptyContainer} data-testid="emptyContainer">
      <h2 className={styles.emptyText}>Your List Is Empty</h2>
      <p className={styles.emptySubText}>
        Please use "Add New Course" button to add your first course
      </p>

      <Link to="/courses/add">
        <Button buttonText="ADD NEW COURSE" data-testid="addCourse" />
      </Link>
    </div>
  );
};

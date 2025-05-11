import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../../common/Button";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const EmptyCourseList = () => {
  const userRole = useSelector((state) => state.user.role);
  const isAdmin = userRole === "admin";

  return (
    <div className={styles.emptyContainer} data-testid="emptyContainer">
      <h2 className={styles.emptyText}>Your List Is Empty</h2>
      <p className={styles.emptySubText}>
        Please use "Add New Course" button to add your first course
      </p>

      {isAdmin ? (
        <Link to="/courses/add">
          <Button buttonText="ADD NEW COURSE" data-testid="addCourse" />
        </Link>
      ) : (
        <p className={styles.permissionMessage}>
          You don't have permissions to create a course. Please log in as ADMIN
        </p>
      )}
    </div>
  );
};

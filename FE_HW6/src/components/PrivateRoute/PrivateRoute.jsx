// // Module 1, 2, 3. You don't need to do anything with this component (we had to comment this component for tests)

// // Module 4.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * find example https://react-fundamentals-tasks.vercel.app/docs/module-4/private-routes
// // * use 'PrivateRoute' to navigate to the routes:
// //   ** '/courses/add';
// //   ** '/courses/update/:courseId'.
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-4/home-task/components#private-route-new-component

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const userRole = useSelector((state) => state.user.role);

  // Only allow access if user role is ADMIN
  if (userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

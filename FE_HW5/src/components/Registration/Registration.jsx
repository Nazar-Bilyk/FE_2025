// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)
//
// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2932-219&t=OXbHXwMixWTtxRSw-1
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2932-257&t=OXbHXwMixWTtxRSw-1
// // * render this component by route '/registration'
// // * submit form data and make POST API request '/registration'.
// // * after successful registration navigates to '/login' route.
// // * component should have a link to the Login page (see design)
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#registration-new-component
//
// import React from "react";

// import styles from "./styles.module.css";

// export const Registration = () => {
//   // write your code here

//   return (
//     <div className={styles.container}>
//       <h1>Registration</h1>
//       <div className={styles.formContainer}>
//         <form onSubmit={handleSubmit}>
//           // reuse Input component for email field
//           // reuse Input component for name field
//           // reuse Input component for password field
//           // reuse Button component for 'Login' button
//         </form>
//         <p>
//           If you have an account you may&nbsp; // use <Link /> component for navigation to Login page
//         </p>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { createUser } from "../../services";

export const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const validate = (fields = { name, email, password }) => {
    const newErrors = {};

    if (!fields.name || fields.name.trim().length < 2) {
      newErrors.name = "Name is required (min 2 chars).";
    }

    if (!fields.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (!fields.password) {
      newErrors.password = "Password is required.";
    } else if (fields.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!/[a-zA-Z]/.test(fields.password)) {
      newErrors.password = "Password must contain at least one letter.";
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate({ name, email, password }));
  };

  const handleChange = (setter, field) => (e) => {
    setter(e.target.value);
    if (touched[field] || submitted) {
      setErrors(
        validate({
          name: field === "name" ? e.target.value : name,
          email: field === "email" ? e.target.value : email,
          password: field === "password" ? e.target.value : password,
        })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setApiError("");
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ name: true, email: true, password: true });
    if (Object.keys(validationErrors).length > 0) return;
    try {
      await createUser({ name, email, password });
      navigate("/login");
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            labelText="Name"
            placeholderText="Input text"
            value={name}
            onChange={handleChange(setName, "name")}
            onBlur={() => handleBlur("name")}
            error={touched.name || submitted ? errors.name : ""}
            data-testid="registration-name"
          />
          <Input
            labelText="Email"
            placeholderText="Input text"
            value={email}
            onChange={handleChange(setEmail, "email")}
            onBlur={() => handleBlur("email")}
            error={touched.email || submitted ? errors.email : ""}
            data-testid="registration-email"
          />
          <Input
            labelText="Password"
            placeholderText="Input text"
            value={password}
            onChange={handleChange(setPassword, "password")}
            onBlur={() => handleBlur("password")}
            error={touched.password || submitted ? errors.password : ""}
            type="password"
            data-testid="registration-password"
          />
          {apiError && <div className={styles.error}>{apiError}</div>}
          <Button buttonText="REGISTER" type="submit" />
        </form>
        <p>
          If you have an account you may{" "}
          <Link to="/login">
            <b>Login</b>
          </Link>
        </p>
      </div>
    </div>
  );
};

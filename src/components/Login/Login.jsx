// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2927-216&t=OXbHXwMixWTtxRSw-1
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2932-191&t=OXbHXwMixWTtxRSw-1
// // * render this component by route '/login'
// // * use login service to submit form data and make POST API request '/login'.
// // * component should have a link to the Registration page (see design)
// // * save token from API after success login to localStorage.
// // ** PAY ATTENTION ** token should be saved to localStorage inside login handler function after login service response
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#login-new-component

// // Module 3.
// // * use 'setUserData' from 'userSlice.js' to save user's name, token and email to the store after success login.
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#login-component

// // Module 4.
// // * use 'setUserData' from 'userSlice.js' to add user's data to store. (DO NOT use 'user/me' [GET] request)

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { login } from "../../services";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const validate = (fields = { email, password }) => {
    const newErrors = {};
    if (!fields.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(fields.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!fields.password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate({ email, password }));
  };

  const handleChange = (setter, field) => (e) => {
    setter(e.target.value);
    if (touched[field] || submitted) {
      setErrors(
        validate({
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
    setTouched({ email: true, password: true });

    if (Object.keys(validationErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    try {
      const result = await login({ email, password });
      localStorage.setItem("token", result.result);
      navigate("/courses");
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <Input
            labelText="Email"
            placeholderText="Input text"
            value={email}
            onChange={handleChange(setEmail, "email")}
            onBlur={() => handleBlur("email")}
            error={touched.email || submitted ? errors.email : ""}
            data-testid="login-email"
          />
          <Input
            labelText="Password"
            placeholderText="Input text"
            value={password}
            onChange={handleChange(setPassword, "password")}
            onBlur={() => handleBlur("password")}
            error={touched.password || submitted ? errors.password : ""}
            type="password"
            data-testid="login-password"
          />
          {apiError && <div className={styles.error}>{apiError}</div>}
          <Button buttonText="LOGIN" />
        </form>
        <p>
          If you don't have an account you may{" "}
          <Link to="/registration">
            <b>Registration</b>
          </Link>
        </p>
      </div>
    </div>
  );
};

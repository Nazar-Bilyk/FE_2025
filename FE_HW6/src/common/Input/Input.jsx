// Module 1.
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#create-input-component

import React from "react";

import styles from "./styles.module.css";

export const Input = ({
  placeholderText,
  labelText,
  onChange,
  value,
  onBlur,
  error,
  type,
  "data-testid": dataTestId,
  maxLength,
}) => (
  <label className={styles.label}>
    {labelText}
    <input
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      type={type}
      placeholder={placeholderText}
      className={`${styles.input} ${error ? styles.inputError : ""}`}
      data-testid={dataTestId}
      maxLength={maxLength}
    />
    {error && <div className={styles.error}>{error}</div>}
  </label>
);

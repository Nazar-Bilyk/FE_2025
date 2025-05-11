import React from "react";
import styles from "./styles.module.css";
import { Button } from "../../../../common";

export const AuthorItem = ({
  name,
  onClick,
  buttonText,
  dataTestId,
  disabled,
}) => (
  <div className={styles.authorItem} data-testid="authorItem">
    <span>{name}</span>
    <Button
      buttonText={buttonText}
      handleClick={onClick}
      data-testid={dataTestId}
      disabled={disabled}
      type="button"
    />
  </div>
);

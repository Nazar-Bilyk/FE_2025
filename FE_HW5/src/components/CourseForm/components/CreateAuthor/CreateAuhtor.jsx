// Module 1.
// You don't need this component for Module 1.

// Module 2.
// * Uncomment component code with imports
// * Use this component for author creation functionality
// * Pass callback 'onCreateAuthor' from CourseForm.jsx to return author's info {id: string, name: string}

// Module 3.
// Remove 'onCreateAuthor' from props => use 'dispatch' and 'saveAuthor' from 'authorsSlice.js' to save new author to the store

import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Input } from "../../../../common";
import { useDispatch } from "react-redux";
import { saveAuthor } from "../../../../store/slices/authorsSlice";

export const CreateAuthor = () => {
  const [authorName, setAuthorName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleCreateAuthor = () => {
    if (!authorName.trim() || authorName.trim().length < 2) {
      setError({ authorName: "Author name is required (min 2 chars)." });
      return;
    }

    const newAuthor = { id: String(Date.now()), name: authorName.trim() };
    setAuthorName("");

    dispatch(saveAuthor(newAuthor));
  };
  return (
    <div className={styles.authorsContainer}>
      <Input
        labelText="Author Name"
        placeholderText="Input text"
        value={authorName}
        error={error || ""}
        onChange={(e) => setAuthorName(e.target.value)}
        data-testid="createAuthorInput"
      />
      <Button
        buttonText="CREATE AUTHOR"
        handleClick={handleCreateAuthor}
        data-testid="createAuthorButton"
        type="button"
      />
    </div>
  );
};

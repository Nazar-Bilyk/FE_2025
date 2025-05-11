export const createUser = async (data) => {
  const response = await fetch("http://localhost:4000/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.errors || "Registration failed");
  }

  return await response.json();
};

export const login = async (data) => {
  const response = await fetch("http://localhost:4000/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.result || "Login failed");
  }

  return await response.json();
};

export const logout = async () => {
  const response = await fetch("http://localhost:4000/logout", {
    method: "DELETE",
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }

  return await response.json();
};

export const getCurrentUser = async (token) => {
  const response = await fetch("http://localhost:4000/users/me", {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }

  return await response.json();
};

export const getCourses = async () => {
  const response = await fetch("http://localhost:4000/courses/all", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  return await response.json();
};

export const getAuthors = async () => {
  const response = await fetch("http://localhost:4000/authors/all", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch authors");
  }

  return await response.json();
};

export const createCourse = async (courseData, token) => {
  const response = await fetch("http://localhost:4000/courses/add", {
    method: "POST",
    body: JSON.stringify(courseData),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create course");
  }

  return await response.json();
};

export const createAuthor = async (authorData, token) => {
  const response = await fetch("http://localhost:4000/authors/add", {
    method: "POST",
    body: JSON.stringify(authorData),
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create author");
  }

  return await response.json();
};

export const deleteCourseService = async (courseId, token) => {
  const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete course");
  }

  return await response.json();
};

export const updateCourseService = async (courseData, token) => {
  console.log(courseData);
  const response = await fetch(
    `http://localhost:4000/courses/${courseData.id}`,
    {
      method: "PUT",
      body: JSON.stringify(courseData),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update course");
  }

  return await response.json();
};

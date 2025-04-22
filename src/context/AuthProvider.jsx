import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const url = "https://localhost:7102";

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setCurrentUser(JSON.parse(user));
    }

    setLoading(false);
  }, []);

  // Register function
  const register = async (username, email, password) => {
    try {
      setError("");
      const response = await fetch(`${url}/api/Auth/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return { success: true, message: data.message };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  // Login function
  const login = async (username, password) => {
    try {
      setError("");
      const response = await fetch(`${url}/api/Auth/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the token and user data
      localStorage.setItem("token", data.data);

      // Create user object
      const user = {
        username,
        token: data.data,
      };

      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

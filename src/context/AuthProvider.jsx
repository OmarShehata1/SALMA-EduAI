import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const url = "http://localhost:5000"; // Keep your original base URL

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
  const register = async (name, email, password, role) => {
    try {
      setError("");
      const response = await fetch(`${url}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Store the token and user data
      console.log(data.token);
      localStorage.setItem("token", data.token);
      // Try to extract userId from token if available
      let userId =null
      if (data.token) {
        try {
          const decoded = jwtDecode(data.token);
          userId = decrementObjectIdCounter(decoded.id) || null;
        } catch (e) {
          console.warn("Could not decode JWT token", e);
        }
      }
      // Create user object
      const user =  {
        name,
        email,
        role,
        token: data.token,
        id: userId, // Include the ID if available
      };

      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);

      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    }
  };
  function decrementObjectIdCounter(objectIdString, decrement = 2) {
    const hexStr = objectIdString.toString();
    const prefix = hexStr.slice(0, 18);
    const counter = parseInt(hexStr.slice(18), 16);
    const newCounter = Math.max(0, counter - decrement);
    return prefix + newCounter.toString(16).padStart(6, "0");
  }

  // Login function
  const login = async (email, password) => {
    try {
      setError("");
      const response = await fetch(`${url}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Extract user ID from response or JWT
      // You might need to decode the JWT to get the user ID
      let userId = null;

      // Option 1: If the ID is directly provided in the response
      if (data.userId || data._id || data.id) {
        userId =
          data.userId || data._id || data.id;
      }
      // Option 2: If you need to decode the JWT token to get the ID
      else if (data.token) {
        // Simple JWT decoding (middle part contains payload)
        try {
          const decoded = jwtDecode(data.token);
          userId = decrementObjectIdCounter(decoded.id);
          console.log("Decoded JWT:", decoded);
          console.log("User ID from JWT:", userId);
        } catch (e) {
          console.warn("Could not decode JWT token", e);
        }
      }

      // Store the token
      localStorage.setItem("token", data.token);

      // Create user object with ID
      const user = {
        email,
        token: data.token,
        id: userId, // Store the ID explicitly
        role: data.role // Default role if not provided
        // Add other user fields as needed
      };

      localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);

      console.log("Auth: User logged in with ID:", userId);

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
    sessionStorage.removeItem("selectedQuestions");
    setCurrentUser(null);
    // Refresh the page after logout
    window.location.href = "/";
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

// src/services/apiService.js
import axios from "axios";

const API_URL = "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - adds auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 Unauthorized and we haven't already tried to refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      // You could implement token refresh logic here if you have refresh tokens

      // For now, we'll just log the user out if their token is invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Student-related API functions
export const studentApi = {
  // Get student by ID
  getStudentById: async (studentId) => {
    try {
      const response = await apiClient.get(`/students/${studentId}`);
      return response.data; // Expected format: { student: {...} }
    } catch (error) {
      console.error("Error fetching student by ID:", error);
      throw error;
    }
  },

  // Search students by name/email
  searchStudents: async (query) => {
    try {
      const response = await apiClient.get(`/students/search?q=${encodeURIComponent(query)}`);
      return response.data; // Expected format: { students: [...] }
    } catch (error) {
      console.error("Error searching students:", error);
      throw error;
    }
  },

  // Get all students for a specific teacher
  getTeacherStudents: async (teacherId) => {
    try {
      const response = await apiClient.get(`/teachers/${teacherId}/students`);
      return response.data; // Expected format: { students: [...] }
    } catch (error) {
      console.error("Error fetching teacher's students:", error);
      throw error;
    }
  },

  // Add student to teacher's class
  addStudentToTeacher: async (teacherId, studentId) => {
    try {
      const response = await apiClient.post(`/teachers/${teacherId}/students`, {
        studentId
      });
      return response.data;
    } catch (error) {
      console.error("Error adding student to teacher:", error);
      throw error;
    }
  }
};

// Teacher-related API functions
export const teacherApi = {
  // Get teacher subjects
  getTeacherSubjects: async (teacherId) => {
    try {
      const response = await apiClient.get(`/teachers/${teacherId}/subjects`);
      return response.data; // Expected format: { teacher_name: string, subjects: [{id, name, students_count, exams_count}], message?: string }
    } catch (error) {
      console.error("Error fetching teacher subjects:", error);
      throw error;
    }
  },

  // Add subject to teacher
  addSubjectToTeacher: async (teacherId, name) => {
    try {
      const response = await apiClient.post(`/teachers/${teacherId}/subjects`, {
        name
      });
      return response.data; // Expected format: { message: string, teacher: {...} }
    } catch (error) {
      console.error("Error adding subject to teacher:", error);
      throw error;
    }
  },

  // Get students for a teacher's subject
  getSubjectStudents: async (teacherId, subjectId) => {
    try {
      const response = await apiClient.get(`/teachers/${teacherId}/subjects/${subjectId}/students`);
      return response.data; // Expected format: { subject: {id, name}, students: [...], message?: string }
    } catch (error) {
      console.error("Error fetching subject students:", error);
      throw error;
    }
  },

  // Get exams a student took for a specific subject
  getStudentSubjectExams: async (teacherId, subjectId, studentId) => {
    try {
      const response = await apiClient.get(`/teachers/${teacherId}/subjects/${subjectId}/students/${studentId}/exams`);
      return response.data; // Expected format: { subject: {id, name}, student: {id, name}, exams: [...], message?: string }
    } catch (error) {
      console.error("Error fetching student subject exams:", error);
      throw error;
    }
  }
};

export default apiClient;

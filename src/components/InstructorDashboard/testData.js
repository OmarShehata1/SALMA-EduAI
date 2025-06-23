// Test data for the Add Student functionality
// This shows the expected API response format

export const mockStudentSearchResults = {
  students: [
    {
      _id: "507f1f77bcf86cd799439011",
      name: "John Smith",
      email: "john.smith@university.edu",
      studentId: "ST2024001",
      major: "Computer Science",
      year: "2nd Year",
      avatar: "https://via.placeholder.com/60?text=JS"
    },
    {
      _id: "507f1f77bcf86cd799439012",
      name: "Sarah Johnson",
      email: "sarah.johnson@university.edu", 
      studentId: "ST2024002",
      major: "Mathematics",
      year: "3rd Year",
      avatar: "https://via.placeholder.com/60?text=SJ"
    },
    {
      _id: "507f1f77bcf86cd799439013",
      name: "Michael Brown",
      email: "michael.brown@university.edu",
      studentId: "ST2024003", 
      major: "Physics",
      year: "1st Year",
      avatar: "https://via.placeholder.com/60?text=MB"
    }
  ]
};

export const mockTeacherWithStudents = {
  _id: "507f1f77bcf86cd799439020",
  name: "Dr. Alice Wilson",
  email: "alice.wilson@university.edu",
  department: "Computer Science",
  students: [
    {
      _id: "507f1f77bcf86cd799439011",
      name: "John Smith",
      email: "john.smith@university.edu",
      studentId: "ST2024001",
      major: "Computer Science"
    },
    {
      _id: "507f1f77bcf86cd799439014", 
      name: "Emily Davis",
      email: "emily.davis@university.edu",
      studentId: "ST2024004",
      major: "Computer Science"
    }
  ],
  exams: []
};

export const mockAddStudentResponse = {
  message: "Student added to teacher",
  teacher: {
    _id: "507f1f77bcf86cd799439020",
    name: "Dr. Alice Wilson",
    students: ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
  },
  student: {
    _id: "507f1f77bcf86cd799439012", 
    name: "Sarah Johnson",
    teachers: ["507f1f77bcf86cd799439020"]
  }
};

// Example API endpoint usage:
/*
1. Search Students:
   GET /students/search?query=john
   Response: mockStudentSearchResults

2. Get Teacher with Students:
   GET /teachers/507f1f77bcf86cd799439020
   Response: mockTeacherWithStudents

3. Add Student to Teacher:
   POST /teachers/507f1f77bcf86cd799439020/addstudent/507f1f77bcf86cd799439012
   Response: mockAddStudentResponse
*/

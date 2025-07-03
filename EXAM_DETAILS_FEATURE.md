# Student Dashboard - Exam Details Feature

## Overview
The student dashboard now includes comprehensive exam details functionality that allows students to view detailed breakdowns of their exam performance, including question-by-question analysis and appeal submission capabilities.

## New Features

### 1. Exam Details View (`ExamDetailsView.jsx`)
- **Detailed Grade Summary**: Shows total score, full marks, percentage, and question count
- **Question-by-Question Breakdown**: Each question shows:
  - Question text
  - Correct answer
  - Student's answer
  - Points earned vs. max points
  - Explanation (if available)
  - Visual indicators (green checkmark for correct, red X for incorrect, yellow warning for partial)
- **Appeal Functionality**: Students can submit appeals for questions they didn't get full marks on

### 2. Navigation Flow
```
Teachers List → Teacher Subjects → Subject Exams → Exam Details → Appeals
```

### 3. API Integration
- **Endpoint**: `/:teacherId/exams/:examId/grade/:studentId`
- **Method**: `teacherApi.getStudentExamDetails(teacherId, examId, studentId)`
- **Response Structure**:
  ```json
  {
    "exam": { "id", "name", "full_mark", "num_of_questions" },
    "student": { "id", "name" },
    "teacher": { "id", "name" },
    "grade_summary": { "total_grade", "max_total_grade", "percentage" },
    "question_details": [
      {
        "question_id": "...",
        "question_text": "...",
        "correct_answer": "...",
        "max_grade": 10,
        "student_grade": 8,
        "student_answer": "...",
        "explanation": "..."
      }
    ]
  }
  ```

## UI Features

### Visual Design
- **Gradient Backgrounds**: Beautiful color-coded cards based on performance
- **Status Icons**: CheckCircle (correct), XCircle (incorrect), AlertCircle (partial)
- **Responsive Layout**: Mobile-friendly grid system
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages

### Color Coding
- **Green**: Correct answers (100% score)
- **Yellow**: Partial credit (0-99% score)
- **Red**: Incorrect answers (0% score)

### Interactive Elements
- **Navigation Breadcrumbs**: Easy back navigation
- **Appeal Buttons**: Only shown for questions with less than full marks
- **Click Handlers**: Smooth transitions between views

## Technical Implementation

### State Management
- Uses React hooks for state management
- Flexible field name handling (supports `id`, `_id`, `teacher_id`, etc.)
- Proper error boundaries and loading states

### Data Flow
1. User clicks "View Details" on an exam card
2. `ExamDetailsView` component loads
3. API call fetches detailed exam data
4. UI renders question-by-question breakdown
5. Appeal functionality available for non-perfect scores

### Error Handling
- Missing data validation
- Network error handling
- User-friendly error messages
- Fallback states for missing information

## Usage

### For Students
1. Navigate to Teachers → Select Teacher → View Subjects → Select Subject → View Exams
2. Click "View Details" on any exam card
3. Review detailed breakdown of performance
4. Submit appeals for questions if needed

### For Developers
- Component is fully self-contained
- Easy to extend with additional features
- Follows established patterns from other dashboard components
- Proper TypeScript-style prop handling

## Future Enhancements
- Appeal history tracking
- Performance analytics charts
- Export functionality for exam reports
- Comparison with class averages
- Time-based performance tracking

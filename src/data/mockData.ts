import { User, Course, Test, Doubt, Notification, TimetableEntry, Attendance, FeeRecord, Result } from '../types';

export const mockUser: User = {
  id: 'u1',
  name: 'Rahul Sharma',
  email: 'rahul@student.com',
  role: 'student',
  class: '10th',
  batch: 'Morning Elite',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
};

export const mockAdmin: User = {
  id: 'a1',
  name: 'Dr. Vivek Gupta',
  email: 'admin@eduflow.com',
  role: 'admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vivek'
};

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Class 10 - Science & Maths',
    description: 'Comprehensive coverage of CBSE Class 10 boards syllabus.',
    class: '10th',
    subjects: ['Mathematics', 'Science', 'English'],
    thumbnail: 'https://picsum.photos/seed/math/400/250'
  },
  {
    id: 'c2',
    title: 'Class 9 - All Subjects',
    description: 'Foundation course for Class 9 students focusing on core concepts.',
    class: '9th',
    subjects: ['Mathematics', 'Science', 'Social Science', 'English'],
    thumbnail: 'https://picsum.photos/seed/science/400/250'
  }
];

export const timetable: TimetableEntry[] = [
  { id: 't1', day: 'Monday', time: '04:00 PM - 05:00 PM', subject: 'Mathematics', teacher: 'Mr. Verma', batchId: 'b1' },
  { id: 't2', day: 'Monday', time: '05:15 PM - 06:15 PM', subject: 'Science', teacher: 'Dr. Khanna', batchId: 'b1' },
  { id: 't3', day: 'Tuesday', time: '04:00 PM - 05:00 PM', subject: 'English', teacher: 'Ms. Sonia', batchId: 'b1' }
];

export const tests: Test[] = [
  { id: 'test1', title: 'Algebra Weekly Test', subject: 'Mathematics', date: '2024-05-20', duration: 60, totalMarks: 50, status: 'upcoming' },
  { id: 'test2', title: 'Periodic Table Quiz', subject: 'Science', date: '2024-05-15', duration: 30, totalMarks: 25, status: 'completed' }
];

export const results: Result[] = [
  { id: 'r1', testId: 'test2', studentId: 'u1', score: 22, totalMarks: 25, date: '2024-05-15' }
];

export const attendance: Attendance[] = [
  { id: 'att1', studentId: 'u1', date: '2024-05-15', status: 'present' },
  { id: 'att2', studentId: 'u1', date: '2024-05-14', status: 'present' },
  { id: 'att3', studentId: 'u1', date: '2024-05-13', status: 'absent' }
];

export const doubts: Doubt[] = [
  {
    id: 'd1',
    studentId: 'u1',
    subject: 'Mathematics',
    question: 'How to solve quadratic equations using completing the square method?',
    status: 'resolved',
    createdAt: '2024-05-10',
    replies: [{ id: 'rep1', authorId: 'a1', authorName: 'Admin', text: 'You need to add and subtract (b/2a)^2...', createdAt: '2024-05-11' }]
  }
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'New Test Scheduled', message: 'Maths weekly test on Algebra scheduled for Monday.', type: 'test', date: '2024-05-18', isRead: false },
  { id: 'n2', title: 'Fee Reminder', message: 'Fee for June month is pending. Please pay by 5th June.', type: 'fee', date: '2024-05-17', isRead: true }
];

export const fees: FeeRecord[] = [
  { id: 'f1', studentId: 'u1', amount: 5000, month: 'May 2024', status: 'paid', dueDate: '2024-05-05' },
  { id: 'f2', studentId: 'u1', amount: 5000, month: 'June 2024', status: 'pending', dueDate: '2024-06-05' }
];

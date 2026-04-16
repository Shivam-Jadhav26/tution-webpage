import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { Home } from './pages/public/Home';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';

// Dashboard Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentCourses } from './pages/student/StudentCourses';
import { StudentTestInterface } from './pages/student/StudentTestInterface';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminTests } from './pages/admin/AdminTests';
import { AdminCreateTest } from './pages/admin/AdminCreateTest';

// Temporary components for pages not yet built fully
const Placeholder = ({ name }: { name: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] text-center italic space-y-4">
    <div className="bg-slate-100 p-8 rounded-full">
      <div className="text-6xl">🚧</div>
    </div>
    <h1 className="text-2xl font-black text-slate-800">{name} Page</h1>
    <p className="text-slate-500 max-w-sm">This page is part of our upcoming architecture and will be fully functional when connected to the backend API.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Placeholder name="About Us" />} />
            <Route path="/courses" element={<Placeholder name="Our Courses" />} />
            <Route path="/testimonials" element={<Placeholder name="Testimonials" />} />
            <Route path="/contact" element={<Placeholder name="Contact Us" />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student Routes */}
          <Route path="/student" element={<DashboardLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCourses />} />
            <Route path="attendance" element={<Placeholder name="Attendance" />} />
            <Route path="timetable" element={<Placeholder name="Timetable" />} />
            <Route path="tests" element={<Placeholder name="Practice Tests" />} />
            <Route path="tests/:id" element={<StudentTestInterface />} />
            <Route path="results" element={<Placeholder name="Results & Analytics" />} />
            <Route path="doubts" element={<Placeholder name="My Doubts" />} />
            <Route path="notifications" element={<Placeholder name="Notifications" />} />
            <Route path="profile" element={<Placeholder name="My Profile" />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="batches" element={<Placeholder name="Batches Management" />} />
            <Route path="courses" element={<Placeholder name="Course Management" />} />
            <Route path="timetable" element={<Placeholder name="Timetable Management" />} />
            <Route path="attendance" element={<Placeholder name="Attendance Audit" />} />
            <Route path="tests" element={<AdminTests />} />
            <Route path="tests/create" element={<AdminCreateTest />} />
            <Route path="results" element={<Placeholder name="Result Insights" />} />
            <Route path="fees" element={<Placeholder name="Fee Management" />} />
            <Route path="analytics" element={<Placeholder name="Advanced Analytics" />} />
            <Route path="notifications" element={<Placeholder name="Announcements" />} />
            <Route path="doubts" element={<Placeholder name="Doubt Resolution" />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<Placeholder name="404 - Not Found" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

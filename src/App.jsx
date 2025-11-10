// src/App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider, useToast } from './context/ToastContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import ToastContainer from './components/common/ToastContainer';
import './index.css';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const StudentDashboard = React.lazy(() => import('./pages/StudentDashboard'));
const SubjectDetails = React.lazy(() => import('./pages/SubjectDetails'));
const StudentProfile = React.lazy(() => import('./pages/StudentProfile'));
const StudentCourses = React.lazy(() => import('./pages/StudentCourses'));
const StudentDiscussions = React.lazy(() => import('./pages/StudentDiscussions'));
const SearchResults = React.lazy(() => import('./pages/SearchResults'));


// Admin components
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));
const AdminLayout = React.lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboardPage = React.lazy(() => import('./pages/admin/AdminDashboard'));
const AdminSubjectsPage = React.lazy(() => import('./pages/admin/AdminSubjects'));
const AdminMaterialsPage = React.lazy(() => import('./pages/admin/AdminMaterials'));
const AdminStudentsPage = React.lazy(() => import('./pages/admin/AdminStudents'));
const AdminAnalyticsPage = React.lazy(() => import('./pages/admin/AdminAnalytics'));
const AdminSettingsPage = React.lazy(() => import('./pages/admin/AdminSettings'));

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && currentUser.userType !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// AppContent component to use the toast context
const AppContent = () => {
  const { toasts, removeToast } = useToast();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner size="xl" />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/search" element={<SearchResults />} />
            
            {/* Protected Student Routes */}
            <Route 
              path="/student/dashboard" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/profile" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/courses" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/discussions" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentDiscussions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student/subject/:id" 
              element={
                <ProtectedRoute requiredRole="student">
                  <SubjectDetails />
                </ProtectedRoute>
              } 
            />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="subjects" element={<AdminSubjectsPage />} />
              <Route path="materials" element={<AdminMaterialsPage />} />
              <Route path="students" element={<AdminStudentsPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
              <Route path="settings" element={<AdminSettingsPage />} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
};

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <DataProvider>
          <Router>
            <AppContent />
          </Router>
        </DataProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
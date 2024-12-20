import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { AuthForm } from './components/auth/AuthForm';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {user && <Header />}
      <Routes>
        <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthForm />} />
        <Route path="/" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider, RequireAuth } from './contexts/AuthContext';
import AttendancePage from './pages/attendance';
import MenuPage from './pages/attendance/menu';
import TablePage from './pages/attendance/tables';
import SignInPage from './pages/auth/sign_in';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignInPage />}></Route>
        <Route path="/auth/sign_in" element={<SignInPage />}/>
        <Route path="/app" element={
          <RequireAuth>
            <AttendancePage />
          </RequireAuth>
        }></Route>
        <Route path="/app/tables" element={
           <TablePage />
        }></Route>
        <Route path="/app/menu" element={
           <MenuPage />
        }></Route>

        <Route path="/admin" element={
          <RequireAuth>
            <AttendancePage />
          </RequireAuth>
        }></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

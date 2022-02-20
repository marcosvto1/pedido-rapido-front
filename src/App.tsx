import { Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider, RequireAuth } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import AttendancePage from './pages/attendance';
import MenuPage from './pages/attendance/menu';
import TablePage from './pages/attendance/tables';
import SignInPage from './pages/auth/sign_in';
import KitchensPage from './pages/cook/kitchens';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<SignInPage />}></Route>
        <Route path="/auth/sign_in" element={<SignInPage />} />
        <Route path="/app" element={
          <RequireAuth>
            <AttendancePage />
          </RequireAuth>
        }></Route>

       
          <Route path="/app/tables" element={
            <OrderProvider>
              <TablePage />
            </OrderProvider>
          } />
          <Route path="/app/:id/menu" element={
            <OrderProvider>
              <MenuPage />
            </OrderProvider>
          }></Route>

          <Route path="/app/kitchens" element={
            <OrderProvider>
              <KitchensPage />
            </OrderProvider>
          }></Route>

        <Route path="/admin" element={
          <AttendancePage />
        }></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

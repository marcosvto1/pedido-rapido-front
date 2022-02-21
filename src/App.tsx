import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { AuthProvider, RequireAuth } from './contexts/AuthContext';
import { OrderProvider } from './contexts/OrderContext';
import AdminPage from './pages/admin';
import CategoriesPage from './pages/admin/categories';
import CategoryFormPage from './pages/admin/categories/form';
import DashboardPage from './pages/admin/dashboard';
import EmployersPage from './pages/admin/employers';
import EmployerFormPage from './pages/admin/employers/form';
import ProductsPage from './pages/admin/products';
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

        <Route path="admin" element={<AdminPage />}>          
          <Route index element={<DashboardPage />} />
          <Route path='products' element={<ProductsPage />} />
          <Route path='categories' element={<CategoriesPage />} />
          <Route path='employees' element={<EmployersPage />} />
          <Route path='employees/new' element={<EmployerFormPage />} />
          <Route path='employees/:id/edit' element={<EmployerFormPage />} />
          <Route path='categories/new' element={<CategoryFormPage />} />
          <Route path='categories/:id/edit' element={<CategoryFormPage />} />
        </Route>  
      </Routes>
    </AuthProvider>
  );
}

export default App;

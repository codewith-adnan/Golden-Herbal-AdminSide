import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from '../Components/Layout';
import OrderListing from '../AdminSide/OrderListing';
import OrderDetail from '../AdminSide/OrderDetail';
import AddProduct from '../AdminSide/AddProduct';
import AdminProductList from '../AdminSide/AdminProductList';
import LoginPage from '../auth/login.page';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    const token = localStorage.getItem("token");
    if (!isLoggedIn || !token) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const AdminRoutes = () => {
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Navigate to="/orders" replace />} />
                    <Route path="orders" element={<OrderListing />} />
                    <Route path="orders/:id" element={<OrderDetail />} />
                    <Route path="products" element={<AdminProductList />} />
                    <Route path="add-product" element={<AddProduct />} />
                    <Route path="edit-product/:id" element={<AddProduct />} />
                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/orders" replace />} />
                </Route>
            </Routes>
        </>
    );
};

export default AdminRoutes;

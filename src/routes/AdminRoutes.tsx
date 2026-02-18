import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Components/Layout';
import OrderList from '../AdminSide/OrderList';
import AddProduct from '../AdminSide/AddProduct';
import AdminProductList from '../AdminSide/AdminProductList';

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/orders" replace />} />
                <Route path="orders" element={<OrderList />} />
                <Route path="products" element={<AdminProductList />} />
                <Route path="add-product" element={<AddProduct />} />
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/orders" replace />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;

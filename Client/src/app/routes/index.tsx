import { createBrowserRouter, Navigate } from 'react-router-dom';
import ManagerLayout from '@/app/layouts/ManagerLayout';
import CustomerLayout from '@/app/layouts/CustomerLayout';
import SalerLayout from '@/app/layouts/SalerLayout';
import ProductListPage from '@/features/products/ProductListPage';

export const router = createBrowserRouter([
    {
        path: '/manager',
        element: <ManagerLayout><div>Catalog (placeholder)</div></ManagerLayout>,
    },
    {
        path: '/customer',
        element: <CustomerLayout><div>Catalog (placeholder)</div></CustomerLayout>,
    },
    {
        path: '/saler',
        element: <SalerLayout><div>Orders (placeholder)</div></SalerLayout>,
    },
    { path: '/', element: <Navigate to="/manager/product" replace /> },
    { path: '/manager/product', element: <ManagerLayout><ProductListPage /></ManagerLayout> },
]);
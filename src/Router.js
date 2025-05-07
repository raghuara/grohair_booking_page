import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MobileNumberPage from './Components/Pages/MobileNumberPage';
import BookingPage from './Components/Pages/BookingPage';
import PaymentSuccessfullPage from './Components/Pages/PaymentSuccessfullPage';
import DetailsPage from './Components/Pages/DetailsPage';
import DashBoardPage from './Components/DashboardPage';
import DashBoardLayout from './Components/Dashboard/DashboardLayout';
import LoginPage from './Components/Pages/LoginPage';
import ProtectedRoute from './Components/ProtectedRoute';

export default function RouterPage() {
  return (
    <Routes>
      <Route path="/" element={<MobileNumberPage />} />
      <Route path="/book" element={<BookingPage />} />
      <Route path="/payment" element={<PaymentSuccessfullPage />} />
      <Route path="/details" element={<DetailsPage />} />
      <Route path="/admin" element={<LoginPage />} />
      <Route
        path="/dashboardmenu"
        element={
          <ProtectedRoute>
            <DashBoardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashBoardPage />} />
      </Route>
      <Route path="dashboardmenu" element={<DashBoardLayout />}>
        <Route path="dashboard" element={<DashBoardPage />} />
      </Route>
    </Routes>
  );
}

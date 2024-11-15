import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import ApiService from "./ApiService";

//bao ve va chi cho phep khi user da login, if not chuyen user den login
export const ProtectedRoute = ({ element: Component }) => {
  const location = useLocation();

  return ApiService.isAuthenticated() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

//kiem tra user co phai la admin
export const AdminRoute = ({ element: Component }) => {
  const location = useLocation();

  return ApiService.isAdmin() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

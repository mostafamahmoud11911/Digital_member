import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps extends PropsWithChildren {
    redirectIfAuth?: boolean;
}

export default function ProtectedRoute({ children, redirectIfAuth }: ProtectedRouteProps) {
    // check if the user is logged in
    const mId = localStorage.getItem("mid");

    // protected route if redirectIfAuth is true or if the user is logged in
    if (redirectIfAuth && mId) {
        return <Navigate to="/" replace />;
    }

    // redirect to register page if redirectIfAuth is false and the user is not logged in
    if (!redirectIfAuth && !mId) {
        return <Navigate to="/register" replace />;
    }

    return children;
}

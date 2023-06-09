import { Navigate, Outlet } from "react-router";

const useAuth = () => {
    const isAuth: boolean = localStorage.accessToken != null;
    return isAuth;
}

const ProtectedRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/users/signin"/>;
}

export default ProtectedRoutes;
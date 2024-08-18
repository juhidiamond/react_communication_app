import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Nav from "../components/Nav";
import { useEffect } from "react";

export const UserRoutesLayout = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedUser");

  const guestRoutes = ["/login", "/register", "/register-success", "/"]
  const location = useLocation().pathname;

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
    else{
      if(guestRoutes.includes(location)) navigate("/users")
    }

  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <>
          <Nav />
          <main>
            <Outlet />
          </main>
        </>
      ) : (
        <>
          <main>
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
};

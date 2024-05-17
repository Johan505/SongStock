import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserActions } from "../../hooks/useUserActions";
import { useValidators } from "../../hooks/useValidators";

export const Nav = () => {
    const { LogoutUser } = useUserActions();
    const user = useSelector((state) => state.users.auth.user);
    const {isUserAuthenticated} = useValidators()
  return (
    <nav className="container-nav">
      <div className="user-info-nav">
        <div className="auth-nav">
          {!isUserAuthenticated() && (
            <>
              <Link to="/user/user-register" className="item-nav sing-in">
                Sign up
              </Link>
              <Link to="/user/user-login" className="item-nav sing-up">
                Sign in
              </Link>
            </>
          )}
          {isUserAuthenticated() && (
            <button className="button-logout" onClick={LogoutUser}>
              <p className="small-medium lg:base-medium">Logout</p>
            </button>
          )}
        </div>
        {user?.name && <span className="user-name">{user.name}</span>}
      </div>
    </nav>
  );
};

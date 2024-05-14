import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserActions } from "../../hooks/useUserActions";

export const Nav = () => {
    const { LogoutUser } = useUserActions();
    const user = useSelector((state) => state.users.auth.user);
  return (
    <nav className="container-nav">
      <div className="user-info-nav">
        <div className="options-nav">
          <Link to="/song/song-register" className="item-nav">
            Song
          </Link>
          <Link to="/vinyldisc/vinyldisc-register" className="item-nav">
            Vinyl Disc
          </Link>
        </div>
        <div className="auth-nav">
          <Link to="/user/user-register" className="item-nav sing-in">
            Sign up
          </Link>
          <Link to="/user/user-login" className="item-nav sing-up">
            Sign in
          </Link>
        </div>
        { user?.name }
            {user ? 
            <button className="button-logout" onClick={LogoutUser}>
            <img src="/assets/icons/logout.svg" alt="logout" />
            <p className="small-medium lg:base-medium">Logout</p>
          </button>
          : ""
          }
      </div>
    </nav>
  );
};

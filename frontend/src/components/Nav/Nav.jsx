import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserActions } from "../../hooks/useUserActions";
import { useValidators } from "../../hooks/useValidators";
import "./Module.scss"

export const Nav = () => {
    const { LogoutUser } = useUserActions();
    const user = useSelector((state) => state.users.auth.user);
    const {isUserAuthenticated, isUserRolUser,isUserRolAdmin, isUserRolProvider} = useValidators()
  return (
    <nav className="container-nav">
      <div className="user-info-nav">
        <div className="auth-nav">
          <Link to="/" className="item-nav">Home</Link>
          {isUserRolUser() && (
            <>
           <Link className="item-nav">Songs</Link>
           <Link className="item-nav">Playlists</Link>
           <Link to='/song/favorites' className="item-nav">Favorites</Link>
           <Link to='/cart' className="item-nav">Cart</Link>
           </>
          )}
          {isUserRolAdmin() && (
            <>
           <Link className="item-nav">Solicitudes</Link>
           <Link className="item-nav">Reportes</Link>
           <Link to ='/song/song-register' className="item-nav">Add Song</Link>
           </>
          )}
          {isUserRolProvider() && (
            <>
           <Link to = '/vinyldisc/myposts/' className="item-nav">My Posts</Link>
           <Link className="item-nav">Requests</Link>
           <Link to ='/vinyldisc/vinyldisc-register' className="item-nav">Add Vinyl</Link>
           </>
          )}
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

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserActions } from "../../hooks/useUserActions";
import { useValidators } from "../../hooks/useValidators";

export const Nav = () => {
    const { LogoutUser } = useUserActions();
    const user = useSelector((state) => state.users.auth.user);
    const {isUserAuthenticated, isUserRolUser,isUserRolAdmin, isUserRolProvider} = useValidators()
  return (
    <nav className="container-nav">
      <div className="user-info-nav">
        <div className="auth-nav">
          <p><Link to="/">Home</Link></p>
          {isUserRolUser() && (
            <>
           <Link>Songs</Link>
           <Link>Playlists</Link>
           <Link to='/song/favorites'>Favorites</Link>
           <Link to='/cart'>Cart</Link>
           </>
          )}
          {isUserRolAdmin() && (
            <>
           <Link>Solicitudes</Link>
           <Link>Reportes</Link>
           <Link to ='/song/song-register'>Add Song</Link>
           </>
          )}
          {isUserRolProvider() && (
            <>
           <Link to = '/vinyldisc/myposts/'>My Posts</Link>
           <Link>Requests</Link>
           <Link to ='/vinyldisc/vinyldisc-register'>Add Vinyl</Link>
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

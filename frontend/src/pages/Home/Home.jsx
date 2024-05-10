import { useSelector } from "react-redux";
import { useUserActions } from "../../hooks/useUserActions";

export const Home = () => {
    const { LogoutUser } = useUserActions();
    const user = useSelector((state) => state.users.auth.user);
    return(
        <>
            hola {user?.name}

            {user ? 
            <button className="button-logout" onClick={LogoutUser}>
            <img src="/assets/icons/logout.svg" alt="logout" />
            <p className="small-medium lg:base-medium">Logout</p>
          </button>
          : ""
          }
        </>

    )
}
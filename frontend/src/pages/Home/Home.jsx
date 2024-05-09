import { useSelector } from "react-redux";

export const Home = () => {
    const user = useSelector((state) => state.users.auth.user);
    console.log(user)
    return(
        <>
            hola {user?.name}
        </>

    )
}
import { useSelector } from "react-redux";
import { useVinylDiscActions } from "../../hooks/useVinylDiscActions";
import { useEffect } from "react";
import { CardVinylDisc } from "../../components/CardVinyl/CardVinylDisc";

export const MyPost = () =>{
    const user = useSelector((state) => state.users.auth.user);
    const {vinyluser, status} = useSelector((state) => state.vinyldiscs)
    const {getvinyluser} = useVinylDiscActions()

    useEffect(() => {
        getvinyluser(user.id)
    },[])

    console.log(vinyluser);

    if (!vinyluser || status === "loading")
        return <div className="loader">Loading...</div>;
    
    return(
        <div>
             <CardVinylDisc vinyls={vinyluser} />
        </div>
    )
}
import { useEffect } from "react"
import { FormVinyl } from "../../components/VinylDisc/FormVinyl"
import { useVinylDiscActions } from "../../hooks/useVinylDiscActions"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export const UpdateVinyldisc = () => {
    const { id } = useParams()
    const {searchid} = useVinylDiscActions()
    const {vinylid, status} = useSelector((state) => state.vinyldiscs)

    useEffect(() => {
      searchid(id);
      }, [id]);

    if (!vinylid || status === "loading")
        return (
          <div className="loader">
            loading.....
          </div>
        );



    return(
        <div className="container-register">
        <div className="register">
          <div className="info-login">
            <i className="fa-solid fa-earth-americas"></i>
            <h2>Update Vinyl Disc</h2>
          </div>
          <FormVinyl action="Update" vinyl={vinylid}/>      
          </div>
      </div>
    )
}
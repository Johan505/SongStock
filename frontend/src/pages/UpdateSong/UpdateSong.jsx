import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useSongActions } from "../../hooks/useSongActions"
import { FormSong } from "../../components/Song/FormSong"

export const UpdateSong = () => {
    const { id } = useParams()
    const {searchid} = useSongActions()
    const {songid, status} = useSelector((state) => state.songs)

    useEffect(() => {
      searchid(id);
      }, [id]);

    if (!songid || status === "loading")
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
            <h2>Update Song</h2>
          </div>
          <FormSong action="Update" song={songid}/>      
          </div>
      </div>
    )
}
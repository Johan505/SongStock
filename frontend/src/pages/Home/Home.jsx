import { useSelector } from "react-redux";
import { useVinylDiscActions } from "../../hooks/useVinylDiscActions";
import { useEffect } from "react";

export const Home = () => {
  const { getAllVinylDisc } = useVinylDiscActions();
  const { allvinyls, status } = useSelector((state) => state.vinyldiscs);

  useEffect(() => {
    getAllVinylDisc();
  }, []);

  if (!allvinyls || status === "loading")
    return <div className="loader">loading.....</div>;

  return (
    <div>
      {allvinyls.map((vinyl) => (
        <div key={vinyl.id}>
          <p>{vinyl.name}</p>
          <p>{vinyl.artist}</p>
        </div>
      ))}
    </div>
  );
};

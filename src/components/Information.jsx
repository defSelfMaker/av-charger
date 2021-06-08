import { Popup } from "react-map-gl";
import { MyContext } from "../utils/MyContext";
import { useContext } from "react";

let Information = () => {
  const { selectedStation, setSelectedStation } = useContext(MyContext);

  return selectedStation ? (
    <Popup
      latitude={selectedStation.AddressInfo.Latitude}
      longitude={selectedStation.AddressInfo.Longitude}
      onClose={() => {
        setSelectedStation(null);
      }}
    >
      <div className="popup">
        <p>Town: {selectedStation.AddressInfo.Town}</p>
        <p>
          Usage cost:{" "}
          {selectedStation.UsageCost ? selectedStation.UsageCost : "N/A"}
        </p>
      </div>
    </Popup>
  ) : null;
};

export default Information;

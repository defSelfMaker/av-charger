import { Popup } from "react-map-gl";

let Information = ({ selectedStation, setSelectedStation }) => {
  return (
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
  );
};

export default Information;

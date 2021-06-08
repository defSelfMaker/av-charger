import { Marker } from "react-map-gl";
import { MyContext } from "../utils/MyContext";
import { useContext } from "react";

let MarkerProducer = ({ data, handleClick }) => {
  const { selectedStation } = useContext(MyContext);

  return selectedStation ? (
    <div>
      <Marker
        latitude={selectedStation.AddressInfo.Latitude}
        longitude={selectedStation.AddressInfo.Longitude}
      >
        <div className="symbol">
          <img
            alt="icon for EV cahrging stations"
            onClick={() => handleClick(selectedStation)}
            src="https://angliacarcharging.co.uk/wp-content/uploads/2020/09/acc-service-icon-circle-blue-charging-station.png"
          />
        </div>
      </Marker>
    </div>
  ) : (
    data.map((item, ind) => {
      return (
        <div key={ind}>
          <Marker
            latitude={item.AddressInfo.Latitude}
            longitude={item.AddressInfo.Longitude}
          >
            <div className="symbol">
              <img
                alt="icon for EV cahrging stations"
                onClick={() => handleClick(item)}
                src="https://angliacarcharging.co.uk/wp-content/uploads/2020/09/acc-service-icon-circle-blue-charging-station.png"
              />
            </div>
          </Marker>
        </div>
      );
    })
  );
};

export default MarkerProducer;

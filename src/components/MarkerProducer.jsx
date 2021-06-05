import { Marker } from "react-map-gl";

let MarkerProducer = ({ searchValue, selectedStation, data, handleClick }) => {
  let filteredData = () => {
    let checkValue = (connectionArr) => {
      for (let i = 0; i < connectionArr.length; i++) {
        if (
          connectionArr[i].ConnectionType.Title.toLowerCase().includes(
            searchValue.toLowerCase()
          )
        ) {
          return true;
        }
      }
      return false;
    };

    let result = data.filter((item) => {
      return item.Connections && checkValue(item.Connections);
    });
    return result;
  };

  let newData = searchValue === "" ? data : filteredData();

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
            src="ev.png"
          />
        </div>
      </Marker>
    </div>
  ) : (
    newData.map((item, ind) => {
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
                src="ev.png"
              />
            </div>
          </Marker>
        </div>
      );
    })
  );
};

export default MarkerProducer;

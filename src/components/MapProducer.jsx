import ReactMapGl from "react-map-gl";
import Information from "./Information";
import MarkerProducer from "./MarkerProducer";
// import useSupercluster from "use-supercluster";
// import { Marker } from "react-map-gl";

let MapProducer = ({
  viewport,
  setViewport,
  darkMode,
  filteredDataArray,
  selectedStation,
  setSelectedStation,
  searchValue,
  handleClick,
  setHistory,
}) => {
  // const mapRef = useRef();

  //   let points = filteredDataArray.map((point, ind) => ({
  //     type: "Feature",
  //     properties: {
  //       cluster: false,
  //       pointId: ind,
  //       category: "charger",
  //     },
  //     geometry: {
  //       type: "Point",
  //       coordinates: [point.AddressInfo.Longitude, point.AddressInfo.Latitude],
  //     },
  //   }));

  //   let bounds = mapRef.current
  //     ? mapRef.current.getMap().getBounds().toArray().flat()
  //     : null;

  //   const { clusters } = useSupercluster({
  //     points,
  //     bounds,
  //     zoom: viewport.zoom,
  //     options: { radius: 75, maxZoom: 20 },
  //   });

  return (
    <ReactMapGl
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1Ijoiam9zZXBmIiwiYSI6ImNrcGdobHFxazA3NmQybnAwMnJ4aHhveXEifQ._9w1jM-wQwYYx9At3BUisw"
      onViewportChange={(viewport) => setViewport(viewport)}
      // ref={mapRef}
      mapStyle={
        darkMode
          ? "mapbox://styles/josepf/ckph76sdz0ovh17qwiar0zda5"
          : "mapbox://styles/josepf/ckph6pvgp2dao17o988prczi2"
      }
    >
      {/* {clusters.map((cluster) => {
              const [longitude, latitude] = cluster.geometry.coordinates;
              const {
                cluster: isCluster,
                point_count: pointCount,
              } = cluster.properties;
              if (isCluster) {
                return (
                  <Marker
                    key={cluster.id}
                    longitude={longitude}
                    latitude={latitude}
                  >
                    <div className="cluster-marker">{pointCount}</div>
                  </Marker>
                );
              } else {
                return (
                  <MarkerProducer
                    selectedStation={selectedStation}
                    data={filteredDataArray}
                    handleClick={(point) => {
                      handleClick(point);
                      setHistory((prevHistory) => [...prevHistory, point]);
                    }}
                    searchValue={value}
                  />
                );
              }
            })} */}
      <MarkerProducer
        selectedStation={selectedStation}
        data={filteredDataArray}
        handleClick={(point) => {
          handleClick(point);
          setHistory((prevHistory) => [...prevHistory, point]);
        }}
        searchValue={searchValue}
      />
      {selectedStation ? (
        <Information
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
        />
      ) : null}
    </ReactMapGl>
  );
};

export default MapProducer;

import React, { useState, useEffect } from "react";
import ReactMapGl, { Marker } from "react-map-gl";
import CurrentList from "./CurrentList";
import Information from "./Information";
import HistoryList from "./HistoryList";
import Search from "./Search";
import MarkerProducer from "./MarkerProducer";
import getData from "../utils/apiCall";
import filteredData from "../utils/filterData";

let Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 43.94,
    longitude: -92.06,
    width: "80vw",
    height: "80vh",
    zoom: 8,
  });
  const [selectedStation, setSelectedStation] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    getData(viewport.latitude, viewport.longitude).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [viewport.latitude, viewport.longitude]);

  useEffect(() => {
    const historyData = localStorage.getItem("historyStations");
    setHistory(JSON.parse(historyData));
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedStation(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("historyStations", JSON.stringify(history));
  });

  let handleClick = (point) => {
    setSelectedStation(point);
    let newHistory = [...history, point];
    setHistory(newHistory);
    setViewport({
      ...viewport,
      latitude: point.AddressInfo.Latitude,
      longitude: point.AddressInfo.Longitude,
    });
  };

  let filteredDataArray = value === "" ? data : filteredData(value, data);

  return (
    <div className="container">
      {loading ? (
        <p>Map is loading...</p>
      ) : (
        <>
          <Search
            handleChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ReactMapGl
            {...viewport}
            mapboxApiAccessToken="pk.eyJ1Ijoiam9zZXBmIiwiYSI6ImNrcGdobHFxazA3NmQybnAwMnJ4aHhveXEifQ._9w1jM-wQwYYx9At3BUisw"
            onViewportChange={(viewport) => setViewport(viewport)}
            mapStyle="mapbox://styles/josepf/ckph6pvgp2dao17o988prczi2"
          >
            <MarkerProducer
              selectedStation={selectedStation}
              data={filteredDataArray}
              handleClick={handleClick}
              searchValue={value}
            />
            {selectedStation ? (
              <Information
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
              />
            ) : null}
          </ReactMapGl>
          <div className="lists">
            <div>
              <h5>Current List</h5>
              <CurrentList data={filteredDataArray} handleClick={handleClick} />
            </div>
            <div>
              <h5>History List</h5>
              <HistoryList
                cleanHistory={() => setHistory([])}
                data={history}
                handleClick={handleClick}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Map;

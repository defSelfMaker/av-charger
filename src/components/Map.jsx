import React, { useState, useEffect, useRef } from "react";
import ReactMapGl from "react-map-gl";
import CurrentList from "./CurrentList";
import Information from "./Information";
import HistoryList from "./HistoryList";
import Search from "./Search";
import MarkerProducer from "./MarkerProducer";
import filteredData from "../utils/filterData";
import debounce from "../utils/debounce";

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
  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    async function getDataIn() {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;
      try {
        const res = await fetch(
          `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=5&key=39532bd3-37be-4ec9-9c2e-5b59f3af3521&latitude=${viewport.latitude}&longitude=${viewport.longitude}&distance=20&distanceunit=Miles`,
          {
            signal: controllerRef.current?.signal,
          }
        );
        const data = await res.json();
        setData(data);
        setLoading(false);
        controllerRef.current = null;
      } catch (e) {
        console.log("error here:", e);
      }
    }

    getDataIn();
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
  };

  let filteredDataArray = value === "" ? data : filteredData(value, data);

  return (
    <div className="container">
      {loading ? (
        <p>Map is loading...</p>
      ) : (
        <>
          <Search
            handleChange={(e) => {
              const deb = debounce(() => setValue(e.target.value));
              deb();
            }}
            // value={value}
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
              handleClick={(point) => {
                handleClick(point);
                setHistory((prevHistory) => [...prevHistory, point]);
              }}
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
            <div className="list">
              <h5>Current List</h5>
              <CurrentList
                data={filteredDataArray}
                handleClick={(point) => {
                  handleClick(point);
                  setHistory((prevHistory) => [...prevHistory, point]);
                }}
              />
            </div>
            <div className="list">
              <h5>History List</h5>
              <HistoryList
                cleanHistory={() => setHistory([])}
                data={history}
                handleClick={(point) => {
                  handleClick(point);
                  setViewport({
                    ...viewport,
                    latitude: point.AddressInfo.Latitude,
                    longitude: point.AddressInfo.Longitude,
                  });
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Map;

import React, { useState, useEffect, useRef } from "react";
import ReactMapGl from "react-map-gl";
import CurrentList from "./CurrentList";
import Information from "./Information";
import HistoryList from "./HistoryList";
import Search from "./Search";
import MarkerProducer from "./MarkerProducer";
import Toggle from "./Toggle";
import filteredData from "../utils/filterData";
import debounce from "../utils/debounce";

let Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 43.94,
    longitude: -92.06,
    width: "70vw",
    height: "60vh",
    zoom: 8,
  });
  const [selectedStation, setSelectedStation] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [value, setValue] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    async function getDataIn() {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;
      try {
        // `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=5&key=39532bd3-37be-4ec9-9c2e-5b59f3af3521&latitude=${viewport.latitude}&longitude=${viewport.longitude}&distance=20&distanceunit=Miles`,
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
        console.log("error here:", e.message);
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

  let handleTheme = (value) => {
    setDarkMode(value);
  };

  let filteredDataArray = value === "" ? data : filteredData(value, data);
  let classForWrapper = darkMode ? "container dark" : "container";

  return (
    <div className={classForWrapper}>
      {loading ? (
        <p>Map is loading...</p>
      ) : (
        <>
          <p className="darkModeText">Dark mode is {darkMode ? "on" : "off"}</p>
          <Toggle handleTheme={handleTheme}></Toggle>
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
            // mapStyle={
            //   darkMode
            //     ? "mapbox://styles/josepf/ckph76sdz0ovh17qwiar0zda5"
            //     : "mapbox://styles/josepf/ckph6pvgp2dao17o988prczi2"
            // }
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
              <h3>Current List</h3>
              <CurrentList
                data={filteredDataArray}
                handleClick={(point) => {
                  handleClick(point);
                  setHistory((prevHistory) => [...prevHistory, point]);
                }}
                loading={loading}
              />
            </div>
            <div className="list">
              <h3>History List</h3>
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

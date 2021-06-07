import React, { useState, useEffect, useRef, useCallback } from "react";
import CurrentList from "./CurrentList";
import HistoryList from "./HistoryList";
import Search from "./Search";
import Toggle from "./Toggle";
import MapProducer from "./MapProducer";
import filteredData from "../utils/filterData";
import debounce from "lodash.debounce";

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
  const [error, setError] = useState(false);
  const controllerRef = useRef(new AbortController());

  const debouncedValue = useCallback(
    debounce((nextValue) => setValue(nextValue), 1000),
    []
  );

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
          `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=50&key=39532bd3-37be-4ec9-9c2e-5b59f3af3521&latitude=${viewport.latitude}&longitude=${viewport.longitude}&distance=20&distanceunit=Miles`,
          {
            signal: controllerRef.current?.signal,
          }
        );
        const data = await res.json();
        setData(data);
        setLoading(false);
        controllerRef.current = null;
      } catch (e) {
        if (e.message === "The user aborted a request.") {
          console.log("------> abortion message");
        } else {
          setError(true);
          console.log("------> different message", e.message);
        }
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

  let handleTheme = (isDark) => {
    setDarkMode(isDark);
  };

  let filteredDataArray = value === "" ? data : filteredData(value, data);
  let classForWrapper = darkMode ? "container dark" : "container";

  if (error) {
    return <h1>Sorry something went wrong...</h1>;
  }

  return (
    <div className={classForWrapper}>
      {loading ? (
        <p>Map is loading...</p>
      ) : (
        <>
          <p className="darkModeText">Dark mode is {darkMode ? "on" : "off"}</p>
          <Toggle handleTheme={handleTheme}></Toggle>
          <Search handleChange={(e) => debouncedValue(e.target.value)} />
          <MapProducer
            viewport={viewport}
            darkMode={darkMode}
            filteredDataArray={filteredDataArray}
            setViewport={setViewport}
            selectedStation={selectedStation}
            searchValue={value}
            handleClick={handleClick}
            setHistory={setHistory}
            setSelectedStation={setSelectedStation}
          />
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

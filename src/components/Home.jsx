let Home = () => {
  return (
    <div className="home">
      <p>For the map interface, Mapbox and react-map-gl are used.</p>
      <p>For the data source, openchargemap is used.</p>
      <ol className="helpers">
        <li>
          <span>
            <a href="https://www.mapbox.com/">Mapbox</a>
          </span>
        </li>
        <li>
          <span>
            <a href="https://github.com/visgl/react-map-gl">react-map-gl</a>
          </span>
        </li>
        <li>
          <span>
            <a href="https://openchargemap.org/site/develop/api">
              openchargemap
            </a>
          </span>
        </li>
      </ol>
    </div>
  );
};

export default Home;

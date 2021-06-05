let List = ({ data, handleClick }) => {
  let result = data.map((point, ind) => (
    <li onClick={() => handleClick(point)} key={ind}>
      {point.AddressInfo.Town}
    </li>
  ));

  return data.length ? (
    <ol>{result}</ol>
  ) : (
    <p className="load">List of EV charging locations are loading...</p>
  );
};

export default List;

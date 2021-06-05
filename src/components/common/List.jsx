let List = ({ data, handleClick }) => {
  let result = data.map((point, ind) => (
    <li onClick={() => handleClick(point)} key={ind}>
      {point.AddressInfo.Town}
    </li>
  ));

  return <ol>{result}</ol>;
};

export default List;

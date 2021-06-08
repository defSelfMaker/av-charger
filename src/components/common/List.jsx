import { Link } from "react-router-dom";
import React from "react";

let List = ({ data, handleClick }) => {
  let result = data.map((point, ind) => (
    <React.Fragment key={ind}>
      <li onClick={() => handleClick(point)}>{point.AddressInfo.Town}</li>
      <Link
        to={{
          pathname: `/more/${point.AddressInfo.Town}`,
          aboutProps: {
            name: point,
          },
        }}
        className="more-info"
      >
        More Info
      </Link>
    </React.Fragment>
  ));

  return <ol>{result}</ol>;
};

export default List;

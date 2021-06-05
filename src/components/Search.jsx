import { useState } from "react";

let Search = ({ value, handleChange }) => {
  return (
    <input
      className="search"
      onChange={handleChange}
      value={value}
      placeholder="Enter Something"
      type="text"
    ></input>
  );
};

export default Search;

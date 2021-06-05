let Search = ({ value, handleChange }) => {
  return (
    <div className="sarchContainer">
      <label>Please Enter Your Term:</label>
      <input
        className="search"
        onChange={handleChange}
        value={value}
        placeholder="Enter Something"
        type="text"
      ></input>
    </div>
  );
};

export default Search;

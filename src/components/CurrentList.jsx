import List from "./common/List";

let CurrentList = (props) => {
  return props.data.length ? (
    <List {...props} />
  ) : props.loading ? (
    <p className="load">List of EV charging locations are loading...</p>
  ) : (
    <p className="load">No locations in this area...</p>
  );
};

export default CurrentList;

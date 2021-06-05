import List from "./common/List";

let CurrentList = (props) => {
  return props.data.length ? (
    <List {...props} />
  ) : (
    <p className="load">List of EV charging locations are loading...</p>
  );
};

export default CurrentList;

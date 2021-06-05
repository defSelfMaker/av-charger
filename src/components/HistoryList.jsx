import List from "./common/List";

let HistoryList = (props) => {
  return props.data.length ? (
    <>
      <List {...props} />
      <button onClick={props.cleanHistory}>Clean History</button>
    </>
  ) : (
    <p className="load">You don't have any in your history</p>
  );
};

export default HistoryList;

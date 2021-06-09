import List from "./common/List";

let HistoryList = (props) => {
  const { data } = props || [];

  return data.length > 0 ? (
    <>
      <List {...props} />
      <button onClick={props.cleanHistory}>Clear History</button>
    </>
  ) : (
    <p className="load">You don't have any in your history</p>
  );
};

export default HistoryList;

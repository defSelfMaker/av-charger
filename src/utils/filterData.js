let filteredData = (searchValue, data) => {
  let checkValue = (connectionArr) => {
    for (let i = 0; i < connectionArr.length; i++) {
      if (
        connectionArr[i].ConnectionType.Title.toLowerCase().includes(
          searchValue.toLowerCase()
        )
      ) {
        return true;
      }
    }
    return false;
  };

  let result = data.filter((item) => {
    return item.Connections && checkValue(item.Connections);
  });
  return result;
};

export default filteredData;

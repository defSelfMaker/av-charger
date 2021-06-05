let debounce = (fn) => {
  let timerId;
  return function () {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn();
    }, 1000);
  };
};

export default debounce;

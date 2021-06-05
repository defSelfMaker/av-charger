let debounce = (fn) => {
  console.log("hello");
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn();
    }, 1000);
  };
};

export default debounce;

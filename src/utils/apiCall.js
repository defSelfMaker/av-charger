import axios from "axios";

let getData = (latitude, longitude) => {
  // return fetch(
  //   `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=5&key=39532bd3-37be-4ec9-9c2e-5b59f3af3521&latitude=${latitude}&longitude=${longitude}&distance=20&distanceunit=Miles`
  // )
  //   .then((res) => res.json())
  //   .then((data) => data);
  var CancelToken = axios.CancelToken;
  var cancel;
  if (cancel !== undefined) {
    cancel();
  }
  return axios
    .get(
      `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=5&key=39532bd3-37be-4ec9-9c2e-5b59f3af3521&latitude=${latitude}&longitude=${longitude}&distance=20&distanceunit=Miles`,
      {
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }),
      }
    )
    .then((res) => res)
    .catch((e) => {
      const result = e.response;
      return Promise.reject(result);
    });
};

export default getData;

let getData = (latitude, longitude) => {
  return fetch(
    `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=5&key=39532bd3-37be-4ec9-9c2e-5b59f3af3521&latitude=${latitude}&longitude=${longitude}&distance=20&distanceunit=Miles`
  )
    .then((res) => res.json())
    .then((data) => data);
};

export default getData;

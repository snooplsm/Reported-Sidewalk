import { AsyncStorage } from "react-native";

export const reverseGeocode = location => {
  console.log("reverse geocode", location);
  if (!location || !location.lat || !location.lng) {
    return Promise.reject(
      `illegal location ${location == null ? null : JSON.stringify(location)}`
    );
  }
  const key = `location.${location.lat}.${location.lng}`;
  return AsyncStorage.getItem(key).then(item => {
    if (item) {
      console.log("found geo");
      return JSON.parse(item);
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDiBYFqZLwPsNkMbRNqr1_63h-w9fcZNVM&latlng=${location.lat.toFixed(
      4
    )},${location.lng.toFixed(4)}&rankby=distance`;
    return fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("reverse geocoded!");
        AsyncStorage.setItem(key, JSON.stringify(data));
        return data;
      });
  });
};

export const finds = (address, key) => {
  return address
    .filter(x => x.types.includes(key))
    .map(x => x.short_name)
    .shift();
};

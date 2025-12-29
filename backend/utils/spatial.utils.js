import h3 from 'h3-js';

// Function to convert coordinates to hex id
export const latLngToHex = (lat, lng) => {
  const res = 7;
  return h3.latLngToCell(lat, lng, res);
};

// Function to determine job coverage i.e hex id
export const getJobCoverage = (hex) => {
  const step = 9;
  return h3.gridDisk(hex, 9);
};


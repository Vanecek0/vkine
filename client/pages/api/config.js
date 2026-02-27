const config = {
  mainImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w92: (imgPath) => `https://image.tmdb.org/t/p/w92/${imgPath}`,
  w185: (imgPath) => `https://image.tmdb.org/t/p/w185/${imgPath}`,
  w300: (imgPath) => `https://image.tmdb.org/t/p/w300/${imgPath}`,
  w400: (imgPath) => `https://image.tmdb.org/t/p/w400/${imgPath}`,
  w500: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
  w600: (imgPath) => `https://image.tmdb.org/t/p/w600/${imgPath}`,
  w780: (imgPath) => `https://image.tmdb.org/t/p/w780/${imgPath}`,
  w1280: (imgPath) => `https://image.tmdb.org/t/p/w1280/${imgPath}`,
  noImage: (imgPath) => imgPath,
  staticImage: (imgPath) => imgPath,
  noBac: (imgPath) => imgPath,
};

export default config;
module.exports = {
  routes: [
      {
          method: 'POST',
          path: '/search-by-image',
          handler: 'search-by-image.search',
          config: {
              policies: [],
              middlewares: [],
          },
      },
  ],
};
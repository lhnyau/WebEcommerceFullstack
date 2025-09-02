module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/my-favorite-products',
     handler: 'my-favorite-products.getMyFavoriteProducts',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    
  ],
};
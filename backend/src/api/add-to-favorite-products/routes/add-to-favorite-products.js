module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/add-to-favorite-products',
     handler: 'add-to-favorite-products.addNew',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};

module.exports = {
  routes: [
    {
      method: 'PUT',
      path: '/edit-product/:id',
      handler: 'edit-product.editProduct',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/complete-order/:orderId',
      handler: 'complete-order.completeOrder',
      config: {
        policies: [], 
        middlewares: [], 
      },
    },
  ],
};

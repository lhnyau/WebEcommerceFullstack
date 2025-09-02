'use strict';



module.exports = {
  addNew: async (ctx, next) => {
    try {
      const productId = ctx.request.body.productId;
      const amount = ctx.request.body.amount;
      const data = await strapi
            .service("api::add-to-favorite-products.add-to-favorite-products")
            .addNew(ctx.state.user,productId, amount);
      ctx.body = data;
      
    } catch (err) {
      ctx.body = err;
    }
  }
};

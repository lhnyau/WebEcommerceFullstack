'use strict';

/**
 * A set of functions called "actions" for `my-favorite-products`
 */

module.exports = {
  getMyFavoriteProducts: async (ctx, next) => {
    try {
          const data = await strapi
        .service("api::my-favorite-products.my-favorite-products")
        .getMyFavoriteProducts(ctx.state.user.favoriteProducts);
      ctx.body = data;

    } catch (err) {
      ctx.body = err;
    }
  },
  
};
// @ts-nocheck
'use strict';

/**
 * my-favorite-products service
 */

module.exports = () => ({
    getMyFavoriteProducts: async (favoriteProducts) => {
        for(var i = 0; i < favoriteProducts.length; i++){
            favoriteProducts[i] = await strapi.entityService.findOne('api::product.product', favoriteProducts[i].productId, {
                populate: { category: true , image: true},
            });
        }
        return favoriteProducts;
    },

    
});
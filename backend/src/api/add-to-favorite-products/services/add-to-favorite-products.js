// @ts-nocheck
'use strict';

/**
 * add-to-shopping-cart service
 */

module.exports = () => ({
    addNew: async (user, productId, amount) => {
        console.log(productId)
       const favoriteProducts = user.favoriteproducts
        var exist = false;
       for(var i = 0; i < favoriteProducts.length; i++){
            if  (+favoriteProducts[i].productId === +productId){
                exist = true;
                var newAmount = +favoriteProducts[i].amount + amount
                if (newAmount <= 0){
                    favoriteProducts.splice(i, 1);
                }
                else{
                    favoriteProducts[i].amount = newAmount
                }
                break;
            }
       }
       if (!exist){
        favoriteProducts.push({
            productId, amount
        })
       }

       const entry = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
            data: {
                favoriteproducts: favoriteProducts,
            },
        });
        for(var i = 0; i < favoriteProducts.length; i++){
            const amount = favoriteProducts[i].amount
            favoriteProducts[i] = await strapi.entityService.findOne('api::product.product', favoriteProducts[i].productId, {
                populate: { category: true , image: true},
              });
              favoriteProducts[i].amount = amount;
        }
       return favoriteProducts
    },
});
'use strict';

/**
 * my-orders service
 */
const addMoreProductDetail = async (products) => {
    for (var i = 0; i < products.length; i++) {
        const amount = products[i].amount;
        products[i] = await strapi.entityService.findOne('api::product.product', products[i].productId, {
            populate: { category: true, image: true },
        });
        products[i].amount = amount;
    }
};

module.exports = () => ({
    myorders: async (user) => {
        try {
            let filters = {};

            if(user && user.id){
                const userRole = await strapi.query('plugin::users-permissions.user').findOne({
                    where: { id: user.id },
                    populate: ['role'],
                });
    
                if (userRole.role.name !== 'ShopManager') {
                    filters = { user: user.id };
                }
            }
    
            const entries = await strapi.entityService.findMany('api::order.order', {
                filters: filters,
                populate: ['products', 'user'],
            });

            for (var i = 0; i < entries.length; i++) {
                await addMoreProductDetail(entries[i].products);
            }

            return entries;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
});
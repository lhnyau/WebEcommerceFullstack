'use strict';

/**
 * check-out service
 */
const getTotalPrice = async(products)=>{
    var sum = 0;
    for(var i = 0; i < products.length; i++){
        const amount = products[i].amount;
        const entry = await strapi.entityService.findOne('api::product.product', +products[i].productId );
        console.log(entry)
        const price = entry.price
        sum += price * amount
        if (entry.in_stock - amount < 0)
            throw new Error("Error: ...")
        await strapi.entityService.update('api::product.product', +products[i].productId,  {
            data: {
                in_stock: +entry.in_stock - +amount,
            }
        });
    }
    return sum
}
module.exports = () => ({
    checkout: async (user, body)=>{
        try {
            if (user.shoppingcart.length <= 0)
                throw new Error("Error: Empty shopping cart")
            console.log(body)
            const totalPrice = await getTotalPrice(user.shoppingcart)
             await strapi.entityService.create('api::order.order', {
                data: {
                    user: user.id,
                    products: user.shoppingcart,
                    totalPrice: totalPrice,
                    address: body.address,
                    phone: body.phone,
                    publishedAt: new Date()
                },
              });
              const entry = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
                data: {
                    shoppingcart: [],
                },
            });
            return entry
        } catch (error) {
            return {erorr: "error"};
        }
    }
});

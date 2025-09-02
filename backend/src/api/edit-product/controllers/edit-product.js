'use strict';

/**
 * A set of functions called "actions" for `edit-product`
 */

module.exports = {
  editProduct: async (ctx, next) => {
    try {
      const { id } = ctx.params;
      const { name, category, price, description } = ctx.request.body;
      const image = ctx.request.files ? ctx.request.files.image : null; // Assuming you're using a file upload middleware

      const productData = { name, category, price, description, image };

      // Call the service to update the product
      const updatedProduct = await strapi
        .service('api::product.product')
        .editProduct(id, productData);

      // Send back the updated product as the response
      ctx.body = updatedProduct;
    } catch (err) {
      console.error('Error editing product:', err);
      ctx.body = err;
    }
  }
};

'use strict';

/**
 * edit-product service
 */

module.exports = () => ({
  editProduct: async (id, productData) => {
    try {
      // Cập nhật sản phẩm trong collection 'product'
      const updatedProduct = await strapi.entityService.update('api::product.product', id, {
        data: {
          name: productData.name,
          price: productData.price,
          description: productData.description,
          category: productData.category,
          image: productData.image,
        },
      });

      // Trả về sản phẩm đã được cập nhật
      return updatedProduct;
    } catch (error) {
      console.error('Error editing product:', error);
      throw error;
    }
  },
});

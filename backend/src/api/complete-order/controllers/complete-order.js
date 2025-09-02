'use strict';

module.exports = {
  completeOrder: async (ctx, next) => {
    try {
      // Gọi service để hoàn thành đơn hàng
      const data = await strapi
        .service('api::complete-order.complete-order') 
        .completeOrder(); 

      // Trả về dữ liệu nhận được như response
      ctx.body = data;
    } catch (err) {
      // Xử lý lỗi nếu có
      ctx.body = err;
    }
  }
};

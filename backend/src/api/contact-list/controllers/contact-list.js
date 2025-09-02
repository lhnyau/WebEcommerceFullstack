'use strict';

/**
 * A set of functions called "actions" for `my-orders`
 */

module.exports = {
  contactlist: async (ctx, next) => {
    try {
      const user = ctx.state.user
      const data = await strapi
            .service("api::contact-list.contact-list")
            .contactlist(user);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};

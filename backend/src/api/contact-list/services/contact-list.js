'use strict';

/**
 * contact-list service
 */

module.exports = () => ({
    getContactList: async () => {
        try {
            // Tìm kiếm entry duy nhất trong collection 'contact'
            const contactEntry = await strapi.entityService.findMany('api::contact.contact',);

            if (contactEntry && contactEntry.length > 0) {
                // Nếu tìm thấy entry, trả về entry đầu tiên
                return contactEntry[0];
            } else {
                // Nếu không tìm thấy entry nào, trả về null hoặc một object rỗng
                return null;
            }
        } catch (error) {
            console.error( error);
            throw error;
        }
    }
});
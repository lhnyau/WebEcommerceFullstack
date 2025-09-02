'use strict';

/**
 * send-message service
 */

module.exports = () => ({
    sendmessage: async (user, body) => {
        try {
            console.log(user);
            console.log(body);

            // Kiểm tra xem có đủ thông tin cần thiết không
            if (!body.name || !body.email || !body.phonenumber || !body.message) {
                throw new Error("Error: Missing required information");
            }

            // Tạo một bản ghi mới trong collection 'message' (giả sử bạn đã tạo collection này)
            const newMessage = await strapi.entityService.create('api::contact.contact', {
                data: {
                    name: body.name,
                    email: body.email,
                    phonenumber: body.phonenumber,
                    message: body.message,
                    user: user ? user.id : null, // Liên kết với user nếu có
                    publishedAt: new Date()
                },
            });

            return newMessage;
        } catch (error) {
            console.log(error);
            return { error: error.message || "An error occurred while sending the message" };
        }
    }
});
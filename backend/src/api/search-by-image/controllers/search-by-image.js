const fs = require('fs');
const path = require('path');

module.exports = {
    search: async (ctx, next) => {
        try {
            const { image } = ctx.request;
            if (!image) {
                return ctx.badRequest('Image file is required');
            }

            // Save image temporarily
            const imagePath = path.join(__dirname, '../../../uploads', image);
            // fs.writeFileSync(imagePath, fs.readFileSync(""));

            console.log('imagePath',imagePath)
            //Cai chuc nang nay mình thấy chưa đc viết ấy b

            // Call your image recognition service here
            const products = await strapi
                .service("api::search-by-image.search-by-image")
                .findProductsByImage(imagePath);

            // Delete the temporary image file
            // fs.unlinkSync(imagePath);

            ctx.body = { products }; // ensure response format matches frontend expectation
        } catch (err) {
            console.error('Error in search controller:', err);
            ctx.throw(500, err);
        }
    }
};
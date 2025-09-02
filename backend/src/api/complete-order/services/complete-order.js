'use strict';

/**
 * order service
 */

module.exports = () => ({
    completeOrder: async (orderId) => {
        try {
            
            const completedOrder = {
                orderId: orderId,
                status: 'completed',
                completedAt: new Date(),
            };

            return completedOrder;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
});

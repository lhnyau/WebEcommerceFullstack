module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/send-message',
     handler: 'send-message.sendmessage',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};

module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/contact-list',
     handler: 'contact-list.contactlist',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};

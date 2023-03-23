// import request from 'supertest'
// import app from '../../../app.js'
// import users from '../data/users.js'

// // Admins
// describe('Get Clients', () => {
//   // const users = [
//   //   {
//   //     id: "1",
//   //     userName: "chuong",
//   //     password: "1234",
//   //     active: 1,
//   //     info: {
//   //       FullName: "chuong tran",
//   //       Address1: "add",
//   //       Address2: "",
//   //       city: "Houston",
//   //       State: "TX",
//   //       Zipcode: "77204",
//   //     },
//   //   }
//   // ]
//   it('should return a list of active clients.', async () => {
//     const response = await request(app)
//       .get('/api/admin/getClients')
//     expect(response.status).toBe(200);
//     expect(response.body).toBeInstanceOf(Array);
//     expect(response.body.length).toBeGreaterThan(0);
//     expect(response.body[0]).toHaveProperty('active');
//     expect(response.body[0]).toHaveProperty('id');
//     expect(response.body[0]).toHaveProperty('info');
//     expect(response.body[0]).toHaveProperty('password');
//     expect(response.body[0]).toHaveProperty('userName')
//   });
// })

// describe('Get Client By ID', () => {
//   // const users = [
//   //   {
//   //     id: "1",
//   //     userName: "chuong",
//   //     password: "1234",
//   //     active: 1,
//   //     info: {
//   //       FullName: "chuong tran",
//   //       Address1: "add",
//   //       Address2: "",
//   //       city: "Houston",
//   //       State: "TX",
//   //       Zipcode: "77204",
//   //     },
//   //   }
//   // ]
//   it('should return user information if ID exists.', async () => {
//     const response = await request(app)
//       .get('/api/admin/getClient/1')
//       expect(response.statusCode).toEqual(200)
//       expect(response.body).toEqual(users[0].info)
//   })
//   it('should return 400 if ID does not exists.', async () => {
//     const response = await request(app)
//       .get('/api/admin/getClient/100')
//       .timeout({ response: 5000 })
//       expect(response.statusCode).toEqual(400)
//       expect(response.body.error)
//   })
// })


// // Users
// describe('Get Users', () => {
//   test('should return user information and orders.', async () => {
//     const response = await request(app)
//       .get('/api/user/getUsers')
//     expect(response.status).toBe(200);
//     expect(response.body).toBeDefined();
//     expect(Array.isArray(response.body)).toBe(true);
//     expect(response.body.length).toBeGreaterThan(0);
//     expect(response.body[0]).toHaveProperty('id');
//     expect(response.body[0]).toHaveProperty('userName');
//     expect(response.body[0]).toHaveProperty('password');
//     expect(response.body[0]).toHaveProperty('active');
//     expect(response.body[0]).toHaveProperty('info');
//     expect(response.body[0]).toHaveProperty('orders');
//   })
// })
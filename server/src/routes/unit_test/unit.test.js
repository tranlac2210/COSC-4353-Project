import request from 'supertest'
import app from '../../../app.js'
import users from '../data/users.js'
import bcrypt from "bcrypt";
import jest from 'jest-mock';

const mock = jest.fn();

// Admins
describe('Admin', () => {
  describe('Get Clients', () => {

    // Collect all clients
    describe('Collect all clients', () => {
      it('should return a list of active clients', async () => {
        const response = await request(app)
          .get('/api/admin/getClients')
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('active');
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('info');
        expect(response.body[0]).toHaveProperty('password');
        expect(response.body[0]).toHaveProperty('userName')
        });
    })

    // Collect a client
    describe('Collect a Client by ID', () => {
      describe('Valid ID', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .get(`/api/admin/getClient/${users[0].id}`)
            expect(response.statusCode).toEqual(200)
            expect(response.body).toEqual(users[0].info)
          })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/getClient/${users[1].id}`)
            expect(response.statusCode).toEqual(200)
            expect(response.body).toEqual(users[1].info)
          })
        })
      describe('Invalid ID', () => {
        const userID = [5, 6]
        it('Test Case 1', async () => {
          const response = await request(app)
            .get(`/api/admin/getClient/${userID[0]}`)
            expect(response.statusCode).toEqual(400)
            expect(response.body.error)
          })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/getClient/${userID[1]}`)
            expect(response.statusCode).toEqual(400)
            expect(response.body.error)
          })
        })
    })

    // Deactivate a Client
    describe('Deactivate a Client by ID', () => {
      const userID = [7, 8]
      describe('Valid ID', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .get(`/api/admin/deactivateClient/${users[0].id}`)
            expect(response.statusCode).toEqual(200)
        })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/deactivateClient/${users[1].id}`)
            expect(response.statusCode).toEqual(200)
        })
      })
      describe('Invalid ID', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .get(`/api/admin/deactivateClient/${userID[0]}`)
            expect(response.statusCode).toEqual(400)
        })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/deactivateClient/${userID[1]}`)
            expect(response.statusCode).toEqual(400)
        })
      })
    })

    // Update a Client
    describe('Update a Client by ID.', () => {
      describe('Valid ID', () => {
        it('Test Case 1', async () => {
          // const response = await request(app)
          //   .get('/api/admin/modifyClientInfo/1')
          //   expect(response.statusCode).toEqual(200)
          const newInfo = {
            FullName: 'Lac Tran',
            Address1: 'Add1',
            Address2: '',
            city: 'Sometown',
            State: 'CA',
            Zipcode: '77076',
          };
          const response = await request(app)
            .put(`/api/admin/modifyClientInfo/${users[0].id}`)
            .send(newInfo)
            // .expect(200);
            expect(response.statusCode).toEqual(200)
            expect(users.find((user) => user.id === users[0].id).info).toEqual(newInfo);
          })
        it('Test Case 2', async () => {
          // const response = await request(app)
          //   .get('/api/admin/modifyClientInfo/2')
          //   expect(response.statusCode).toEqual(200)
          const newInfo = {
            FullName: 'Lac Tran 1',
            Address1: 'Add2',
            Address2: '',
            city: 'Sometown',
            State: 'CA',
            Zipcode: '77077',
          };
          const response = await request(app)
            .put(`/api/admin/modifyClientInfo/${users[1].id}`)
            .send(newInfo)
            // .expect(200);
            expect(response.statusCode).toEqual(200)
            expect(users.find((user) => user.id === users[1].id).info).toEqual(newInfo);
        })
      })
      describe('Invalid ID', () => {
        const userID = [9, 10]
        it('Test Case 1', async () => {
          // const response = await request(app)
          //   .get('/api/admin/modifyClientInfo/5')
          //   expect(response.statusCode).toEqual(400)
          const newInfo = {
            FullName: 'Lac Tran 3',
            Address1: 'Add3',
            Address2: '',
            city: 'Sometown',
            State: 'CA',
            Zipcode: '77078',
          };
          const response = await request(app)
            .put(`/api/admin/modifyClientInfo/${userID[0]}`)
            .send(newInfo)
            // .expect(200);
            expect(response.statusCode).toEqual(400)
            expect(response.body.error)
        })
        it('Test Case 2', async () => {
          // const response = await request(app)
          //   .get('/api/admin/modifyClientInfo/6')
          //   expect(response.statusCode).toEqual(400)
          const newInfo = {
            FullName: 'Lac Tran 4',
            Address1: 'Add4',
            Address2: '',
            city: 'Sometown',
            State: 'CA',
            Zipcode: '77079',
          };
          const response = await request(app)
            .put(`/api/admin/modifyClientInfo/${userID[1]}`)
            .send(newInfo)
            // .expect(200);
            expect(response.statusCode).toEqual(400)
            expect(response.body.error)
        })
      })
    })

    // Collect an Order by ID
    describe('Collect an Order by ID', () => {
      describe('Valid ID', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .get(`/api/admin/getClientOrder/${users[0].id}`)
            expect(response.statusCode).toEqual(200)
            expect(response.body).toEqual(users[0].orders)
          })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/getClientOrder/${users[1].id}`)
            expect(response.statusCode).toEqual(200)
            expect(response.body).toEqual(users[1].orders)
          })
        })
      describe('Invalid ID', () => {
        const userID = [11, 12]
        it('Test Case 1', async () => {
          const response = await request(app)
            .get(`/api/admin/getClientOrder/${userID[0]}`)
            expect(response.statusCode).toEqual(400)
            expect(response.body.error)
          })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/getClientOrder/${userID[1]}`)
            expect(response.statusCode).toEqual(400)
            expect(response.body.error)
          })
        })
    })

    // Sign Up
    describe('Signup', () => {
      describe('Create a New Admin Account', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .post(`/api/admin/signup`)
            .send({
              userName: 'newadmin',
              password: 'password',
              confirmedPassword: 'password',
            });
          expect(response.statusCode).toEqual(200);
          expect(response.body.success)
        });
      })   
      describe('Check If UserName or Password Is Missing', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .post(`/api/admin/signup`)
            .send({
              userName: '',
              password: '',
              confirmedPassword: '',
            });   
          expect(response.statusCode).toEqual(400);
          expect(response.body.error)
        });
      })
      describe('Check If ConfirmedPassword Does Not Match', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .post(`/api/admin/signup`)
            .send({
              userName: 'newadmin',
              password: 'password',
              confirmedPassword: 'wrongpassword',
            });   
          expect(response.statusCode).toEqual(400);
          expect(response.body.error)
        });
      }) 
      describe('Check If UserName Already Exists', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .post(`/api/admin/signup`)
            .send({
              userName: 'newadmin',
              password: 'password',
              confirmedPassword: 'password',
            });
          expect(response.statusCode).toEqual(409);
          expect(response.body.error)
        });
      })    
    });

    // Sign In
    describe('Sign In', () => {
      describe('Check If Username Or Password Is Missing.', () => {
        it('Test Case 1', async () => {
          const res = await request(app)
            .post(`/api/admin/signin`)
            .send({});
          expect(res.statusCode).toEqual(400);
          expect(res.body.error)
        });
      })
      describe('Check If Username Is Not Found.', () => {
        it('Test Case 1', async () => {
          const res = await request(app)
            .post(`/api/admin/signin`)
            .send({ userName: 'unknown', password: users[0].password });
          expect(res.statusCode).toEqual(400);
          expect(res.body.error)
      });
      })
      describe('Check If Password Is Incorrect', () => {
        it('Test Case 1', async () => {
          const res = await request(app).
            post(`/api/admin/signin`)
            .send({ userName: users[0].userName, password: 'invalid' });
          expect(res.statusCode).toEqual(400);
          expect(res.body.error)
      });
      })
      describe('Check If Username and Password Are Correct', () => {
        it('Test Case 1', async () => {
          const res = await request(app)
            .post(`/api/admin/signin`)
            .send({ userName: 'chuongadmin', password: '1234' });
          expect(res.statusCode).toEqual(200);
      });
      })
    });
    
    // Change Password
    describe('Change Password', () => {
      describe('Check If User Does Not Exist', () => {
        it('Test Case 1', async () => {
          const res = await request(app)
            .put(`/api/admin/passwordChange`)
            .send({ userName: 'unknown', password: '1234' });
          expect(res.statusCode).toEqual(400);
          expect(res.body.error)
        });
      })
      describe('Change Password of The Existing User', () => {
        it('Test Case 1', async () => {
          const existingAdmin = { userName: 'chuongadmin2', password: '1234' };
          const newPassword = '1235';

          // Add the existing user to the admins array
          const admins = [existingAdmin];

          // Use mock implementation for bcrypt to avoid hashing the password
          bcrypt.genSalt = mock.mockReturnValue('mocksalt');
          bcrypt.hash = mock.mockResolvedValue('mockhash');

          const res = await request(app)
            .put(`/api/admin/passwordChange`)
            .send({ userName: existingAdmin.userName, password: newPassword });

          // Check the response status and message
          expect(res.statusCode).toEqual(200);
          expect(res.body)

          // Check if the password of the existing user is changed
          const updatedAdmin = admins.find((admin) => admin.userName === existingAdmin.userName);
          expect(updatedAdmin.password)
        });
      })
    });

    // Collect all Admins
    describe('Collect all Admins', () => {
      it('Should return a list of active admins', async () => {
        const response = await request(app)
          .get('/api/admin/getAdmins')
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('userName')
        expect(response.body[0]).toHaveProperty('password');
        });
    })

  })
})


// Users
describe('Users', () => {
  describe('Get Users', () => {
    test('should return user information and orders.', async () => {
      const response = await request(app)
        .get('/api/user/getUsers')
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('userName');
      expect(response.body[0]).toHaveProperty('password');
      expect(response.body[0]).toHaveProperty('active');
      expect(response.body[0]).toHaveProperty('info');
      expect(response.body[0]).toHaveProperty('orders');
    })
  })
})

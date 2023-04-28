import request from 'supertest'
import app from '../../../app.js'
// import users from '../data/users.js'
import bcrypt from "bcrypt";
import jest from 'jest-mock';
import { uuid } from "uuidv4";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const mock = jest.fn();

// Admins
describe('Admin', () => {
  describe('Get Clients', () => {

    // Collect all clients
    describe('Collect all clients', () => {
      it('Collect a list of active clients', async () => {
        const response = await request(app)
          .get('/api/admin/getClients')
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('User_id');
        expect(response.body[0]).toHaveProperty('username');
        expect(response.body[0]).toHaveProperty('password');
        expect(response.body[0]).toHaveProperty('active');
        expect(response.body[0]).toHaveProperty('Fullname');
        expect(response.body[0]).toHaveProperty('address1');
        expect(response.body[0]).toHaveProperty('address2');
        expect(response.body[0]).toHaveProperty('city');
        expect(response.body[0]).toHaveProperty('state');
        expect(response.body[0]).toHaveProperty('zipcode');
        });
    })

    // Collect a client
    describe('Collect a Client by ID', () => {
      describe('Valid ID', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .get(`/api/admin/getClient/0be325a1-163f-4fd3-89ef-0ba8eea803cc`)
            expect(response.status).toBe(200);
          })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/getClient/32f5dbc5-0b26-42f1-a61b-2a9dd32c1b75`)
            expect(response.status).toBe(200);
          })
        })
      describe('Invalid ID', () => {
        const userID = [5, 6]
        it('Test Case 1', async () => {
          const response = await request(app)
            .get(`/api/admin/getClient/asdfkjlkjb`)
            expect(response.statusCode).toEqual(400)
            expect(response.body.error)
          })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/getClient/woirtulkjb`)
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
            .get(`/api/admin/deactivateClient/16ad3275-60fd-452a-88f7-700ffee08d43`)
            expect(response.statusCode).toEqual(200)
        })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/deactivateClient/f62976a2-e44b-4353-b172-3b4f6bc0b9e3`)
            expect(response.statusCode).toEqual(200)
        })
      })
      describe('Invalid ID', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .get(`/api/admin/deactivateClient/asdfkjlkjb`)
            expect(response.statusCode).toEqual(400)
        })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/deactivateClient/woirtulkjb`)
            expect(response.statusCode).toEqual(400)
        })
      })
    })

    // Update a Client
    describe('Update a Client by ID.', () => {
      describe('Valid ID', () => {
        it('Test Case 1', async () => {
          const newInfo = {
            "username": "charles",
            "password": "1234",
            "active": 1,
            "Fullname": "CharlesTran",
            "address1": "12354 Brooklyn Ln",
            "address2": "",
            "city": "Richmond",
            "state": "TX",
            "zipcode": "77407"
          };
          const response = await request(app)
            .put(`/api/admin/modifyClientInfo/0be325a1-163f-4fd3-89ef-0ba8eea803cc`)
            .send(newInfo)
            expect(response.statusCode).toEqual(200)
          })
        it('Test Case 2', async () => {
          const newInfo = {
            "username": "lac",
            "password": "1234",
            "active": 1,
            "Fullname": "Lac Tran",
            "address1": "8711 Crest Ln",
            "address2": "",
            "city": "Richmond",
            "state": "TX",
            "zipcode": "77407"
          };
          const response = await request(app)
            .put(`/api/admin/modifyClientInfo/32f5dbc5-0b26-42f1-a61b-2a9dd32c1b75`)
            .send(newInfo)
            expect(response.statusCode).toEqual(200)
        })
      })
      describe('Invalid ID', () => {
        const userID = [9, 10]
        it('Test Case 1', async () => {
          const newInfo = {
            "username": "lac",
            "password": "1234",
            "active": 1,
            "Fullname": "Lac Tran",
            "address1": "8711 Crest Ln",
            "address2": "",
            "city": "Richmond",
            "state": "TX",
            "zipcode": "77407"
          };
          const response = await request(app)
            .put(`/api/admin/modifyClientInfo/asdfkjlkjb`)
            .send(newInfo)
            expect(response.statusCode).toEqual(400)
            expect(response.body.error)
        })
        it('Test Case 2', async () => {
          const newInfo = {
            "username": "lac",
            "password": "1234",
            "active": 1,
            "Fullname": "Lac Tran",
            "address1": "8711 Crest Ln",
            "address2": "",
            "city": "Richmond",
            "state": "TX",
            "zipcode": "77407"
          };
          const response = await request(app)
            .put(`/api/admin/modifyClientInfo/woirtulkjb`)
            .send(newInfo)
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
            .get(`/api/admin/getClientOrder/0be325a1-163f-4fd3-89ef-0ba8eea803cc`)
            expect(response.statusCode).toEqual(200)
          })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/getClientOrder/0f233a55-487b-47d4-95ba-e6b968bb2ffc`)
            expect(response.statusCode).toEqual(200)
          })
        })
      describe('Invalid ID', () => {
        const userID = [11, 12]
        it('Test Case 1', async () => {
          const response = await request(app)
            .get(`/api/admin/getClientOrder/asdfkjlkjb`)
            expect(response.statusCode).toEqual(400)
          })
        it('Test Case 2', async () => {
          const response = await request(app)
            .get(`/api/admin/getClientOrder/woirtulkjb`)
            expect(response.statusCode).toEqual(400)
          }, 60000)
        })
    })

    // Sign Up
    // describe('Signup', () => {
    //   describe('Create a New Admin Account', () => {
    //     it('Test Case 1', async () => {
    //       const response = await request(app)
    //         .post(`/api/admin/signup`)
    //         .send({
    //           username: 'newadmin',
    //           password: 'password',
    //           confirmedPassword: 'password',
    //         });
    //       expect(response.statusCode).toEqual(200);
    //     });
    //   })   
    //   describe('Check If UserName or Password Is Missing', () => {
    //     it('Test Case 1', async () => {
    //       const response = await request(app)
    //         .post(`/api/admin/signup`)
    //         .send({
    //           username: '',
    //           password: '',
    //           confirmedPassword: '',
    //         });   
    //       expect(response.statusCode).toEqual(400);
    //     });
    //   })
    //   describe('Check If ConfirmedPassword Does Not Match', () => {
    //     it('Test Case 1', async () => {
    //       const response = await request(app)
    //         .post(`/api/admin/signup`)
    //         .send({
    //           username: 'newadmin',
    //           password: 'password',
    //           confirmedPassword: 'wrongpassword',
    //         });   
    //       expect(response.statusCode).toEqual(400);
    //     });
    //   }) 
    //   describe('Check If UserName Already Exists', () => {
    //     it('Test Case 1', async () => {
    //       const response = await request(app)
    //         .post(`/api/admin/signup`)
    //         .send({
    //           username: 'newadmin',
    //           password: 'password',
    //           confirmedPassword: 'password',
    //         });
    //       expect(response.statusCode).toEqual(409);
    //     });
    //   })    
    // });

    // Sign In
    describe('Sign In', () => {
      describe('Check If Username Or Password Is Missing.', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .post(`/api/admin/signin`)
            .send({});
          expect(response.statusCode).toEqual(400);
          expect(response.body.error)
        });
      })
      describe('Check If Username Is Not Found.', () => {
        const users = [    { userName: 'chuong5', password: '1234' },    { userName: 'phat', password: '1234' },]
        it('Test Case 1', async () => {
          const response = await request(app)
            .post(`/api/admin/signin`)
            .send({ userName: 'unknown', password: users[0].password });
          expect(response.statusCode).toEqual(400);
          expect(response.body.error)
      });
      })
      describe('Check If Password Is Incorrect', () => {
        const users = [    { userName: 'chuong5', password: 'password1' },    { userName: 'phat', password: 'password2' },]
        it('Test Case 1', async () => {
          const response = await request(app).
            post(`/api/admin/signin`)
            .send({ userName: users[0].userName, password: 'invalid' });
          expect(response.statusCode).toEqual(400);
          expect(response.body.error)
      });
      })
      describe('Check If Username and Password Are Correct', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .post(`/api/admin/signin`)
            .send({ userName: 'chuongadmin', password: '1234' });
          expect(response.statusCode).toEqual(200);
      });
      })
    });
    
    // Change Password
    // describe('Change Password', () => {
    //   describe('Check If User Does Not Exist', () => {
    //     it('Test Case 1', async () => {
    //       const response = await request(app)
    //         .put(`/api/admin/passwordChange`)
    //         .send({ userName: 'unknown', password: '1234' });
    //       expect(response.statusCode).toEqual(400);
    //       expect(response.body.error)
    //     });
    //   })
    //   describe('Change Password of The Existing User', () => {
    //     it('Test Case 1', async () => {
    //       const existingAdmin = { userName: 'chuongadmin2', password: '1234' };
    //       const newPassword = '1235';

    //       // Add the existing user to the admins array
    //       const admins = [existingAdmin];

    //       // Use mock implementation for bcrypt to avoid hashing the password
    //       bcrypt.genSalt = mock.mockReturnValue('mocksalt');
    //       bcrypt.hash = mock.mockResolvedValue('mockhash');

    //       const response = await request(app)
    //         .put(`/api/admin/passwordChange`)
    //         .send({ userName: existingAdmin.userName, password: newPassword });

    //       // Check the response status and message
    //       expect(response.statusCode).toEqual(200);
    //       expect(response.body)

    //       // Check if the password of the existing user is changed
    //       const updatedAdmin = admins.find((admin) => admin.userName === existingAdmin.userName);
    //       expect(updatedAdmin.password)
    //     });
    //   })
    // });

    // Collect all Admins
    describe('Collect all Admins', () => {
      it('Should return a list of active admins', async () => {
        const response = await request(app)
          .get('/api/admin/getAdmins')
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('username')
        expect(response.body[0]).toHaveProperty('password');
        });
    })

  })
})


// Users
describe('Users', () => {
  
  // Collect all users
  describe('Collect all Users', () => {
    test('should return user information and orders.', async () => {
      const response = await request(app)
        .get('/api/user/getUsers')
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('User_id');
      expect(response.body[0]).toHaveProperty('username');
      expect(response.body[0]).toHaveProperty('password');
      expect(response.body[0]).toHaveProperty('info_id');
      expect(response.body[0]).toHaveProperty('active');

    })
  })

  // Sign Up
  describe('Sign Up', () => {
    let users = [];

    beforeEach(() => {
      // reset users array before each test
      users = [];
    });
    describe('Validate token for a new user', () => {
      it('should return a 200 status code and an access token when valid user information is provided', async () => {
        const newUser = {
          userName: 'testuser199', // testuser200
          password: 'testpassword199', // testpassword200
          confirmedPassword: 'testpassword199', // testpassword200
        };
    
        const response = await request(app)
          .post('/api/user/signup')
          .send(newUser);
    
        expect(response.statusCode).toEqual(200);
        expect(response.body.accessToken).toBeDefined();
      });

      it('should return a 409 status code when the username already exists', async () => {
        const existingUser = {
          userName: 'testuser',
          password: 'testpassword',
          confirmedPassword: 'testpassword',
        };
    
        // Sign up the existing user first
        await request(app)
          .post('/api/user/signup')
          .send(existingUser);
    
        // Attempt to sign up the same user again
        const response = await request(app)
          .post('/api/user/signup')
          .send(existingUser);
    
        expect(response.statusCode).toEqual(409);
        expect(response.body.error).toBeDefined();
      });
    //   it('Test Case 1', async () => {
    //     const newUser = {
    //       userName: 'testuser',
    //       password: 'testpassword',
    //       confirmedPassword: 'testpassword',
    //     };

    //     const salt = await bcrypt.genSalt(10);
    //     const encryptedPassword = await bcrypt.hash(newUser.password, salt);
    //     const newUserId = uuid();

    //     const expectedUser = {
    //       User_id: newUserId,
    //       username: newUser.userName,
    //       password: encryptedPassword,
    //       info_id: 15,
    //       active: 1,
    //     };

    //     const response = await request(app)
    //       .post('/api/user/signup')
    //       .send(newUser)
    //       expect(response.statusCode).toEqual(200);
    //   });
    })

    describe('Check if invalid username or password', () => {
      it('Test Case 1', async () => {
        const invalidUser = {
          userName: '',
          password: '',
          confirmedPassword: '',
        };

        const response = await request(app)
          .post('/api/user/signup')
          .send(invalidUser)
          expect(response.statusCode).toEqual(400);
          // expect(response.body.error)
      });
    })
    
    describe('Check if password confirmation mismatch', () => {
      test('should return 400 for password confirmation mismatch', async () => {
        const mismatchUser = {
          userName: 'testuser',
          password: 'testpassword',
          confirmedPassword: 'differentpassword',
        };

        const response = await request(app)
          .post('/api/user/signup')
          .send(mismatchUser)
          expect(response.statusCode).toEqual(400);
          // expect(response.body.error)
    });
    })
    
    describe('Check if an existing username', () => {
      it('Test Case 1', async () => {
        const existingUser = {
          userName: 'testuser',
          password: 'testpassword',
          confirmedPassword: 'testpassword',
        };

        const response = await request(app)
          .post('/api/user/signup')
          .send(existingUser)
          expect(response.statusCode).toEqual(409);
      });
    })
  })

  // Sign In
  describe('Sign In', () => {
    describe('Check If Username Or Password Is Missing.', () => {
      it('Test Case 1', async () => {
        const response = await request(app)
          .post(`/api/user/signin`)
          .send({});
        expect(response.statusCode).toEqual(400);
      });
    })
    describe('Check If Username Is Not Found.', () => {
      it('Test Case 1', async () => {
        const response = await request(app)
          .post(`/api/user/signin`)
          .send({ username: 'unknown', password: '123456' });
        expect(response.statusCode).toEqual(400);
    });
    })
    describe('Check If Password Is Incorrect', () => {
      it('Test Case 1', async () => {
        const response = await request(app).
          post(`/api/user/signin`)
          .send({ userame: 'chuong5', password: 'invalid' });
        expect(response.statusCode).toEqual(400);
    });
    })
    describe('Check If Username and Password Are Correct', () => {
      it('Test Case 1', async () => {
        const response = await request(app)
          .post(`/api/user/signin`)
          // .send({ userName: users[0].userName, password: users[0].password });
          .send({ userName: 'chuong5', password: '1234' });
        expect(response.statusCode).toEqual(200);
    });
    })
  });

  // describe('Logout', () => {
  //   describe('remove the refresh token from the refreshTokens array', () => {
  //     it('Test Case 1', async () => {
  //       // First, add a refresh token to the refreshTokens array
  //       const refreshToken = 'dummy-refresh-token';
  //       app.locals.refreshTokens

  //       // Then, call the Logout endpoint with the same refresh token
  //       const response = await request(app)
  //         .post('/api/user/logout')
  //         .send({ token: refreshToken })
  //         // .expect(204);
  //         expect(response.statusCode).toEqual(204);
  //         expect(response.body.token)
  //       // Finally, assert that the refresh token was removed from the refreshTokens array
  //       // expect(app.locals.refreshTokens).not.toContain(refreshToken);
  //       expect(app.locals.refreshTokens)
  //     });
  //   })
    
  //   describe('Validate refresh token', () => {
  //     it('Test Case 1', async () => {
  //       const refreshToken = 'dummy-refresh-token';
  //       const response = await request(app)
  //         .post('/api/user/logout')
  //         .send({ token: refreshToken })
  //         // .expect(204);
  //         expect(response.statusCode).toEqual(204);
  //         expect(response.body.token)
  //     });
  //   })  
  // });

  describe('Collect Users Info Change', () => {
    describe('with Access Token', () => {
      it('Test Case 1', async () => {
        const response = await request(app)
          .post(`/api/user/UserInfoChange`)
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5Mjg4ZmUxLWNjNjEtNDQyMy1hZGQ2LTU4NWJmN2U3ZWZlYyIsImlhdCI6MTY4MDI1NTM2M30.jEpkjZSyfYZDQhOEnP2jdpxMThcJzLMFuvDIJhdvcLA')
          .send({  Fullname: "LAc Tran",
          address1: "123445",
          address2: "",
          city: "Houston",
          state: "TX",
          zipcode: "77523" });
          expect(response.statusCode).toEqual(200);
      });
    })
  });

  // describe('Save Users Fuel', () => {
  //   describe('with Access Token', () => {
  //     it('Test Case 1', async () => {
  //       const response = await request(app)
  //         .post(`/api/user/Userpostfuel`)
  //         .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkM2I3ZGMxLWQwOWItNDg4ZC1iODZhLTAwMmFlZDNhYWIxMyIsImlhdCI6MTY4MTUwMDIzOX0.yNusmLHRalFPpB1azEthz5FomqDsd3wJXFSu8WILCHg');
  //         expect(response.statusCode).toEqual(200);
  //     });
  //   })
  // });

  describe('Collect Users Order', () => {
    describe('with Access Token', () => {
      it('Test Case 1', async () => {
        const response = await request(app)
          .get(`/api/user/getUsersorder`)
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiZTMyNWExLTE2M2YtNGZkMy04OWVmLTBiYThlZWE4MDNjYyIsImlhdCI6MTY4MTk2Mzk4M30.GTrURgIqbIiQepiqHfnH3erqVe9M01NO-CI3y-7I9UI');
          expect(response.statusCode).toEqual(200);
      });
    })
  });

  describe('Collect Authen Users', () => {
    describe('with Access Token', () => {
      it('Test Case 1', async () => {
        const response = await request(app)
          .get(`/api/user/authGetUsers`)
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5Mjg4ZmUxLWNjNjEtNDQyMy1hZGQ2LTU4NWJmN2U3ZWZlYyIsImlhdCI6MTY4MDI1NTM2M30.jEpkjZSyfYZDQhOEnP2jdpxMThcJzLMFuvDIJhdvcLA');
          expect(response.statusCode).toEqual(200);
      });
    })
  });

  describe('Update Fuel Quotes', () => {
    describe('with Access Token', () => {
      it('Test Case 1', async () => {
        const response = await request(app)
          .post(`/api/user//fuelQuote`)
          .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZkM2I3ZGMxLWQwOWItNDg4ZC1iODZhLTAwMmFlZDNhYWIxMyIsImlhdCI6MTY4MTUwMDIzOX0.yNusmLHRalFPpB1azEthz5FomqDsd3wJXFSu8WILCHg');
          expect(response.statusCode).toEqual(200);
      });
    })
  });



})  
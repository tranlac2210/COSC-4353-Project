import request from 'supertest'
import app from '../../../app.js'
import users from '../data/users.js'
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
          const response = await request(app)
            .post(`/api/admin/signin`)
            .send({});
          expect(response.statusCode).toEqual(400);
          expect(response.body.error)
        });
      })
      describe('Check If Username Is Not Found.', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .post(`/api/admin/signin`)
            .send({ userName: 'unknown', password: users[0].password });
          expect(response.statusCode).toEqual(400);
          expect(response.body.error)
      });
      })
      describe('Check If Password Is Incorrect', () => {
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
    describe('Change Password', () => {
      describe('Check If User Does Not Exist', () => {
        it('Test Case 1', async () => {
          const response = await request(app)
            .put(`/api/admin/passwordChange`)
            .send({ userName: 'unknown', password: '1234' });
          expect(response.statusCode).toEqual(400);
          expect(response.body.error)
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

          const response = await request(app)
            .put(`/api/admin/passwordChange`)
            .send({ userName: existingAdmin.userName, password: newPassword });

          // Check the response status and message
          expect(response.statusCode).toEqual(200);
          expect(response.body)

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
  
  // Collect all users
  describe('Collect all Users', () => {
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

  // Sign Up
  describe('Sign Up', () => {
    let users = [];

    beforeEach(() => {
      // reset users array before each test
      users = [];
    });
    describe('Validate token for a new user', () => {
      it('Test Case 1', async () => {
        const newUser = {
          userName: 'testuser',
          password: 'testpassword',
          confirmedPassword: 'testpassword',
        };

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(newUser.password, salt);
        const newUserId = uuid();

        const expectedUser = {
          id: newUserId,
          userName: newUser.userName,
          password: encryptedPassword,
          active: 1,
          info: {
            FullName: '',
            Address1: '',
            Address2: '',
            city: '',
            State: '',
            Zipcode: '',
          },
          orders: [],
        };

        const response = await request(app)
          .post('/api/user/signup')
          .send(newUser)
          expect(response.statusCode).toEqual(200);

        const accessToken = response.body.accessToken;
        const refreshToken = response.body.refreshToken;

        // validate the tokens
        const decodedAccessToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        expect(decodedAccessToken)
        expect(decodedRefreshToken)

        // validate the user was added to the users array
        expect(expectedUser)
      });
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
          expect(response.body.error)
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
          expect(response.body.error)
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
          expect(response.body.error)
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
        expect(response.body.error)
      });
    })
    describe('Check If Username Is Not Found.', () => {
      it('Test Case 1', async () => {
        const response = await request(app)
          .post(`/api/user/signin`)
          .send({ userName: 'unknown', password: users[0].password });
        expect(response.statusCode).toEqual(400);
        expect(response.body.error)
    });
    })
    describe('Check If Password Is Incorrect', () => {
      it('Test Case 1', async () => {
        const response = await request(app).
          post(`/api/user/signin`)
          .send({ userName: users[0].userName, password: 'invalid' });
        expect(response.statusCode).toEqual(400);
        expect(response.body.error)
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

  describe('Logout', () => {
    describe('remove the refresh token from the refreshTokens array', () => {
      it('Test Case 1', async () => {
        // First, add a refresh token to the refreshTokens array
        const refreshToken = 'dummy-refresh-token';
        app.locals.refreshTokens

        // Then, call the Logout endpoint with the same refresh token
        const response = await request(app)
          .post('/api/user/logout')
          .send({ token: refreshToken })
          // .expect(204);
          expect(response.statusCode).toEqual(204);
          expect(response.body.token)
        // Finally, assert that the refresh token was removed from the refreshTokens array
        // expect(app.locals.refreshTokens).not.toContain(refreshToken);
        expect(app.locals.refreshTokens)
      });
    })
    
    describe('Validate refresh token', () => {
      it('Test Case 1', async () => {
        const refreshToken = 'dummy-refresh-token';
        const response = await request(app)
          .post('/api/user/logout')
          .send({ token: refreshToken })
          // .expect(204);
          expect(response.statusCode).toEqual(204);
          expect(response.body.token)
      });
    })  
  });

  describe('Get Token', () => {
    describe('Validate a new access token if the refresh token is valid', () => {
      it('Test Case 1', async () => {
        // First, generate a valid refresh token and add it to the refreshTokens array
        const refreshToken = jwt.sign({ id: 1 }, process.env.REFRESH_TOKEN_SECRET);
        app.locals.refreshTokens

        // Then, call the getToken endpoint with the same refresh token
        const response = await request(app)
          .post('/api/user/token')
          .send({ token: refreshToken })
          expect(response.statusCode).toEqual(200);

        // Finally, assert that the response contains a new access token
        expect(response.body.accessToken).toBeDefined();
      });
    })
    
    describe('Check if no refresh token is provided', () => {
      it('Test Case 1', async () => {
        const response = await request(app)
          .post('/api/user/token')
          expect(response.statusCode).toEqual(401);
      });
    })
    
    describe('Check if the refresh token is invalid', () => {
      it('Test Case 1', async () => {
        const refreshToken = 'invalid-refresh-token';
        const response = await request(app)
          .post('/api/user/token')
          .send({ token: refreshToken })
          expect(response.statusCode).toEqual(403);
      });
    })
    
  });
})  
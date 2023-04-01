import express from "express";
import bcrypt from "bcrypt";
import { uuid } from "uuidv4";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import users from "../data/users.js";
import pool from "../../services/services.js";

dotenv.config();

// const users = [
//   {
//     id: "1",
//     userName: "chuong",
//     password: "1234",
//     info: {
//       FullName: "chuong tran",
//       Address1: "add",
//       Address2: "",
//       city: "Houston",
//       State: "Texas",
//       Zipcode: "77204",
//     },
//   },
//   {
//     id: "2",
//     userName: "chuong2",
//     password: "1234",
//     info: {
//       FullName: "chuong tran2",
//       Address1: "add2",
//       Address2: "",
//       city: "Houston2",
//       State: "Texas2",
//       Zipcode: "772042",
//     },
//   },
// ];

export const signUp = async (req, res) => {
  try{const user = req.body;

    var userName = user.userName;
    var password = user.password;
    var confirmedPassword = user.confirmedPassword;
    var newUserId = uuid();
    const salt = await bcrypt.genSalt(10);
    var encryptedPassword = await bcrypt.hash(password, salt);
    const [all_users] = await pool.query(`(
    SELECT * FROM mydb.users

      )`);
      
    if (user.password !== user.confirmedPassword) {
      return res.status(400).json({
        error: "Confirmed password does not match",
      });
    }
  
    if (all_users.find((user) => user.username === userName)) {
      return res.status(409).json({
        error: "Username already exists!",
      });
    }
  
    if (
      !userName ||
      !password ||
      !confirmedPassword ||
      userName.length === 0 ||
      password.length === 0 ||
      confirmedPassword.length === 0
    ) {
      return res.status(400).json({
        error: "Username or Password is invalid!",
      });
    }
  
     
    
    await pool.query(`
    INSERT INTO mydb.users (
      User_id,
      username,
      password,
        info_id,
        active
    ) SELECT
      ?,
      ?,
      ?,
       COUNT(*)+1,
      1
      FROM mydb.users 

      `,[newUserId,userName,encryptedPassword]);
      await pool.query(`
      INSERT INTO mydb.information (
        Information_id,
        Fullname,
        address1,
        address2,
        city,
        state,
        zipcode,
        User_id        
      ) SELECT COUNT(*)+1,      
      "",
      "",
      "",
      "",
      "",
      "",   
        ? 
        FROM mydb.information       
  
        `,[newUserId]);

      //   await pool.query(`
      //   INSERT INTO mydb.orders ( 
      //     Order_id,         
      //     userId        
      //   ) SELECT COUNT(*)+1,                  
      //     ?        
      //     FROM mydb.orders
      //     `,[newUserId]);
      const jsonUser = { id: newUserId };
      const accessToken = generateAccessToken(jsonUser);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);

      
      return res.status(200).json({        
      accessToken: accessToken,
      refreshToken: refreshToken,
      success: "Successfully signing up",
      
    });}
    catch(error) {
      return res.status(400).json({
        error: error,
      });
    }
  

  

  

  

  // const newUser = {
  //   id: newUserId,
  //   userName: userName,
  //   password: encryptedPassword,
  //   active: 1,
  //   info: {
  //     FullName: "",
  //     Address1: "",
  //     Address2: "",
  //     city: "",
  //     State: "",
  //     Zipcode: "",
  //   },
  //   orders: [
  //  ],
  // };

  // users.push(newUser);
  // await createUser(newUserId, userName, encryptedPassword);

  

};

export const getPost = async (req, res) =>{
  
    // var Userfind = users.filter((user) => user.id == req.user.id)[0];
    const [all_users] = await pool.query(`(
      SELECT * FROM mydb.users
  
        )`);
    try {
      // const body = req.body;
      var findUser = all_users.filter((user) => user.User_id == req.user.id)[0];
    // const id = req.params.id;

    
    if (!findUser) {
      return res.status(400).json({
        error: "Can't find user.",
      });
    }
    const [userinfo] = await pool.query(`
    SELECT * from mydb.information
    
    `);
    var findinfo = userinfo.filter((user) => user.user_id == req.user.id)[0];

    return res.status(200).json(findinfo);
  } catch (err) {
    return res.status(401).json({
      error: `${err} from post`,
    });
  }
}

export const signIn = async (req, res) => {
  const data = req.body;

  var userName = data.userName;
  var password = data.password;
  const [all_users] = await pool.query(`(
    SELECT * FROM mydb.users

      )`);
  if (
    !userName ||
    !password ||
    userName.length === 0 ||
    password.length === 0
  ) {
    return res.status(400).json({
      error: "Username or Password is invalid!",
    });
  }

  const findUser = all_users.find((user) => user.username === userName);

  if (findUser == null) {
    return res.status(400).json({
      error: "User doesn't exist!",
    });
  }

  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword) {
    return res.status(400).json({
      error: "Username or Password is incorrect!",
    });
  }

  return res.status(200).json({
    id: findUser.id,
    success: "Successfully signing in",
  });
};

let refreshTokens = [];

export const authsignIn = async (req, res) => {
  // Authenticate User
  const data = req.body;

  var userName = data.userName;
  var password = data.password;
  const [all_users] = await pool.query(`(
    SELECT * FROM mydb.users

      )`);
  if (
    !userName ||
    !password ||
    userName.length === 0 ||
    password.length === 0
  ) {
    return res.status(400).json({
      error: "Username or Password is invalid!",
    });
  }

  const findUser = all_users.find((user) => user.username === userName);

  if (findUser == null || findUser.active == 0) {
    return res.status(400).json({
      error: "User doesn't exist!",
    });
  }

  const comparePassword = await bcrypt.compare(password, findUser.password);

  if (!comparePassword) {
    return res.status(400).json({
      error: "Username or Password is incorrect!",
    });
  }

  const id = findUser.User_id;
  const user = { id: id };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  return res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    success: "Successfully signing in",
  });
};

export function getToken(req, res) {
  const refreshToken = req.body.token;
  if (refreshToken == null) res.sendStatus(401);

  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    const accessToken = generateAccessToken({ id: user.id });

    res.json({
      accessToken: accessToken,
    });
  });
}

export function Logout(req, res) {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  // return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '300s'});
}

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

export const passwordChange = async (req, res) => {
  // const body = req.body;

  // const password = body.password;
  // const userName = body.userName;
  const [all_users] = await pool.query(`(
    SELECT * FROM mydb.users

      )`);
  try {
    const body = req.body;
    var findUser = all_users.filter((user) => user.User_id == req.user.id)[0];

    const salt = await bcrypt.genSalt(10);
    var encryptedPassword = await bcrypt.hash(body.password, salt);
    // return res.status(400).json(all_users)
    if (!findUser) {
      
      return res.status(400).json({
        error: "User doesn't exist!",
        
      });
    }
    
    findUser.password = encryptedPassword;
    const [updatepass] = await pool.query(`
    UPDATE mydb.users SET password = '${findUser.password}' WHERE User_id = '${findUser.User_id}'
    `);
    return res.status(200).json({
      success: "Successfully save info.",
      // findUser
      findUser,
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

export const UserInfoChange = async (req, res) => {
  //   const id = req.params.id;
  const [all_users] = await pool.query(`
    SELECT * FROM mydb.information
    

      `);
      
  try {
    const body = req.body;
    var findUser = all_users.filter((user) => user.user_id == req.user.id)[0];
   
    if (!findUser) {
      // const [add_info] = await pool.query(`
      // insert into mydb.information (information_id,Fullname,address1,address2,city,state,zipcode,user_id) SELECT
      // COUNT (*)+1,
      //  '${body.Fullname}', 
      //   '${body.address1}', 
      //   '${body.address2}', 
      //   '${body.city}', 
      //   '${body.state}', 
      //   '${body.zipcode}',
      //   '${findUser.User_id}'
      // FROM mydb.information
      
      // `);
      return res.status(400).json({
        error:"user doesn't exits"
      });
    }

    if (
      body.Fullname.length > 50 ||
      body.address1.length > 100 ||
      body.address2.length > 100 ||
      body.city.length > 100 ||
      body.zipcode.length > 9 ||
      body.zipcode.length < 5
    ) {
      return res.status(400).json({
        error: "Invalid input",
      });
    }

    const [update_info] = await pool.query(`
    UPDATE mydb.information SET    
    Fullname ='${body.Fullname}' , 
    address1 ='${body.address1}' , 
    address2 ='${body.address2}' , 
    city = '${body.city}' , 
    state= '${body.state}' , 
    zipcode = '${body.zipcode}'
    
    WHERE User_id = '${req.user.id}'
    
    `);
`
  
    `
    // WHERE User_id = '${findUser.User_id}'
    // findUser.FullName = body.FullName;
    // findUser.Address1 = body.Address1;
    // findUser.Address2 = body.Address2;
    // findUser.city = body.city;
    // findUser.State = body.State;
    // findUser.Zipcode = body.Zipcode;

    return res.status(200).json({
      success: "Successfully save info.",
      // findUser
      // findUser
    });
  } catch (err) {
    return res.status(400).json({
      error: `${err} what error`,
    });
  }
};


export const Userpostfuel = async (req, res) => {
  //   const id = req.params.id;
  const [all_users] = await pool.query(`(
    SELECT * FROM mydb.users
      )`);
  try {
    const body = req.body;
    // var findUser = all_users.filter((user) => user.User_id == req.user.id)[0];

    // if (!findUser) {
    //   return res.status(400).json({
    //     error: "User doesn't exist!",
    //   });
    // }

        await pool.query(`
        INSERT INTO mydb.orders ( 
          Order_id,         
          userId,
          gallon,
          address,
          date,
          suggestPrice,
          totalCost
                
        ) SELECT COUNT(*)+1,                  
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
                  
          FROM mydb.orders
          `,[req.user.id,body.Gallons,body.DeliveryAddress,body.date,body.Sugguestprice,body.TotalAmount]);
    // var orders = findUser.orders;
    // orders.push({
    //   Gallons : body.Gallons,
    // DeliveryAddress : body.DeliveryAddress,
    // date : body.date,
    // Sugguestprice : body.Sugguestprice,
    // TotalAmount : body.TotalAmount,
    // })


    return res.status(200).json({
      success: "Successfully save info.",
      // findUser
      // findUser
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
};

export const getUsers = async (req, res) => {
  const [all_users] = await pool.query(`(
    SELECT * FROM mydb.users
      )`);
  
  res.status(200).json(all_users);
};

export async function getUsersorder(req, res) {
  const [users_order] = await pool.query(`(
    SELECT * FROM mydb.orders
      )`);
  try {
    var Userfind = users_order.filter((user) => user.userId == req.user.id);

    if (!Userfind) {
      return res.status(400).json({
        error: "Can't find user.",
      });
    }

    return res.status(200).json(Userfind);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
}


export const getFuelInfo = async (req, res) => {
  // const data = req.body;
  // var username = data.username;

  const body = req.body;
  var gallonsRequested = body.gallonsRequested;
  // var selectedAddress = data.selectedAddress;
  var selectedDate = body.selectedDate;

  if (!gallonsRequested) {
    return res.status(400).json({
      error: "Gallons Requested is Invalid!",
    });
  }

  // if (!selectedAddress) {
  //   return res.status(400).json({
  //     error: "Selected Address is Invalid!",
  //   });
  // }

  if (!selectedDate) {
    return res.status(400).json({
      error: "Selected Date is Invalid!",
    });
  }

  var findUser = users.filter((user) => user.id == req.user.id)[0];

  if (!findUser) {
    res.status(400).json({
      error: "Can't find user!",
    });
  }

  var orders = findUser.orders;

  orders.push({
    id: 1,
    name: "Regular",
    volumn: gallonsRequested,
    date: selectedDate,
  });

  //var suggestedPrice = data.suggestedPrice;
  //var totalAmountDue = data.totalAmountDue;

  

  //data.suggestedPrice = data.calculation1();
  //data.totalAmountDue = data.calculation2();

  return res.status(200).json({
    success: "$400",
  });
};

export const getUserinfo = (req, res) => {
  try {
    var userName = req.params.userName;
    var user = users.find((c) => c.userName == userName);

    if (user == null) {
      res.status(400).json({
        error: "userName is invalid.",
      });
    }

    res.status(200).json(user.info);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const getUserNameById = (req, res) => {
  try {
    const id = req.params.id;

    if (id) {
      var Userfind = users.find((user) => user.id == id);

      if (!Userfind) {
        res.status(400).json({
          error: "Can't find user.",
        });
      }

      res.status(200).json(Userfind.info);
    }
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

import express from "express";
import bcrypt from "bcrypt";
import { uuid } from "uuidv4";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import users from "../data/users.js"

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
  const user = req.body;

  var userName = user.userName;
  var password = user.password;
  var confirmedPassword = user.confirmedPassword;

  if (user.password !== user.confirmedPassword) {
    return res.status(400).json({
      error: "Confirmed password does not match",
    });
  }

  if (users.find((user) => user.userName === userName)) {
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

  const salt = await bcrypt.genSalt(10);
  var encryptedPassword = await bcrypt.hash(password, salt);

  var newUserId = uuid();
  
  const newUser = {
    id: newUserId,
    userName: userName,
    password: encryptedPassword,
    active: 1,
    info: {
      FullName: "",
      Address1: "",
      Address2: "",
      city: "",
      State: "",
      Zipcode: "",
    },
    orders: [

    ]
  };

  users.push(newUser);

  const jsonUser = { id: newUser.id };

  const accessToken = generateAccessToken(jsonUser);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  refreshTokens.push(refreshToken);

  return res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
    success: "Successfully signing up",
  });
};

export function getPost(req, res) {
  try {
    var Userfind = users.filter((user) => user.id == req.user.id)[0];

    if (!Userfind) {
      return res.status(400).json({
        error: "Can't find user.",
      });
    }

    return res.status(200).json(Userfind.info);
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }
}

export const signIn = async (req, res) => {
  const data = req.body;

  var userName = data.userName;
  var password = data.password;

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

  const findUser = users.find((user) => user.userName === userName);

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

  const findUser = users.find((user) => user.userName === userName);

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

  const id = findUser.id;
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

  try {
    const body = req.body;
    var findUser = users.filter((user) => user.id == req.user.id)[0];
    const salt = await bcrypt.genSalt(10);
    var encryptedPassword = await bcrypt.hash(body.password, salt);
    if (!findUser) {
      return res.status(400).json({
        error: "User doesn't exist!",
      });
    }
    findUser.password = encryptedPassword;
    return res.status(200).json({
      // success: "Successfully save info.",
      // findUser
      findUser

  });
} catch (err) {
  return res.status(400).json({
    error: err,
  });
}

};


export const UserInfoChange = async (req, res) => {
  
//   const id = req.params.id;
  try {
    const body = req.body;
    var findUser = users.filter((user) => user.id == req.user.id)[0];

    if (!findUser) {
      return res.status(400).json({
        error: "User doesn't exist!",
      });
    }

    findUser.info.FullName = body.FullName;
    findUser.info.Address1 = body.Address1;
    findUser.info.Address2 = body.Address2;
    findUser.info.city = body.city;
    findUser.info.State = body.State;
    findUser.info.Zipcode = body.Zipcode;

    return res.status(200).json({
        // success: "Successfully save info.",
        // findUser
        findUser

    });
  } catch (err) {
    return res.status(400).json({
      error: err,
    });
  }

};

export const getUsers = (req, res) => {
  res.status(200).json(users);
};

















export const getFuelInfo = async (req, res) => {
    
  const data = req.body;
  var username = data.username;

  var gallonsRequested = data.gallonsRequested;
  var selectedAddress = data.selectedAddress;
  var selectedDate = data.selectedDate;
  //var suggestedPrice = data.suggestedPrice;
  //var totalAmountDue = data.totalAmountDue;

   if (
     !gallonsRequested 
   ) {
     return res.status(400).json({
       error: "Gallons Requested is Invalid!",
     });
   }

  if (
      !selectedAddress 
    ) {
      return res.status(400).json({
        error: "Selected Address is Invalid!",
      });
    }

  if (
      !selectedDate 
    ) {
      return res.status(400).json({
        error: "Selected Date is Invalid!",
      });
    }

    //data.suggestedPrice = data.calculation1();
    //data.totalAmountDue = data.calculation2();

  return res.status(200).json({
    success: "success"
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



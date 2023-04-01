import bcrypt from "bcrypt";
import users from "../data/users.js";
import pool from "../../services/services.js";

export const getClients = async (req, res) => {
  try {
    const [rows] = await pool.query(`
    SELECT u.User_id, username, password, active, Fullname, address1, address2, city, state, zipcode
    FROM mydb.users u
    JOIN
    mydb.information i
    ON u.user_id = i.user_id
    WHERE active = 1
    `);
    
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const getClient = async (req, res) => {
  try {
    const id = req.params.id;

    const [rows] = await pool.query(`
    SELECT u.User_id, username, password, active, Fullname, address1, address2, city, state, zipcode
    FROM mydb.users u
    JOIN
    mydb.information i
    ON u.user_id = i.user_id
    WHERE u.User_id = '${id}'
    `);

    if (rows != null) {
      res.status(200).json(rows[0]);
    } else {
      res.status(400).json({
        error: "Something wrong happened. Please try again.",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: "Id is invalid",
    });
  }
};

export const getAdmins = async (req, res) => {
  const [rows] = await pool.query(`
  SELECT username, password
  FROM admins
  `);

  return res.status(200).json(rows);
};

export const deactivateClient = async (req, res) => {
  var id = req.params.id;

  const [rows] = await pool.query(`
  UPDATE mydb.users SET active = 0 WHERE User_id = '${id}'
  `);

  if (rows.affectedRows == 0) {
    return res.status(400).json({
      error: "Something wrong happened. Please try again!",
    });
  }

  return res.status(200).json({
    success: "Successfully deactivate a client.",
  });
};

export const getClientOrder = async (req, res) => {
  var id = req.params.id;
  const [users] = await pool.query(`(
    SELECT * FROM mydb.orders
    WHERE userId = '${id}'
      )`);
  // var [client] = users.find((user) => user.userId == id);

  if (users == null) {
    res.status(400).json({
      error: "ID is invalid.",
    });
  } else {
    res.status(200).json(users);
  }
};

export const modifyClientInfo = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;

    // var clientToBeUpdated = users.find((user) => user.id == id);

    // if (clientToBeUpdated == null) {
    //   return res.status(400).json({
    //     error: "Something wrong happened. Please try again!",
    //   });
    // }

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

    const [rows] = await pool.query(`
    UPDATE mydb.information 
    SET Fullname = "${body.Fullname}", 
    address1 = "${body.address1}", 
    address2 = "${body.address2}", 
    city = "${body.city}", 
    state = "${body.state}", 
    zipcode = "${body.zipcode}" 
    WHERE User_id = '${id}'
    `);

    // clientToBeUpdated.info.FullName = body.FullName;
    // clientToBeUpdated.info.Address1 = body.Address1;
    // clientToBeUpdated.info.Address2 = body.Address2;
    // clientToBeUpdated.info.city = body.city;
    // clientToBeUpdated.info.State = body.State;
    // clientToBeUpdated.info.Zipcode = body.Zipcode;

    if (rows.affectedRows > 0) {
      return res.status(200).json({
        success: `Successfully changed client ${id} personal information.`,
      });
    }
    else {
      return res.status(400).json({
        error: "Something wrong happened. Please try again."
      })
    }
    
  } catch (error) {
    res.status(400).json({
      error: `${error},something wrong`,
    });
  }
};

export const signUp = async (req, res) => {
  const body = req.body;

  var userName = body.userName;
  var password = body.password;
  var confirmedPassword = body.confirmedPassword;

  if (password !== confirmedPassword) {
    return res.status(400).json({
      error: "Confirmed Password does not match",
    });
  }

  if (admins.find((admin) => admin.userName === userName)) {
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

  const newAdmin = {
    userName: userName,
    password: encryptedPassword,
  };

  admins.push({ ...newAdmin });

  res.status(200).json({
    success: "Successfully signing up!",
  });
};

export const signIn = async (req, res) => {
  const data = req.body;

  var userName = data.userName;
  var password = data.password;

  const [all_users] = await pool.query(`(
    SELECT * FROM mydb.admins

      )`);
  const findAdmin = all_users.find((user) => user.username === userName);
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

  // const findAdmin = admins.find((admin) => admin.userName === userName);

  if (findAdmin == null) {
    return res.status(400).json({
      error: "Username doesn't exist!",
    });
  }

  if (findAdmin.password != password) {
    res.status(400).json({
      error: "Password is incorrect.",
    });
  }

  req.session.user = {
    username: findAdmin.username,
    role: "ADMIN",
  };

  return res.status(200).json({
    success: "Successfully signing in",
  });
};

export const passwordChange = async (req, res) => {
  const body = req.body;

  const password = body.password;
  const userName = body.userName;

  const findAdmin = admins.find((admin) => admin.userName === userName);

  if (findAdmin == null) {
    return res.status(400).json({
      error: "User doesn't exist!",
    });
  }

  const salt = await bcrypt.genSalt(10);
  var encryptedPassword = await bcrypt.hash(password, salt);

  findAdmin.password = encryptedPassword;

  return res.status(200).json({
    success: "Successfully changed password.",
  });
};

import bcrypt from "bcrypt";
import users from "../data/users.js";


const admins = [
  {
    userName: "chuongadmin",
    password: "1234",
  },
  {
    userName: "chuongadmin2",
    password: "1234",
  },
];

export const getClients = (req, res) => {
  try {
    var toBeShow = [];
    for (var object of users) {
      let { orders, ...toBePushed } = object;
      toBeShow.push(toBePushed);
    }

    const result = toBeShow.filter(user => user.active == 1);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};

export const getClient = (req, res) => {
  try {
    const id = req.params.id;

    const clientInfo = users.find((user) => user.id == id).info;

    if (clientInfo != null) {
      res.status(200).json(clientInfo);
    }
    else {
      res.status(400).json({
        error: "Something wrong happened. Please try again."
      })
    }

    
  } catch (error) {
    res.status(400).json({
      error: "Id is invalid",
    });
  }
};

export const deactivateClient = (req, res) => {
  var id = req.params.id;

  var clientToBeUpdated = users.find((user) => user.id == id);

  if (clientToBeUpdated == null) {
    return res.status(400).json({
      error: "Something wrong happened. Please try again!",
    });
  }

  clientToBeUpdated.active = 0;

  return res.status(200).json({
    success: "Successfully deactivate a client.",
  });
};

export const getClientOrder = async (req, res) => {
    var id = req.params.id;
    var client = users.find((user) => user.id == id);

    if (client == null) {
      res.status(400).json({
        error: "ID is invalid.",
      });
    }
    else{
      res.status(200).json(client.orders);
    }
};

export const modifyClientInfo = async (req, res) => {
  try {
    const body = req.body;
    const id = req.params.id;

    var clientToBeUpdated = users.find((user) => user.id == id);

    if (clientToBeUpdated == null) {
      return res.status(400).json({
        error: "Something wrong happened. Please try again!",
      });
    }

    if (body.FullName.length > 50 || body.Address1.length > 100
      || body.Address2.length > 100 || body.city.length > 100
      || body.Zipcode.length > 9
      || body.Zipcode.length < 5 ) {
       return res.status(400).json({
         error: "Invalid input",
       });
      }

    clientToBeUpdated.info.FullName = body.FullName;
    clientToBeUpdated.info.Address1 = body.Address1;
    clientToBeUpdated.info.Address2 = body.Address2;
    clientToBeUpdated.info.city = body.city;
    clientToBeUpdated.info.State = body.State;
    clientToBeUpdated.info.Zipcode = body.Zipcode;

    return res.status(200).json({
      success: `Successfully changed client ${id} Info.`,
    });
  } catch (error) {
    res.status(400).json({
      error: error,
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

  const findAdmin = admins.find((admin) => admin.userName === userName);

  if (findAdmin == null) {
    return res.status(400).json({
      error: "Username doesn't exist!",
    });
  }

  if (findAdmin.password != password) {
      res.status(400).json({
          error: "Password is incorrect."
      })
  }

  req.session.user = {
    username: findAdmin.userName,
    role: "ADMIN"
  }

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

export const getAdmins = (req, res) => {
  return res.status(200).json(admins);
};

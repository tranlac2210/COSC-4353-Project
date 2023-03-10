import express from "express"
import bcrypt from "bcrypt"

const users = [
    {
        "userName": "chuong",
        "password": "1234",
    },
    {
        "userName": "chuong2",
        "password": "1234",
    }
]

export const signUp = async (req, res) => {
    const user = req.body;

    var userName = user.userName;
    var password = user.password;
    var confirmedPassword = user.confirmedPassword;

    if (user.password !== user.confirmedPassword) {
        res.status(400).json({
            error: "Confirmed Password does not match"
        })
    }

    if (users.find((user) => user.userName === userName)) {
        res.status(400).json({
            error: "Username already exists!"
        })
    }

    if (!userName ||
        !password ||
        !confirmedPassword ||
        userName.length === 0 ||
        password.length === 0 ||
        confirmedPassword.length === 0) {
            return res.status(400).json({
                error: "Username or Password is invalid!"
            });
    }

    const salt = await bcrypt.genSalt(10);
    var encryptedPassword = await bcrypt.hash(password, salt);

    const newUser = {
        userName: userName,
        password: encryptedPassword
    }

    users.push({...newUser});

    res.status(200).json({
        success: "Successfully signing up!"
    })
}

export const signIn = async (req, res) => {
    const data = req.body;

    var userName = data.userName;
    var password = data.password;

    if (!userName ||
        !password ||
        userName.length === 0 ||
        password.length === 0) {
            return res.status(400).json({
                error: "Username or Password is invalid!"
            });
    }

    const findUser = users.find((user) => user.userName === userName);

    if (findUser == null) {
        return res.status(400).json({
            error: "User doesn't exist!"
        })
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) {
        return res.status(400).json({
            error: "Username or Password is incorrect!"
        })
    }

    return res.status(200).json({
        success: "Successfully signing in"
    });

}

export const passwordChange = async (req, res) => {
    const body = req.body;

    const password = body.password;
    const userName = body.userName;

    if (!password ||
        !userName ||
        password.length === 0 ||
        userName.length === 0) {
            return res.status(400).json({
                error: "Username or Password is invalid!"
            });
    }

    const findUser = users.find((user) => user.userName === userName);

    if (findUser == null) {
        return res.status(400).json({
            error: "User doesn't exist!"
        })
    }

    const salt = await bcrypt.genSalt(10);
    var encryptedPassword = await bcrypt.hash(password, salt);

    findUser.password = encryptedPassword;

    return res.status(200).json({
        success: "Successfully changed password."
    })
}



export const getUsers = (req, res) => {
    res.status(200).json(users);
}

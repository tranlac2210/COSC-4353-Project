import express from "express"

const users = [
    {
        "userName": "chuong",
        "password": 1234,
    },
    {
        "userName": "chuong2",
        "password": 1234,
    }
]

export const signUp = (req, res) => {
    const user = req.body;

    var userName = user.userName;
    var password = user.password;
    var confirmedPassword = user.confirmedPassword;

    if (user.password !== user.confirmedPassword) {
        res.status(400).json({
            error: "Confirmed Password does not match"
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

    const newUser = {
        userName,
        password
    }

    users.push({...newUser});

    res.status(200).json({
        success: "Successfully signing up!"
    })
}

export const signIn = (req, res) => {
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

    const userToBeSignIn = users.find((user) => user.userName == userName && user.password == password);
    
    if (userToBeSignIn == null) {
        return res.status(400).json({
            error: "Username or Password is incorrect!"
        })
    }



    return res.status(200).json({
        data,
        success: "Successfully signing in"
    });
}

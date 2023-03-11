import express from "express"
import bcrypt from "bcrypt"
import { uuid } from "uuidv4"

const users = [
    {
        "id": "1",
        "userName": "chuong",
        "password": "1234",
        "info":
            {
                'FullName':"chuong tran",
                "Address1":"add",
                "Address2":"",
                "city":"Houston",
                "State":"Texas",
                "Zipcode":"77204"
            }
    },
    {
        "id": "2",
        "userName": "chuong2",
        "password": "1234",
        "info":
            {
                'FullName':"chuong tran2",
                "Address1":"add2",
                "Address2":"",
                "city":"Houston2",
                "State":"Texas2", 
                "Zipcode":"772042"
            } 
    }
]

export const signUp = async (req, res) => {
    const user = req.body;

    var userName = user.userName;
    var password = user.password;
    var confirmedPassword = user.confirmedPassword;

    if (user.password !== user.confirmedPassword) {
        return res.status(400).json({
            error: "Confirmed password does not match"
        })
    }

    if (users.find((user) => user.userName === userName)) {
        return res.status(400).json({
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
        password: encryptedPassword,
        info:{
            FullName:'',
            Address1:'',
            Address2:'',
            city:'',
            State:'',
            Zipcode:'',
        }
    }

    var newUserId = uuid();

    users.push({id: newUserId, ...newUser});

    res.status(200).json({
        id: newUserId, 
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
        id: findUser.id,
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

export const UserInfoChange = async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    // const userName = body.userName;
    // const FullName = body.FullName;
    // const Address1 = body.Address1;
    // const Address2 = body.Address2;
    // const city = body.city;
    // const State = body.State;
    // const zipcode = body.Zipcode;
    
    // if (!FullName||
    //     !userName ||
    //     FullName.length === 0||
    //     userName.length === 0) {
    //         return res.status(400).json({
    //             error: "Username or FullName is invalid!"
    //         });
    // }

    if (!id) {
        return res.status(400).json({
            error: "Username or FullName is invalid!"
        });
    }
   
    const findUser = users.find((user) => user.id == id,{new: true});

    if (findUser == null) {
        return res.status(400).json({
            error: "User doesn't exist!"
        })
    }   

    findUser.info.FullName = body.FullName;
    findUser.info.Address1 = body.Address1;
    findUser.info.Address2 = body.Address2;
    findUser.info.city = body.city;
    findUser.info.State = body.State;
    findUser.info.Zipcode = body.Zipcode;

    return res.status(200).json({
        success: "Successfully save info."
    })
}


export const getUsers = (req, res) => {
    res.status(200).json(users);
    
}

export const getUserinfo = (req, res) => {   
    
    try {
        var userName = req.params.userName;
        var user = users.find(c => c.userName == userName);

        if (user == null) {
            res.status(400).json({
                error: "userName is invalid."
            })
        }
        
        res.status(200).json(user.info);
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

export const getUserNameById = (req, res) => {
    try {
        const id = req.params.id;

        if (id) {
            var Userfind = users.find((user) => user.id == id);

            if (!Userfind) {
                res.status(400).json({
                    error: "Can't find user."
                })
            }

            res.status(200).json(Userfind.info)

        }
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}



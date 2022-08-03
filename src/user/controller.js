const User = require('./model');
const jwt = require('jsonwebtoken')

exports.createUser = async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        const token = await jwt.sign({_id:newUser._id}, process.env.SECRET)
        res.send({msg: `new user created: ${newUser.uName}.`, Token: token});
    } catch (error) {
        console.log(error)
        res.send({msg: `Error at CreateUser: ${error}`})
    };
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({uName: req.body.uName});
        const token = await jwt.sign({_id:user._id}, process.env.SECRET)
        console.log(`User login request: ${user}`)
        res.send({msg: `You have logged in successfully. Welcome, ${user.uName}.`, token: token})
    } catch (error) {
        console.log(error);
        res.send({err: error});
    };
};

exports.userList = async (req, res) => {
    try {
        const userList = await User.find({});
        const uNameList = userList.map((user) => user.uName);
        res.send({AllUsers: uNameList});
    } catch (error) {
        res.send(`Error at userList: ${error}`);
    };
};

exports.updateEmail = async (req, res) => {
    try {
        await User.updateOne({uName: req.user.uName}, {email: req.body.newEmail} )
        res.send(`User ${req.user.uName} email updated.`)
    } catch (error) {
        console.log(error);
        res.send(`At updatePass: ${error}`);
    };
};

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({uName: req.user.uName})
        res.send(`Delete successful: ${req.user.uName}`)
    } catch (error) {
        console.log(error)
        res.send(`Error at deleteUser: ${error}`)
    }
}
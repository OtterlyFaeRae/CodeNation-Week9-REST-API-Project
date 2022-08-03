const User = require('./model');

exports.createUser = async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        console.log(newUser);
        res.send({msg: 'This came from createUser.'});
    } catch (error) {
        console.log(error)
        res.send({msg: `Error at CreateUser: ${error}`})
    };
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({uName: req.body.uName});
        console.log(`User login request: ${user}`)
        res.send({msg: `You have logged in successfully. Welcome, ${user.uName}`})
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

exports.updatePass = async (req, res) => {
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
const bcrypt = require('bcryptjs');
const User = require('../user/model');

exports.hashPass = async(req, res, next) => {
    try {
        // const pass = req.body.password; //grab value
        // const hashedPass = await bcrypt.hash(pass, 8); //hash value
        // req.body.password = hashedPass; //re-store value
        req.body.pass = await bcrypt.hash(req.body.pass, 8); //Does all of the above at once.
        next();
    } catch (error) {
        console.log(error)
        res.send({ err: `Error at hashPass: ${error} `})
    };
};

exports.checkPass = async(req, res, next) => {
    try {
        req.user = await User.findOne({uName : req.body.uName});
        console.log(`User login attempt: ${req.user.uName}`);
        console.log(await bcrypt.compare(req.body.pass, req.user.pass));
        if(req.user && await bcrypt.compare(req.body.pass, req.user.pass)===true) {
            next();
        } else {
            throw new Error({msg: 'Incorrect credentials'});
        };
    } catch (error) {
        console.log(error);
        res.send({err: error});
    };
};
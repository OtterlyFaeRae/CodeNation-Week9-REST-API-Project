const { Router } = require('express');
const userRouter = Router();
const { createUser, login, userList, updatePass, deleteUser } = require('./controller');
const { hashPass, checkPass } = require('../middleware')

userRouter.post("/user", hashPass, createUser);
userRouter.post("/login", checkPass, login);
userRouter.get("/user", userList);
userRouter.patch('/user', checkPass, updatePass);
userRouter.delete('/user', checkPass, deleteUser)

module.exports = { userRouter };
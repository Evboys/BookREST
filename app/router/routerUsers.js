const express = require("express");
const routerUsers = express.Router();
const controllerUsers = require("../controllers/controllerUsers.js");
const auth = require("../middlewares/auth.js")
const admin = require("../middlewares/admin.js")

routerUsers.post('/utilisateurs/login', controllerUsers.user)
routerUsers.delete('/utilisateurs/:username',auth,admin,controllerUsers.deleteUser)
routerUsers.put('/utilisateurs/:username',auth,admin,controllerUsers.updateUser)
routerUsers.post('/utilisateurs/register', controllerUsers.addUser)

module.exports = { routerUsers };
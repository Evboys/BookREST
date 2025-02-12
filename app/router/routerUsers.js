const express = require("express");
const routerUsers = express.Router();
const controllerUsers = require("../controllers/controllerUsers.js");
const auth = require("../middlewares/auth.js")

routerUsers.post('/utilisateurs/login', controllerUsers.user)
routerUsers.delete('/utilisateurs/:id',auth(req,res),controllerUsers.deleteUser)
// routerUsers.put('/utilisateurs/:id',controllerUsers.updateUser)
routerUsers.post('/utilisateurs/register', controllerUsers.addUser)

module.exports = { routerUsers };
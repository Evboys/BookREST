const express = require("express");
const routerUsers = express.Router();

const controllerUsers = require("../controllers/controllerUsers.js");


routerUsers.get(`/utilisateurs/:id`,controllerUsers.user)
routerUsers.delete('/utilisateurs/:id',controllerUsers.deleteUser)
routerUsers.put('/utilisateurs/:id',controllerUsers.updateUser)
routerUsers.post('/utilisateurs', controllerUsers.addUser)



module.exports = { routerUsers };
const express = require("express");
const routerBooks = express.Router();
const auth = require('../middlewares/auth.js')
const admin = require('../middlewares/admin.js')

const controllerBooks = require("../controllers/controllerBooks.js");

routerBooks.get("/livres",controllerBooks.liste)
routerBooks.get(`/livres/:isbn`,controllerBooks.livre)
routerBooks.delete('/livres/:isbn',auth,admin,controllerBooks.deleteLivre)
routerBooks.put('/livres/:isbn',auth,admin,controllerBooks.updateLivre)
routerBooks.post('/livres',auth, controllerBooks.addLivre)



module.exports = { routerBooks };
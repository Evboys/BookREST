const express = require("express");
const routerBooks = express.Router();
const auth = require('../middlewares/auth.js')

const controllerBooks = require("../controllers/controllerBooks.js");

routerBooks.get("/livres",controllerBooks.liste)
routerBooks.get(`/livres/:id`,auth,controllerBooks.livre)
routerBooks.delete('/livres/:id',controllerBooks.deleteLivre)
routerBooks.put('/livres/:id',controllerBooks.updateLivre)
routerBooks.post('/livres', controllerBooks.addLivre)



module.exports = { routerBooks };
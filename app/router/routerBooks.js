
const express = require("express");
const routerBooks = express.Router();

const controllerBooks =
    require("../controllers/controllerBooks.js");


module.exports = { routerBooks };
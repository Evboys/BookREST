const express = require("express");
const app = express();
app.use(express.json())

const { routerBooks } = require("./app/router/routerBooks");
const { routerUser } =require("./app/router/routerUsers")
app.use(routerBooks);
app.use(routerUser)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`le serveur REST est lancé sur le port : ${PORT}`);
});
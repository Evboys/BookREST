// -- utilisation du serveur web Express
const express = require("express");
const app = express();
app.use(express.json())
// -- connexion à la BD si besoin
// -- utilisation du router pour la gestion de sportifs
const { routerBooks } = require("./app/router/routerBooks");
app.use(routerBooks);
// -- lancer le serveur pour qu'il écoute sur le port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
 console.log(`le serveur REST est lancé sur le port : ${PORT}`);
});
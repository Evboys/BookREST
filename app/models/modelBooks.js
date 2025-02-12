require('dotenv').config();
const nano = require('nano');
const couchdbUrl = process.env.COUCHDB_URL;
const nanor = nano(couchdbUrl);
const dbLivres = nanor.db.use('books');

const listeLivre = async () => {
    try {
        const query = {
            "selector": {},
            "fields": ["_id", "auteur", "date_de_sortie", "editeur", "titre"],
        };
        const result = await dbLivres.find(query);
        return result.docs;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des livres");
    }
};


const livre = async (id) => {
    try {
        const result = await dbLivres.get(id);
        return result;
    } catch (error) {
        throw new Error("Livre non trouvé");
    }
};


const deleteLivre = async (id) => {
    try {
        const livre = await dbLivres.get(id);
        return await dbLivres.destroy(id, livre._rev);
    } catch (error) {
        throw new Error("Impossible de supprimer le livre (ID invalide ?)");
    }
};


const updateLivre = async (id, newData) => {
    try {
        const livre = await dbLivres.get(id);
        const updatedLivre = { ...livre, ...newData, _rev: livre._rev };        
        delete updatedLivre._id;
        return await dbLivres.insert(updatedLivre);
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour du livre");
    }
};


const addLivre = async (newData) => {
    try {
        return await dbLivres.insert(newData);
    } catch (error) {
        throw new Error("Erreur lors de l'ajout du livre");
    }
};

module.exports = { listeLivre, livre, deleteLivre, updateLivre, addLivre };

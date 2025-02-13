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


const livre = async (isbn) => {
    try {
        const result = await dbLivres.find({ selector: { isbn: isbn } });
        if (result.docs.length === 0) {
            throw new Error("Livre non trouvé");
        }
        return result.docs;  
    } catch (error) {
        throw new Error("Livre non trouvé");
    }
};



const deleteLivre = async (isbn) => {
    try {
        const result = await dbLivres.find({ selector: { isbn: isbn } });
        if (result.docs.length === 0) {
            throw new Error("Livre non trouvé");
        }
        const livre = result.docs;
        return await dbLivres.destroy(livre._id, livre._rev);
    } catch (error) {
        throw new Error("Impossible de supprimer le livre (ISBN invalide ?)");
    }
};



const updateLivre = async (isbn, newData) => {
    try {
        const result = await dbLivres.find({ selector: { isbn: isbn } });
        if (result.docs.length === 0) {
            throw new Error("Livre non trouvé");
        }
        const livre = result.docs;
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

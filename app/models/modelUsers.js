require('dotenv').config()
const bcrypt = require('bcrypt');
const nano = require('nano')
const couchdbUrl = process.env.COUCHDB_URL
const nanor = nano(couchdbUrl);
const dbUsers = nanor.db.use('users');

const user = async (username, password) => {
    try {
        const query = {
            "selector": { "user": username },
            "fields": ["user", "password"],
        };

        const result = await dbUsers.find(query);

        if (result.docs.length === 0) {
            return { success: false, message: "Utilisateur non trouvé" };
        }

        const userData = result.docs[0]; 
        const passwordMatch = await bcrypt.compare(password, userData.password);

        if (!passwordMatch) {
            return { success: false, message: "Mot de passe incorrect" };
        }

        return { success: true, message: "Authentification réussie", user: userData.user };
    } catch (error) {
        return { success: false, message: "Erreur de connexion", error: error.message };
    }
};

const addUser = async (newData) => {
    try{
        newData.password = await bcrypt.hash(newData.password, 10);
        if (newData.admin === undefined) {
            newData.admin = false;
        }
        const result = await dbUsers.insert(newData)
        return result
    }
    catch(error){
        return { success: false, message: "Problème de création", error: error.message };
    }
}
const userExisting = async (username) => {
    const query = {
        "selector": { "user": username },
        "fields": ["_id", "user"],
    }
    const result = await dbUsers.find(query)
    return result.docs.length > 0 ? result.docs[0] : null
}
const deleteUser = async (id) => {
    try {
        const user = await dbUsers.get(id);
        return await dbUsers.destroy(id, user._rev);
    } catch (error) {
        throw new Error("Impossible de supprimer l'utilisateur (ID invalide ?)");
    }
};
module.exports = { user , addUser , userExisting , deleteUser} 
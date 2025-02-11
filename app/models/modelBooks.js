require('dotenv').config()
const nano = require('nano')
const couchdbUrl = process.env.COUCHDB_URL
const nanor = nano(couchdbUrl);
const dbLivres = nanor.db.use('books');

const listeLivre = async () => {
    const query = {
        "selector" : {},
        "fields": ["auteur","date_de_sortie","editeur","titre"],
       }
    return await dbLivres.find(query);
}

const livre = async (id) => {
    return await dbLivres.get(id)
}

const deleteLivre = async (id) => {
    const livre = await dbLivres.get(id)
    const rev = livre._rev
    return await dbLivres.destroy(id,rev)
}
const updateLivre = async (id,newData) => {
    const livre = await dbLivres.get(id)
    const rev = livre._rev

    const livreUpdate = {...livre,...newData,_rev:rev}
    return await dbLivres.insert(livreUpdate)
}
const addLivre = async (newData) => {
    return await dbLivres.insert(newData)
}



module.exports ={listeLivre , livre , deleteLivre , updateLivre , addLivre }
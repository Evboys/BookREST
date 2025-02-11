require('dotenv').config()
const nano = require('nano')
const couchdbUrl = process.env.COUCHDB_URL
const nanor = nano(couchdbUrl);
const dbUsers = nanor.db.use('users');

const livre = async (id) => {
    return await dbUsers.get(id)
}
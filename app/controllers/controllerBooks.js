const modelBooks = require("../models/modelBooks")

const Joi = require('joi')
const schema = Joi.object({
    titre: Joi.string()
        .min(1)
        .required(),
    auteur: Joi.string()
        .min(1)
        .required(),
    editeur: Joi.string()
        .min(1)
        .required(),
    date_de_sortie: Joi.string()
        .pattern(/^\d{4}-\d{2}-\d{2}$/)
        .required(),
    
})


const liste = async (req, res) => {
    try {
        const listeLivre = await modelBooks.listeLivre();
        res.status(200).json({ success: true, data: listeLivre.docs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des livres", error });
    }
};

const livre = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await modelBooks.livre(id)
        if (!result) {
            return res.status(404).json({ success: false, message: "Livre non trouvé" })
        }
        res.status(200).json({ success: true, data: result })
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la récupération du livre", error })
    }
};

const deleteLivre = async (req, res) => {
    try {
        const id = req.params.id;
        await modelBooks.deleteLivre(id)
        res.status(200).json({ success: true, message: "Livre supprimé avec succès" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la suppression", error })
    }
};

const updateLivre = async (req, res) => {
    try {
        const id = req.params.id
        const newData = req.body

        
        const { error } = schema.validate(newData)
        if (error) {
            return res.status(400).json({ success: false, message: "Données invalides", error: error.message })
        }

        const result = await modelBooks.updateLivre(id, newData);
        res.status(200).json({ success: true, message: "Livre mis à jour avec succès", data: result })
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour", error })
    }
};

const addLivre = async (req, res) => {
    try{
        const newData = req.body        
        const { error } = schema.validate(newData)
        if (error) {
            return res.status(400).json({ success: false, message: "Données invalides", error: error.message })
        }

        const result = await modelBooks.addLivre(newData);
        res.status(200).json({ success: true, message: "Livre ajouté avec succès", data: result })
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de l'ajout'", error })
    }
}
module.exports = { liste, livre, deleteLivre, updateLivre, addLivre };
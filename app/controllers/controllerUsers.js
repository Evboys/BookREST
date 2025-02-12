const Joi = require('joi');
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.JWT_SECRET
const modelUsers = require("../models/modelUsers");

const schema = Joi.object({
    user: Joi.string()
        .alphanum()
        .min(1)
        .required(),
    password: Joi.string()
        .min(6)
        .required(),
});

const user = async (req, res) => {
    try {
        const { user, password } = req.body;
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ success: false, message: "Données invalides", error: error.details });
        }

        const resultat = await modelUsers.user(user, password);

        if (!resultat.success) {
            return res.status(401).json({ success: false, message: resultat.message });
        }
        const token = jwt.sign(
            { user: resultat.user, admin: resultat.admin },
            SECRET_KEY,
            { expiresIn: "2h" }
        );
        res.status(200).json({ success: true, message: "Utilisateur connecté", token });

    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur interne", error: error.message });
    }
};

const addUser = async (req, res) => {
    try {
        const newData = req.body;

        const userExisting = await modelUsers.userExisting(newData.user);
        if (userExisting) {
            return res.status(400).json({
                success: false,
                message: "Utilisateur déjà existant",
            });
        }

        const { error } = schema.validate(newData);
        if (error) {
            return res.status(400).json({ success: false, message: "Données invalides", error: error.details });
        }

        const resultat = await modelUsers.addUser(newData);
        if (!resultat || !resultat.ok) {
            return res.status(400).json({ success: false, message: "Erreur lors de la création de l'utilisateur" });
        }

        res.status(201).json({ success: true, message: "Utilisateur créé avec succès" });

    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur interne", error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await modelUsers.deleteUser(id)
        res.status(200).json({ success: true, message: "Utilisateur supprimé avec succès" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur lors de la suppression", error })
    }
}

module.exports = { user, addUser, deleteUser };

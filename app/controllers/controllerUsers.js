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
        const username = req.params.username;
        const user = await modelUsers.userExisting(username);
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
        const resultat = await modelUsers.deleteUser(username);
        if (!resultat || !resultat.ok) {
            return res.status(400).json({ success: false, message: "Erreur lors de la suppression de l'utilisateur" });
        }
        res.status(200).json({ success: true, message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur interne", error: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const username = req.params.username;
        const newData = req.body;
        const user = await modelUsers.userExisting(username);
        if (!user) {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }
        const currentAdminStatus = user.admin;
        if (newData.password) {
            const hashedPassword = await bcrypt.hash(newData.password, saltRounds);
            newData.password = hashedPassword;  
        }
        newData.admin = currentAdminStatus;
        const resultat = await modelUsers.updateUser(username, newData);
        if (!resultat || !resultat.ok) {
            return res.status(400).json({ success: false, message: "Erreur lors de la mise à jour de l'utilisateur" });
        }
        res.status(200).json({ success: true, message: "Utilisateur mis à jour avec succès" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erreur interne", error: error.message });
    }
};

module.exports = { user, addUser, deleteUser, updateUser };

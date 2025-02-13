const admin = (req, res, next) => {
    console.log(req.admin);
    if (req.user && req.user.admin === true) {
        next(); 
    } else {
        return res.status(403).json({ success: false, message: "Accès interdit: Vous devez être administrateur" });
    }
};

module.exports = admin;

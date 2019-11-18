
//Checks if User is admin, must be called after auth
module.exports = function (req, res, next) {
    if (!req.user.isAdmin) return res.status(403).send('Only Admins are allowed to do this operation');

    next();
}

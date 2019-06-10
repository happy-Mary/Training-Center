module.exports = function (roleIds) {
    return function (req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated() &&
            (!roleIds || roleIds.length == 0 || (req.user && roleIds.indexOf(req.user.role_id) > -1))) {
            return next();
        } else {
            // if they aren't redirect them to the home page
            if (req.xhr) {
                res.status(403);
                res.json({error: 'Access Denied.'});
            } else {
                res.redirect('/');
            }
        }
    };
};
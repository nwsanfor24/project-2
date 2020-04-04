//Making the user available in the views
//Conditionally render content depending on if a user is logged in or not
//Could use user object to customize the view

module.exports = function () {
  return function (req, res, next) {
    res.locals.user = req.user;
    next();
  };
};
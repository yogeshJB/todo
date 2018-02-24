var todoRoutes = require('../routes/todo');
module.exports = function(app, passport) {
    app.get('/', function (req, res){
        res.json('Welcome to Node.js Authentication App. Please login/register .');
        // res.json({message: req.flash('loginMessage')});
    });
    app.get('/login', function(req, res){
        res.status(400);
        res.json({message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/profile',
        failureRedirect : '/login',
        failuerFlash: true
    }));

    app.get('/register', function(req, res){
        res.status(400);
        res.json({message: req.flash('registerMessage')});
    });
    app.post('/register', passport.authenticate('register', {
        successRedirect: '/profile',
        failureRedirect : '/register',
        failureFlash : true
    }));

    app.get('/profile', isLoggedIn, function(req, res){
        res.json({
            success: true,
            data: req.user
        });
    });

    app.get('/logout', function(req,res){
        req.logout();
        res.redirect('/');
        // res.json({
        //     success: true
        // });
    });
    
    app.use('/todo', isLoggedIn, todoRoutes);
};
function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()) return next();
    
    return next(new Error('Invalide authentication'));
    // return ({
    //     success: false,
    //     message: 'Invalide authentication'
    // });
}
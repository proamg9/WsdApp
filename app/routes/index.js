
module.exports = function (app,passport,upload) {
    'use strict';

    //homepage
    app.get('/', function(req,res,next){
        
        console.log(req.session.user);
        //check if the user is logged in already
        if(!req.session.user && !req.session.passport)
        {
            res.redirect('/login');
        }
        else if(!req.session.passport)
        {
            passport.authenticate('oauth2',{failureRedirect:'/signin',session:true},function(err,user,info){
            req.logIn(user,function(err){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    req.session.user = false;
                    return res.render('index');
                }
            })
            })(req,res,next);
            //login with passport
        }
        else
        {
            //display index page
            res.render('index');
        }
        
    })


    //signin page
    app.get('/login',function(req,res){
        //signin page display
        if(!req.session.passport)
        {
            res.render('signin');    
        }
        else
        {
            res.redirect('/');
        }
        
    })


    app.post('/login',function(req,res){
        req.session.user = true;
        res.redirect('/');
    })
    //profile page
    app.get('/profile',function(req,res,next){

        //check the session
        if(!req.session.passport)
        {
            //if user is not logged in, rediret to signin
            res.redirect('/login');
        }
        else
        {
            //profile page display
            res.render('profile',{user:req.session.passport.user});
        }
    })

    //file upload
    app.post('/upload',upload.single('file'),function(req,res,next){
        if(req.file)
        {
            if(req.session.passport)
            {
                req.session.passport.user.photos[0] = req.file.path;//save session
            }
        }

        res.json({success:true});
    })

    //logout
    app.get('/logout',function(req,res){
        if(req.session.passport)
        {
            req.session.passport = false;//clear session
        }

        res.redirect('/login');
    })
};

const AzureOAuth2Strategy = require('passport-oauth2');
const config = require('./config');
const request = require('request');

module.exports = function(passport)
{
	//passport configuration for authorization
	passport.use('oauth2',new AzureOAuth2Strategy({
		clientID:config.clientID,
		clientSecret:config.clientSecret,
		authorizationURL:config.authorizationURL,
		tokenURL:config.tokenURL,
		callbackURL:'http://localhost:3000'
	},function(accessToken,refreshToken,profile,cb){
		request({url:config.userinfo,headers:{Authorization:'Bearer ' + accessToken,'Cache-Control':'no-cache'},method:'GET'},function(err,res,body){
			return cb(null,JSON.parse(body));
		})
	}))

	//passport save session
	passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user,done){
    	done(null,user);
    })


}
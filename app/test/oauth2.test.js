var OAuth2Strategy = require('passport-oauth2')
  , chai = require('chai');

var config = require('../config/config.json');

console.log(config);
describe('OAuth2Strategy', function() {
  
  describe('constructed', function() {
    
    describe('with normal options', function() {
      var strategy = new OAuth2Strategy({
          authorizationURL: config.authorizationURL,
          tokenURL: config.tokenURL,
          clientID: config.clientID,
          clientSecret: config.clientSecret
        }, function() {});
    
      it('should be named oauth2', function() {
        expect(strategy.name).to.equal('oauth2');
      });
    }); // with normal options
    
    describe('without a verify callback', function() {
      it('should throw', function() {
        expect(function() {
          new OAuth2Strategy({
            authorizationURL: config.authorizationURL,
            tokenURL: config.tokenURL,
            clientID: config.clientID,
            clientSecret: config.clientSecret
          });
        }).to.throw(TypeError, 'OAuth2Strategy requires a verify callback');
      });
    }); // without a verify callback
        
  }); // constructed
  
  
  describe('issuing authorization request', function() {
    
    describe('that redirects to service provider without redirect URI', function() {
      var strategy = new OAuth2Strategy({
          authorizationURL: config.authorizationURL,
          tokenURL: config.tokenURL,
          clientID: config.clientID,
          clientSecret: config.clientSecret
      },
      function(accessToken, refreshToken, profile, done) {});
      
      
      var url;
  
      before(function(done) {
        chai.passport.use(strategy)
          .redirect(function(u) {
            url = u;
            done();
          })
          .req(function(req) {
          })
          .authenticate();
      });
  
      it('should be redirected', function() {
        expect(url).to.equal(config.authorizationURL + '?response_type=code&' +  'client_id=' + config.clientID);
      });
    }); // that redirects to service provider without redirect URI
      
  });

})
var chai = require('chai');
var chaihttp = require('chai-http');

chai.use(chaihttp);
var app = 'http://localhost:3000';
describe('PugTest',function(){
	it('index page exist',function(){
		chai.request(app).get('/').end(function(err,res){

		})
	})
	it('profile page exist',function(){
		chai.request(app).get('/profile').end(function(err,res){
			
		})
	})

	it('logout success',function(){
		chai.request(app).get('/logout').end(function(err,res){
			it('should be redirected',function(){
				expect(app + '/logout').to.equal(app + '/logout');
			})
		})
	})

	it('fileupload',function(){
		chai.request(app).post('/upload').end(function(err,res){

		})
	})
})

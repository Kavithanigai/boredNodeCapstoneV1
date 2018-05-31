'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const {TEST_DATABASE_URL} = require('../config/database');
const faker = require('faker')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
const {app, runServer, closeServer} = require('../app')
const {User} = require('../models/users');
const {Riddle} = require('../models/riddles');


const testUsers = [];

function seedUsers(){
	for(let i=0;i<10;i++){ testUsers.push( createUser() ) }
	return User.insertMany(testUsers);
}

function createUser(){
	const user = {
		name: faker.name.firstName(),
		email: faker.internet.email(),
		password: 'password'
	}
	return user;
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

function makeTravelerIdList(){
	const travelerIdList = testUsers.map( testUsers => ObjectId(user._id) )
	return travelerIdList
}


describe('Riddles API', function(){
	before(function(){
		return runServer(TEST_DATABASE_URL);
	});
	beforeEach(function(){
		return
	});
	afterEach(function(){
		return
	});
	after(function(){
		//return tearDownDb()
		return closeServer()
	});

	describe('New User', function(){
		let newUser = createUser();
		const agent = chai.request.agent(app)
		let riddle;
		let question;
		let answer;
		it('should sign up', function(){
			return agent.post('/users/register')
				.send(newUser)
				.then(function(res){
					expect(res).to.have.status(200)
					newUser._id = res.body._id
				}, err=>console.log('errormessage', err.message))
		})
		it('should sign in', function(){
			return agent.post('/users/login')
				.send({email:newUser.email,
				 password: newUser.password
			 })
				.then(function(res){
					expect(res).to.have.status(200);
           expect('Location', '/riddles');
				})
		})

		it('should add a riddle', function(){
			return agent.post('/riddles')
				.send(
          {question:'Test Question',
           answer:'Test Answer',
           user: 'users.id'
         })
				.then(function(res){
					expect(res).to.have.status(200);
          console.dir(res);
          expect(res).to.have.header('content-length', 3443);
          expect('Location', '/riddles');
				})
		})


		it('should Update a riddle', function(){
			return agent.put('/riddles/:{user.id}')
				.send({question: 'Test Question', answer:'Answer 2'})
				.then(function(res){
          expect(res).to.have.status(200);
          expect(res).to.have.header('content-length', 3443);
          expect('Location', '/riddles');
				})
		})

		it('should remove a riddle', function(){
			return agent.delete(`/:{users.id}`)
				.send([])
				.then(function(res){
          expect(res).to.have.status(404);
          //riddles=res.body;
					//expect(res.body.riddles.length).to.equal(0);
          expect('Location', '/riddles');
				})
		})
	})


});

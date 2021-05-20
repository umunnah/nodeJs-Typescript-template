import supertest from "supertest";
import app from "../src/bootstrap/app";
import UserRepository from '../src/app/repository/user.repository'

const request = supertest.agent(app);

const userRepository = new UserRepository();
const defaultUser = {
	first_name: "lawrence",
	last_name: "Umunnah",
	email: "default@example.com",
	password: "password",
};

const testUser = {
	first_name: "lawrence",
	last_name: "Umunnah",
	email: "default2@example.com",
	password: "password",
};

afterEach(async () => {});
describe("Auth Controller", () => {
	describe("Register user", () => {
		it("create user validation", (done) => {
			request.post("/api/v1/register").then((res) => {
				expect(res.status).toEqual(422);
				done();
			});
		});
		it("create user", (done) => {
			request
				.post("/api/v1/register")
				.send(defaultUser)
				.then((res) => {
					expect(res.status).toEqual(201);
					done();
				});
		});
		it("create user validation with the same email", (done) => {
			request
				.post("/api/v1/register")
				.send(defaultUser)
				.then((res) => {
					expect(res.status).toEqual(422);
					done();
				});
		});
	});
  describe("Login a user",() => {
    it("login user validation", (done)=> {
      request.post("/api/v1/login").then(res =>{
        expect(res.status).toEqual(422);
        done();
      }) 
    })
    it("login user", (done)=> {
      request.post("/api/v1/login").send({
        'email': defaultUser.email,
        'password': defaultUser.password
      }).then(res =>{
        expect(res.status).toEqual(200);
        done();
      }) 
    })
    it("login user with wrong credentials", (done)=> {
      request.post("/api/v1/login").send({
        'email': 'dummy@example.com',
        'password': defaultUser.password
      }).then(res =>{
        expect(res.status).toEqual(401);
        done();
      }) 
    })
    it("login user with wrong password", (done)=> {
      request.post("/api/v1/login").send({
        'email': defaultUser.email,
        'password': 'defaultUser'
      }).then(res =>{
        expect(res.status).toEqual(401);
        done();
      }) 
    })
  })
  describe("Get User Profile",() => {
    it("get profile without token", (done)=> {
      request.get("/api/v1/profile").then(res =>{
        expect(res.status).toEqual(403);
        done();
      }) 
    })
    it("get user profile", async (done)=> {
      const token = await userRepository.login(defaultUser.email,defaultUser.password);
      request.get("/api/v1/profile").set('Authorization', `Bearer ${token}`).then(res =>{
        expect(res.status).toEqual(200);
        done();
      }) 
    })
  })
});

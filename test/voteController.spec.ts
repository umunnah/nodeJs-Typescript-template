import supertest from "supertest";
import app from "../src/bootstrap/app";
import UserRepository from '../src/app/repository/user.repository';
import db from '../src/app/models'

const request = supertest.agent(app);

const defaultUser = {
	first_name: "lawrence",
	last_name: "Umunnah",
	email: "default@example.com",
	password: "password",
};
const defaultQuestion = {
  "title": "First title",
  "content": "First content"
}

let token: string;
let testAccount: any;
let testQuestion: any;
let testAnswer: any;


describe("Vote Controller", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
    const userRepository = new UserRepository();
    testAccount = await userRepository.create(defaultUser);
    testQuestion = await db.Question.create({
      'title': defaultQuestion.title,
      'content': defaultQuestion.content,
      'userId': testAccount.id
    });
    testAnswer = await db.Answer.create({
      'questionId': testQuestion.id,
      'content': defaultQuestion.content,
      'userId': testAccount.id
    });
    token = await userRepository.login(defaultUser.email,defaultUser.password)
  })
	describe("vote", () => {
		it("auth middleware", (done) => {
			request.post("/api/v1/vote").then((res) => {
				expect(res.status).toEqual(403);
				done();
			});
		});
		it("validation", async(done) => {
			request
				.post("/api/v1/vote")
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(422);
					done();
				});
		});
    it("validation with wrong answer id", async(done) => {
			request
				.post("/api/v1/vote")
        .set('Authorization', `Bearer ${token}`)
        .send({ 
          'answerId': 10,
          'value': 'First answer'
        })
				.then((res) => {
					expect(res.status).toEqual(422);
					done();
				});
		});
		it("create vote", async(done) => {
      const answer = await db.Answer.create({
        'questionId': testQuestion.id,
        'userId': testAccount.id,
        "content": "First content"
      })
			request
				.post("/api/v1/vote")
        .set('Authorization', `Bearer ${token}`)
				.send({ 
          'answerId': answer.id,
          'value': 1
        })
				.then((res) => {
					expect(res.status).toEqual(201);
					done();
				});
		});
    it("update a voted answer", async(done) => {
      const answer = await db.Answer.create({
        'questionId': testQuestion.id,
        'userId': testAccount.id,
        "content": "First content"
      })
      await db.Vote.create({
        'answerId': answer.id,
        'userId': testAccount.id,
        'value': 1
      })
			request
				.post("/api/v1/vote")
        .set('Authorization', `Bearer ${token}`)
				.send({ 
          'answerId': answer.id,
          'value': -1
        })
				.then((res) => {
					expect(res.status).toEqual(201);
					done();
				});
		});
    it("update a voted answer with same value", async(done) => {
      const answer = await db.Answer.create({
        'questionId': testQuestion.id,
        'userId': testAccount.id,
        "content": "First content"
      })
      await db.Vote.create({
        'answerId': answer.id,
        'userId': testAccount.id,
        'value': 1
      })
			request
				.post("/api/v1/vote")
        .set('Authorization', `Bearer ${token}`)
				.send({ 
          'answerId': answer.id,
          'value': 1
        })
				.then((res) => {
					expect(res.status).toEqual(201);
					done();
				});
		});
	});
  describe("Get User votes", () => {
    it("auth", (done) => {
			request
				.get("/api/v1/user/votes")
				.then((res) => {
					expect(res.status).toEqual(403);
					done();
				});
		});
    it("get user votes", (done) => {
			request
				.get("/api/v1/user/votes")
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
		});
  });
  describe("Get Answer votes", () => {
    it("with invalid answer id", (done) => {
			request
				.get("/api/v1/answer/10/votes")
				.then((res) => {
					expect(res.status).toEqual(422);
					done();
				});
		});
    it("with valid answer id", (done) => {
			request
				.get(`/api/v1/answer/${testAnswer.id}/votes`)
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
		});
  });
  describe("delete", () => {
    it("auth", async(done) => {
			request
				.delete(`/api/v1/vote/10`)
				.then((res) => {
					expect(res.status).toEqual(403);
					done();
				});
		});
    it("with valid vote", async(done) => {
      const vote = await db.Vote.create({
        'answerId': testAnswer.id,
        'userId': testAccount.id,
        'value': 1
      })
			request
				.delete(`/api/v1/vote/${vote.id}`)
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
		});
    it("unathorized cannot delete vote", async(done) => {
      const newUser = await db.User.create({
        'firstName':"first",
        'lastName':"last",
        'email':'email@example.com',
        'password':'password'
      })
      const vote = await db.Vote.create({
        'answerId': testAnswer.id,
        'userId': newUser.id,
        'value': 1
      })
			request
				.delete(`/api/v1/vote/${vote.id}`)
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(401);
					done();
				});
		});
    it("with wrong id", async(done) => {
			request
				.delete(`/api/v1/vote/10`)
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(404);
					done();
				});
		});
  });
});

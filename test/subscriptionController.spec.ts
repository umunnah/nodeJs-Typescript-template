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


describe("Subscription Controller", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
    const userRepository = new UserRepository();
    testAccount = await userRepository.create(defaultUser);
    testQuestion = await db.Question.create({
      'title': defaultQuestion.title,
      'content': defaultQuestion.content,
      'userId': testAccount.id
    });
    token = await userRepository.login(defaultUser.email,defaultUser.password)
  })
	describe("Subscribe", () => {
		it("auth middleware", (done) => {
			request.post("/api/v1/subscription").then((res) => {
				expect(res.status).toEqual(403);
				done();
			});
		});
		it("validation", async(done) => {
			request
				.post("/api/v1/subscription")
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(422);
					done();
				});
		});
		it("add subscription", async(done) => {
			request
				.post("/api/v1/subscription")
        .set('Authorization', `Bearer ${token}`)
				.send({questionId:testQuestion.id})
				.then((res) => {
					expect(res.status).toEqual(201);
					done();
				});
		});
    it("subscribe to the same question", async(done) => {
      await db.Subscription.create({
        'questionId':testQuestion.id,
        'userId': testAccount.id
      });
			request
				.post("/api/v1/subscription")
        .set('Authorization', `Bearer ${token}`)
				.send({questionId:testQuestion.id})
				.then((res) => {
					expect(res.status).toEqual(400);
					done();
				});
		});
	});
  describe("Get question subscriptions", () => {
    it("get subscriptions", (done) => {
			request
				.get(`/api/v1/question/${testQuestion.id}/subscriptions`)
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
		});
  });
  describe("Unsubscribe", () => {
    it("auth", (done) => {
			request
				.delete("/api/v1/question/10/subscription")
				.then((res) => {
					expect(res.status).toEqual(403);
					done();
				});
		});
    it("delete subscription with valid question id", async(done) => {
      await db.Subscription.create({ 
        questionId: testQuestion.id,
        userId: testAccount.id
      });
			request
				.delete(`/api/v1/question/${testQuestion.id}/subscription`)
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
		});
    it("delete subscription with inValid question id", async(done) => {
			request
				.delete(`/api/v1/question/101/subscription`)
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(400);
					done();
				});
		});
  });
});

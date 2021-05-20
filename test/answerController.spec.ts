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


describe("Answer Controller", () => {
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
	describe("Create Answer", () => {
		it("auth middleware", (done) => {
			request.post("/api/v1/answer").then((res) => {
				expect(res.status).toEqual(403);
				done();
			});
		});
		it("validation", async(done) => {
			request
				.post("/api/v1/answer")
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(422);
					done();
				});
		});
    it("validation with wrong question id", async(done) => {
			request
				.post("/api/v1/answer")
        .set('Authorization', `Bearer ${token}`)
        .send({ 
          'questionId': 10,
          'content': 'First answer'
        })
				.then((res) => {
					expect(res.status).toEqual(422);
					done();
				});
		});
		it("create answer", async(done) => {
			request
				.post("/api/v1/answer")
        .set('Authorization', `Bearer ${token}`)
				.send({ 
          'questionId': testQuestion.id,
          'content': 'First answer'
        })
				.then((res) => {
					expect(res.status).toEqual(201);
					done();
				});
		});
    it("notify user that subscribed", async(done) => {
      await db.Subscription.create({
        questionId:testQuestion.id,
        userId: testAccount.id
      })
			request
				.post("/api/v1/answer")
        .set('Authorization', `Bearer ${token}`)
				.send({ 
          'questionId': testQuestion.id,
          'content': 'First answer'
        })
				.then((res) => {
					expect(res.status).toEqual(201);
					done();
				});
		});
	});
  describe("Get User answers", () => {
    it("auth", (done) => {
			request
				.get("/api/v1/user/answers")
				.then((res) => {
					expect(res.status).toEqual(403);
					done();
				});
		});
    it("get user answers", (done) => {
			request
				.get("/api/v1/user/answers")
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
		});
  });
  describe("Get question answers", () => {
    it("get answer with invalid question id", async(done) => {
      await db.Answer.create({
        'questionId': testQuestion.id,
        'userId': testAccount.id,
        'content': 'First answer'
      })
			request
				.get(`/api/v1/question/10/answers`)
				.then((res) => {
					expect(res.status).toEqual(404);
					done();
				});
		});
    it("get answers with a valid question id", async(done) => {
      await db.Answer.create({
        'questionId': testQuestion.id,
        'userId': testAccount.id,
        'content': 'First answer'
      })
			request
				.get(`/api/v1/question/${testQuestion.id}/answers`)
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
		});
  });
  describe("Get answer", () => {
    it("with invalid answer id", (done) => {
      request
				.get(`/api/v1/answer/10`)
				.then((res) => {
					expect(res.status).toEqual(404);
					done();
				});
    })
    it("with valid answer id", async(done) => {
      const answer = await db.Answer.create({
        'questionId': testQuestion.id,
        'userId': testAccount.id,
        'content': 'First answer'
      })
      request
				.get(`/api/v1/answer/${answer.id}`)
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
    })
  });
  describe("Update answer", () => {
    it("auth", (done) => {
      request
				.put(`/api/v1/answer/10`)
				.then((res) => {
					expect(res.status).toEqual(403);
					done();
				});
    })
    it("validation", (done) => {
      request
				.put(`/api/v1/answer/10`)
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(422);
					done();
				});
    })
    it("with invalid answer id", (done) => {
      request
				.put(`/api/v1/answer/10`)
        .set('Authorization', `Bearer ${token}`)
        .send({'content':'update answer'})
				.then((res) => {
					expect(res.status).toEqual(404);
					done();
				});
    })
    it("wrong owner cannot update an answer", async(done) => {
      defaultUser.email = 'newemail@example.com'
      const newUser = await db.User.create({
        'firstName': defaultUser.first_name,
        'lastName': defaultUser.last_name,
        'password': defaultUser.password,
        'email': 'newemail@example.com'
      })
      const answer = await db.Answer.create({
        'questionId': testQuestion.id,
        'userId': newUser.id,
        'content': 'First answer'
      })
      request
				.put(`/api/v1/answer/${answer.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({'content':'update answer'})
				.then((res) => {
					expect(res.status).toEqual(401);
					done();
				});
    })
    it("with valid answer id", async(done) => {
      const answer = await db.Answer.create({
        'questionId': testQuestion.id,
        'userId': testAccount.id,
        'content': 'First answer'
      })
      request
				.put(`/api/v1/answer/${answer.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({'content':'update answer'})
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
    })
  });
  describe("Delet answer", () => {
    it("auth", (done) => {
      request
				.delete(`/api/v1/answer/10`)
				.then((res) => {
					expect(res.status).toEqual(403);
					done();
				});
    })
    it("with invalid answer id", (done) => {
      request
				.delete(`/api/v1/answer/10`)
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(404);
					done();
				});
    })
    it("wrong owner cannot delete an answer", async(done) => {
      const newUser = await db.User.create({
        'firstName': defaultUser.first_name,
        'lastName': defaultUser.last_name,
        'password': defaultUser.password,
        'email': 'newemail2@example.com'
      })
      const answer = await db.Answer.create({
        'questionId': testQuestion.id,
        'userId': newUser.id,
        'content': 'First answer'
      })
      request
				.delete(`/api/v1/answer/${answer.id}`)
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(401);
					done();
				});
    })
    it("with valid answer id", async(done) => {
      const answer = await db.Answer.create({
        'questionId': testQuestion.id,
        'userId': testAccount.id,
        'content': 'First answer'
      })
      request
				.delete(`/api/v1/answer/${answer.id}`)
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
    })
  });
});

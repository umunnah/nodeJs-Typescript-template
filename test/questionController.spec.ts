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


describe("Question Controller", () => {
  beforeEach(async () => {
    await db.sequelize.sync({force: true, logging: false});
    const userRepository = new UserRepository();
    testAccount = await userRepository.create(defaultUser);
    token = await userRepository.login(defaultUser.email,defaultUser.password)
  })
	describe("Create Question", () => {
		it("auth middleware", (done) => {
			request.post("/api/v1/question").then((res) => {
				expect(res.status).toEqual(403);
				done();
			});
		});
		it("validation", async(done) => {
			request
				.post("/api/v1/question")
        .set('Authorization', `Bearer ${token}`)
				.then((res) => {
					expect(res.status).toEqual(422);
					done();
				});
		});
		it("create question", async(done) => {
			request
				.post("/api/v1/question")
        .set('Authorization', `Bearer ${token}`)
				.send(defaultQuestion)
				.then((res) => {
					expect(res.status).toEqual(201);
					done();
				});
		});
	});
  describe("Get questions", () => {
    it("get questions", (done) => {
			request
				.get("/api/v1/questions")
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
		});
    it("get questions with search query", (done) => {
			request
				.get("/api/v1/questions?search=title")
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
		});
  });
  describe("Get question a single question", () => {
    it("get question with invalid id", (done) => {
			request
				.get("/api/v1/question/10")
				.then((res) => {
					expect(res.status).toEqual(404);
					done();
				});
		});
    it("get question with valid id", async(done) => {
      const question = await db.Question.create({ 
        title: defaultQuestion.title,
        content: defaultQuestion.content,
        userId: testAccount.id
      });
			request
				.get(`/api/v1/question/${question.id}`)
				.then((res) => {
					expect(res.status).toEqual(200);
					done();
				});
		});
  });
});

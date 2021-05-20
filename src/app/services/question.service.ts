import { Service } from 'typedi';
import QuestionRepository from "../repository/question.repository"

@Service()
class QuestionService {
  constructor(public questionRepository: QuestionRepository) {
    this.create = this.create.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.getQuestion = this.getQuestion.bind(this);
  }

  async create(req: any){
    const {title,content} = req.body;
    const userId = req.user.id;
    const data = {title,content,'userId':userId}
    return await this.questionRepository.create(data);
  }

  async getQuestions(req: any) {
    return await this.questionRepository.getQuestions(req);
  }

  async getQuestion(id:any) {
    return await this.questionRepository.getQuestion(id);
  }
}

export default QuestionService;


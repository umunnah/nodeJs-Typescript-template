export default class BadRequestException extends Error {
  public status:number;
  public message:string;
  constructor(message: string) {
      super()

      this.message = message;

      this.status = 400
  }
}
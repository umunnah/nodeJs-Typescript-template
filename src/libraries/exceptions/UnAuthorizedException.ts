export default class UnAuthorizedException extends Error {
  public status:number;
  constructor(public message: string) {
      super(message || "Unauthorized")

      this.status = 401
  }
}
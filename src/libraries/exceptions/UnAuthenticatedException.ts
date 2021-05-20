export default class UnAuthenticatedException extends Error {
  public status: number;
  constructor(public message:string) {
      super(message || "Unauthenticated")

      this.status = 403
  }
}
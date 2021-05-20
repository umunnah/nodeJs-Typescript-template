export default class ValidationException extends Error {
  public status: number;
  constructor(public errors: any) {
      super("Validation errors.")

      this.status = 422;
      this.errors = errors
  }
}
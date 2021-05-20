export default class ModelNotFoundException extends Error {
  public status: number;
  public modelName: string;
  public id: any;
	constructor(
		modelName: string,
		id: any,
		public idColumn = "id"
	) {
		super();
		this.modelName = modelName;
		this.id = id;
		this.message = `No record found for ${this.modelName} with ${idColumn}: ${this.id}`;
		this.status = 404;
	}
}

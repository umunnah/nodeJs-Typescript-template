"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelNotFoundException extends Error {
    constructor(modelName, id, idColumn = "id") {
        super();
        this.idColumn = idColumn;
        this.modelName = modelName;
        this.id = id;
        this.message = `No record found for ${this.modelName} with ${idColumn}: ${this.id}`;
        this.status = 404;
    }
}
exports.default = ModelNotFoundException;

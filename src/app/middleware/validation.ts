import { Request, Response,NextFunction } from "express"
import { validationResult, ValidationError}    from "express-validator"
import { ValidationException } from "../../libraries/exceptions"

export default (req: Request, res: Response, next: NextFunction) => {

  const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    return `request ${location}[${param}]: ${msg}`;
  };
  const errors = validationResult(req).formatWith(errorFormatter);

    if (!errors.isEmpty()) {
        throw new ValidationException(errors.mapped())
    }

    next()
}
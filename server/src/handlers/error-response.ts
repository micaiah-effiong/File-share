import { stringify } from "querystring";

interface IErrorResponse extends Error {
	statusCode: number;
	// constructor(message: string, statusCode: string): void;
}

class ErrorResponse extends Error implements IErrorResponse {
	statusCode: number;
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export default (msg: string, statusCode: number): ErrorResponse => {
	return new ErrorResponse(msg, statusCode);
};

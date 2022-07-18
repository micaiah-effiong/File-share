import * as authController from "./auth";
import * as filesController from "./files/files";

// export default { auth: authController, files: filesController };
export const auth = authController;
export const files = filesController;

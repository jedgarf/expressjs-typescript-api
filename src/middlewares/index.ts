import apiKeyValidation from "./apiKeyValidation";
import userFormValidation from "./userFormValidation";
import authFormValidation from "./authFormValidation";
import jwtValidation from "./jwtValidation";

const combinedMiddlewares = {
    apiKeyValidation,
    userFormValidation,
    authFormValidation,
    jwtValidation
  };
  
export default combinedMiddlewares;
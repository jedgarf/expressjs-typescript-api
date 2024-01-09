import express, { Router } from "express";

// Controllers
import controllers from '../controllers';
// Middlewares
import middlewares from '../middlewares';

const router: Router = express.Router();

router.post('/auth', middlewares.apiKeyValidation, middlewares.authFormValidation, controllers.auth.login);
router.get('/deauth', middlewares.apiKeyValidation, controllers.auth.logout);
router.post('/register', middlewares.apiKeyValidation, middlewares.userFormValidation, controllers.users.add);

export default router;
import express, { Router } from "express";

// Controllers
import controllers from '../controllers';
// Middlewares
import middlewares from '../middlewares';

const router: Router = express.Router();

router.post('/create', middlewares.jwtValidation, middlewares.userFormValidation, controllers.users.add);
router.get('/read/:id?', middlewares.jwtValidation, controllers.users.show);
router.put('/update/:id', middlewares.jwtValidation, middlewares.userFormValidation, controllers.users.edit);
router.delete('/delete/:id', middlewares.jwtValidation, controllers.users.destroy);

export default router;
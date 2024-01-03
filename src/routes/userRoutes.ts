import express from "express";

// Controllers
import * as userControllers from '../controllers/userControllers';

// Middlewares
import userFormValidation from '../middlewares/userFormValidation';

const router = express.Router();

router.post('/create', userFormValidation, userControllers.add);
router.get('/read/:id?', userControllers.show);
router.put('/update/:id', userFormValidation, userControllers.edit);
router.delete('/delete/:id', userControllers.destroy);

export default router;
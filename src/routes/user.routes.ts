import express from "express";
import * as userController from "../controllers/user.controller";

const router = express.Router();

router.post('/create', userController.createUser);
router.get('/get', userController.getUsers);
router.get('/get/:id', userController.getUserById);
router.put('/update/:id', userController.updateUserById)
router.delete('/delete', userController.deleteUser)


export default router;
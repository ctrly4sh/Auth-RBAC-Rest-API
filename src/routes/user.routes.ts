import express, {Request, Response} from "express";
import * as userController from "../controllers/user.controller";
import { successResponse } from "../utils/responseHandler";
import STATUS_MESSAGES from "../utils/statusMessages";
import HTTP_STATUS from "../utils/httpStatusCodes";

const router = express.Router();

router.get('/health', userController.getHealth)
router.post('/create', userController.createUser);
router.get('/get', userController.getUsers);
router.get('/get/:id', userController.getUserById);
router.put('/update/:id', userController.updateUserById)
router.delete('/delete', userController.deleteUser)


export default router;
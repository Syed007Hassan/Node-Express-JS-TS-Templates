import { Router } from "express";
import verifyToken from "../middleware/verifyToken";

import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.put("/:id", verifyToken, updateUser);
userRouter.delete("/:id", verifyToken, deleteUser);
userRouter.get("/find/:id", getUser);
userRouter.get("/", verifyToken, getAllUsers);
userRouter.get("/stats", getUserStats);

export default userRouter;

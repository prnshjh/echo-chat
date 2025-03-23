import express from "express";
import { getUsersForSidebar} from "../controllers/message.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getMesssage } from "../controllers/message.controller.js";
const router=express.Router();

router.get("/users", protectedRoute, getUsersForSidebar );
router.get("/:id", protectedRoute, getMesssage);
router.post("/send/:id", protectedRoute, sendMessage);
export default router;

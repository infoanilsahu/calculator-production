import { Router } from "express";
import { register } from "../controllers/auth/register.controller.js";
import { login } from "../controllers/auth/login.controller.js";
import { log } from "node:console";
import { logout } from "../controllers/auth/logout.controller.js";
import { checkToken } from "../controllers/token/checkToken.controller.js";

const router = Router();


router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)

router.route("/checktoken").get(checkToken)

export default router;




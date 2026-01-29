import { Router } from "express"
import { result } from "../controllers/upload/result.controller.js";
import { verifyJWT } from "../middleware/verifyJwt.middleware.js";

const router = Router();

router.route("/history").post(verifyJWT,result)


export default router;
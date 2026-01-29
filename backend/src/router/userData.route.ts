import { Router } from "express";
import { getUserData } from "../controllers/upload/getUserdata.controller.js";
import { verifyJWT } from "../middleware/verifyJwt.middleware.js";
import { getHistoryData } from "../controllers/upload/getHistorydata.controller.js";

const router = Router();

router.route("/userdata").get(verifyJWT,getUserData);
router.route("/gethistory").get(verifyJWT,getHistoryData);

export default router;
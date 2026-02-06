import express from "express";
import {
  getGetInvolved,
  upsertGetInvolved,
} from "../Controllers/getInvolvedController.js";

const router = express.Router();

router.get("/", getGetInvolved);
router.put("/", upsertGetInvolved);

export default router;

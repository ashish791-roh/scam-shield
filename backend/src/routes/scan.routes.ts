
import { Router } from "express";

import { analyzeScan } from "../controllers/scan.controller";
import { protect } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { scanSchema } from "../schemas/scan.schema";

const router = Router();

router.post(
  "/",
  protect,
  validateBody(scanSchema),
  analyzeScan
);

export default router;

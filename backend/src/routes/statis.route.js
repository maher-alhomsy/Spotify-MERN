import { Router } from 'express';

import { getStatis } from '../controllers/statis.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', protectRoute, requireAdmin, getStatis);

export default router;

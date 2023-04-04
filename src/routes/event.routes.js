import { Router } from 'express';
import * as eventController from '../controllers/event.controller';

const router = Router();

router.route('').get(eventController.list);
router.route('/add').post(eventController.add);
router.route('/remove').post(eventController.remove);
router.route('/transfer').post(eventController.transfer);

export default router;


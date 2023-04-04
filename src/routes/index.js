import { Router } from 'express';
import itemRoutes from './item.routes';
import locationRoutes from './location.routes';
import eventRoutes from './event.routes';

const router = Router(); // eslint-disable-line new-cap

router.use('/items', itemRoutes);
router.use('/locations', locationRoutes);
router.use('/events', eventRoutes);

export default router;

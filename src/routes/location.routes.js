import { Router } from 'express';
import * as locationController from '../controllers/location.controller';

const router = Router();

router.route('').get(locationController.list);
router.route('/:id').get(locationController.retrieve);
router.route('/:id/inventory').get(locationController.inventory);
router.route('').post(locationController.create);
router.route('/:id').put(locationController.update);
router.route('/:id').delete(locationController.deleteItem);

export default router;

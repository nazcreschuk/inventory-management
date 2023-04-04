import { Router } from 'express';
import * as itemController from '../controllers/item.controller';

const router = Router();

router.route('').get(itemController.list);
router.route('/:id').get(itemController.retrieve);
router.route('/:id/inventory').get(itemController.inventory);
router.route('').post(itemController.create);
router.route('/:id').put(itemController.update);
router.route('/:id').delete(itemController.deleteItem);

export default router;


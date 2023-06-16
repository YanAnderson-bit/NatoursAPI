import express from 'express';

import userController from '../controllers/userController';

const router = express.Router();
router.route('/').get(userController.getUsers);
router.route('/:id').get(userController.getUser);

export default router;

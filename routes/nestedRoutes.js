import express from 'express';
import { createNestedItem, getAllItems } from '../controller/nestedController.js';
import userAuth from '../middleware/userAuth.js';

const nestedRouter = express.Router();

nestedRouter.get('/all', userAuth, getAllItems);
nestedRouter.post('/create', userAuth, createNestedItem);

export default nestedRouter;

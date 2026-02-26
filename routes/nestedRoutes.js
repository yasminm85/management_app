import express from 'express';
import { createNestedItem, getAllItems, getItemById, getFile, TotalFolderAndFile, updateNestedItem, deleteNestedItem, getAllFiles, detectionFileCompleted } from '../controller/nestedController.js';
import userAuth from '../middleware/userAuth.js';
import uploadFile  from '../middleware/uploadFile.js';

const nestedRouter = express.Router();

nestedRouter.get('/all', userAuth, getAllItems);
nestedRouter.post('/create', uploadFile.single('file_nested'), userAuth, createNestedItem);
// nestedRouter.get('/folder-total', userAuth, FolderTotal);
nestedRouter.get('/total', userAuth, TotalFolderAndFile);
nestedRouter.get('/files', userAuth, getAllFiles);
nestedRouter.get('/files/:id', userAuth, getItemById);
nestedRouter.get('/get-file/:id', userAuth, getFile);
// nestedRouter.get('/name/:id', userAuth, nestedName);
nestedRouter.put('/update/:id', uploadFile.single('file_nested'), userAuth, updateNestedItem);
nestedRouter.get('/detection-completed/:id', userAuth, detectionFileCompleted);
nestedRouter.delete('/delete/:id', userAuth, deleteNestedItem);

export default nestedRouter;

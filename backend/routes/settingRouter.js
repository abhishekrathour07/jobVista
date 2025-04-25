import express from 'express'
import { deleteAccount, updatePassword } from '../controller/settingController.js';

const settingRouter = express.Router();

settingRouter.post("/settings/update-password", updatePassword)
settingRouter.delete("/settings/delete-account", deleteAccount)

export default settingRouter
import express from 'express';
import ctrl from '../../../app/controllers/students.controller';
import { checkIsAdmin, checkToken } from '../../middlewares/auth.user';
import val from '../../validations/student.validation';
import dotenv from 'dotenv';

dotenv.config();

const route = express.Router()

route
    .get('/current-user', checkToken, ctrl.getCurrent)
    .get('/view-all', ctrl.view)
    .get('/view-id/:id', ctrl.viewById)
    .post('/register-student', val.register, ctrl.register)
    .post('/login', ctrl.login)
    .put('/update-student',checkIsAdmin,checkToken, ctrl.update)

export default route;
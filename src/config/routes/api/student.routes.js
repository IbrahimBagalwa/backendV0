import express from 'express';
import ctrl from '../../../app/controllers/students.controller';
import { checkIsAdmin, checkToken } from '../../middlewares/auth.user';
const route = express.Router()

route
    .get('/current-user', checkToken, ctrl.getCurrent)
    .get('/view-all',checkToken, checkIsAdmin, ctrl.view)
    .get('/view-id/:id', ctrl.viewById)
    .post('/register-student', ctrl.register)
    .post('/login', ctrl.login)
    .put('/update-student',checkIsAdmin,checkToken, ctrl.update)
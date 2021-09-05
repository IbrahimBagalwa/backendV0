import express from 'express';
import ctrl from '../../../app/controllers/cours.controller';
import validate from '../../validations/course.validations';
const route = express.Router();

route
    .post('/create', validate.register, ctrl.register)


export default route;
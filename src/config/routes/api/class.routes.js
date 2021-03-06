import express from 'express';
import ctrl from '../../../app/controllers/class.controller';
import validate from '../../validations/class.validation';

const route = express.Router();

route
    .post('/create', validate.register, ctrl.register)
    .put('/update/:id', ctrl.update)
    .get('/all', ctrl.all)
    .post('/search', ctrl.search)

export default route;
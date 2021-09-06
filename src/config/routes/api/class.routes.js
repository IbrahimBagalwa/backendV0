import express from 'express';
import ctrl from '../../../app/controllers/class.controller';

const route = express.Router();

route
    .post('/create', ctrl.register)


export default route;
import express from 'express';
import ctrl from '../../../app/controllers/cours.controller';
const route = express.Router();

route
    .post('/createCourse', ctrl.create)
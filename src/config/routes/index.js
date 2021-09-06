import express from 'express';
import courseRoutes from './api/course.routes';
import classRoutes from './api/class.routes';

const routes = express.Router()

routes
    .use('/course',courseRoutes)
    .use('/class', classRoutes)

export default routes;